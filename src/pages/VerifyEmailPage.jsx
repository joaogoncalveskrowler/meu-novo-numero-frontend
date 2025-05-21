import React, { useState, useEffect } from 'react';
    import { Link, useNavigate, useSearchParams }  from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { MailCheck, AlertTriangle, Loader2 } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';

    const VerifyEmailPage = () => {
      const [token, setToken] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [userEmail, setUserEmail] = useState('');
      const [verificationMessage, setVerificationMessage] = useState('');
      const { toast } = useToast();
      const navigate = useNavigate();
      const [searchParams] = useSearchParams();

      useEffect(() => {
        const emailFromStorage = localStorage.getItem('userEmailForVerification');
        if (emailFromStorage) {
          setUserEmail(emailFromStorage);
        }
        
        const otpToken = searchParams.get('token');
        const type = searchParams.get('type');

        if (otpToken && type === 'signup' && emailFromStorage) {
          setIsLoading(true);
          setVerificationMessage("Verificando seu e-mail automaticamente...");
          supabase.auth.verifyOtp({ email: emailFromStorage, token: otpToken, type: 'signup' })
            .then(({ data, error }) => {
              setIsLoading(false);
              if (error) {
                setVerificationMessage(`Erro ao verificar: ${error.message}. Tente novamente ou insira o código manualmente.`);
                toast({ title: "Erro na Verificação", description: error.message, variant: "destructive" });
              } else if (data.session) {
                localStorage.removeItem('userEmailForVerification');
                toast({ title: "E-mail Verificado!", description: `Sua conta com ${emailFromStorage} foi verificada com sucesso.`, variant: "default" });
                navigate('/confirmacao');
              } else {
                setVerificationMessage("Não foi possível verificar automaticamente. Por favor, insira o código enviado ao seu e-mail.");
              }
            });
        } else if (otpToken && !emailFromStorage) {
             setVerificationMessage("Informação de e-mail não encontrada para verificação automática. Por favor, insira o código manualmente ou tente se cadastrar novamente.");
        }


      }, [searchParams, navigate, toast]);


      const handleVerifyWithOtp = async (e) => {
        e.preventDefault();
        if (!userEmail) {
          toast({ title: "Erro", description: "E-mail não encontrado. Por favor, tente se cadastrar novamente.", variant: "destructive" });
          navigate('/cadastro');
          return;
        }
        if (!token) {
          toast({ title: "Erro", description: "Por favor, insira o código de verificação.", variant: "destructive" });
          return;
        }

        setIsLoading(true);
        setVerificationMessage('');

        const { data, error } = await supabase.auth.verifyOtp({
          email: userEmail,
          token: token,
          type: 'signup', 
        });

        setIsLoading(false);

        if (error) {
          setVerificationMessage(`Erro: ${error.message}`);
          toast({ title: "Token Inválido", description: error.message || "O token inserido está incorreto. Tente novamente ou solicite um novo.", variant: "destructive" });
        } else if (data.session) {
          localStorage.removeItem('userEmailForVerification');
          toast({ title: "E-mail Verificado!", description: `Sua conta com ${userEmail} foi verificada com sucesso.`, variant: "default" });
          navigate('/confirmacao');
        } else {
          setVerificationMessage("Não foi possível verificar com o código fornecido. Tente novamente.");
          toast({ title: "Falha na Verificação", description: "Não foi possível verificar com o código fornecido.", variant: "destructive" });
        }
      };
      
      const handleResendEmail = async () => {
        if (!userEmail) {
          toast({ title: "Erro", description: "E-mail não encontrado para reenvio. Por favor, tente se cadastrar novamente.", variant: "destructive" });
          navigate('/cadastro');
          return;
        }
        setIsLoading(true);
        setVerificationMessage('');
        
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: userEmail,
        });

        setIsLoading(false);
        if (error) {
          setVerificationMessage(`Erro ao reenviar: ${error.message}`);
          toast({ title: "Erro ao Reenviar", description: error.message, variant: "destructive" });
        } else {
          setVerificationMessage("Um novo e-mail de confirmação foi enviado (verifique sua caixa de entrada e spam).");
          toast({ title: "E-mail Reenviado", description: `Um novo link de confirmação foi enviado para ${userEmail}.`, variant: "default" });
        }
      };


      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8"
        >
          <Card className="w-full max-w-lg bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border-none shadow-xl p-2 sm:p-4">
            <CardHeader className="text-center">
              <MailCheck className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
                Verifique seu E-mail
              </CardTitle>
              {userEmail ? (
                <CardDescription className="text-slate-200 dark:text-slate-300 mt-1">
                  Enviamos um link de confirmação (e/ou um código) para <strong className="text-yellow-300">{userEmail}</strong>.
                  Por favor, verifique sua caixa de entrada e spam.
                </CardDescription>
              ) : (
                 <CardDescription className="text-slate-200 dark:text-slate-300 flex items-center justify-center mt-1">
                   <AlertTriangle className="w-5 h-5 mr-2 text-red-400"/> Parece que você chegou aqui diretamente. Por favor, <Link to="/cadastro" className="text-yellow-300 hover:underline ml-1">cadastre-se</Link>&nbsp;primeiro.
                </CardDescription>
              )}
            </CardHeader>
            
            <CardContent>
              {verificationMessage && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mb-4 text-center p-3 rounded-md ${verificationMessage.startsWith("Erro") ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-300'}`}
                >
                  {isLoading && verificationMessage.includes("automaticamente") && <Loader2 className="inline w-4 h-4 mr-2 animate-spin" />}
                  {verificationMessage}
                </motion.p>
              )}

              {userEmail && !searchParams.get('token') && (
              <>
                <p className="text-sm text-center text-slate-300 mb-4">
                  Se o link não funcionar, ou se preferir, insira o código de 6 dígitos recebido por e-mail abaixo.
                </p>
                <form onSubmit={handleVerifyWithOtp} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="token" className="text-slate-200">Código de Verificação (OTP)</Label>
                    <Input
                      id="token"
                      type="text"
                      placeholder="123456"
                      value={token}
                      onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0,6))}
                      className="bg-slate-700/50 border-slate-600 placeholder:text-slate-400 text-center text-lg tracking-[0.3em] focus:ring-yellow-400 focus:border-yellow-400"
                      maxLength={6}
                      pattern="\d{6}"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-lg" disabled={isLoading || !userEmail}>
                    {isLoading && !verificationMessage.includes("automaticamente") ? <Loader2 className="w-5 h-5 mr-2 animate-spin"/> : null}
                    {isLoading && !verificationMessage.includes("automaticamente") ? 'Verificando...' : 'Verificar com Código'}
                  </Button>
                </form>
              </>
              )}
               <div className="mt-6 text-center">
                 <p className="text-sm text-slate-300 dark:text-slate-400 mb-2">
                    Não recebeu o e-mail ou o código expirou?
                  </p>
                 <Button variant="outline" onClick={handleResendEmail} disabled={isLoading || !userEmail} className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900">
                    {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : null}
                    Reenviar E-mail de Confirmação
                  </Button>
              </div>
              <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
                Se você clicou no link de confirmação no seu e-mail, sua conta deve ser verificada automaticamente. Caso contrário, use o código OTP.
              </p>
            </CardContent>
            
          </Card>
        </motion.div>
      );
    };

    export default VerifyEmailPage;