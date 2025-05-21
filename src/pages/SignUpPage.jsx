import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Lock, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // novo estado!
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setIsLoading(false);
      return;
    }
    
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${window.location.origin}/confirmacao`
      }
    });

    setIsLoading(false);

    if (signUpError) {
      if (signUpError.message.includes("User already registered")) {
        setError("Este e-mail já está cadastrado. Tente fazer login.");
      } else if (signUpError.message.includes("Password should be at least 6 characters")) {
        setError("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setError(signUpError.message || "Ocorreu um erro ao criar a conta. Tente novamente.");
      }
      toast({ title: "Erro no Cadastro", description: signUpError.message, variant: "destructive" });
      return;
    }

    // *** Tira qualquer redirecionamento e só mostra mensagem ***
    setSuccess(true);
    toast({
      title: "Cadastro Quase Completo!",
      description: "Enviamos um link de confirmação para o seu e-mail. Por favor, verifique sua caixa de entrada (e spam).",
      variant: "default"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8"
    >
      <Card className="w-full max-w-md bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border-none shadow-xl p-2 sm:p-4">
        <CardHeader className="text-center">
          <UserPlus className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
            Crie sua Conta
          </CardTitle>
          <CardDescription className="text-slate-200 dark:text-slate-300 mt-1">
            É rápido e fácil. Comece a usar seus números virtuais hoje mesmo!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-4"
            >
              <CheckCircle2 className="w-16 h-16 mx-auto text-green-400 mb-4" />
              <div className="text-green-400 text-lg font-semibold mb-2">
                Cadastro realizado!
              </div>
              <div className="text-slate-200 dark:text-slate-300 mb-2">
                Enviamos um link de confirmação para o seu e-mail.<br/>
                Por favor, verifique sua caixa de entrada <b>e o spam</b>.
              </div>
              <div className="text-slate-400 text-sm mt-2">
                Depois de confirmar, você já pode acessar normalmente.<br/>
                <Link className="text-yellow-400 underline" to="/login">Ir para o login</Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 dark:bg-red-900/30 p-3 rounded-md text-red-500 dark:text-red-400 text-sm flex items-center"
                >
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                  {error}
                </motion.div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-yellow-400" />E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 placeholder:text-slate-400 focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-yellow-400" />Senha (mínimo 6 caracteres)
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 placeholder:text-slate-400 focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-200 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-yellow-400" />Confirmar Senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 placeholder:text-slate-400 focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
              <Button type="submit" size="lg" className="w-full text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-lg" disabled={isLoading}>
                {isLoading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </form>
          )}
          <p className="mt-6 text-center text-sm text-slate-300 dark:text-slate-400">
            Já tem uma conta?{' '}
            <Button variant="link" asChild className="text-yellow-400 hover:text-yellow-300 p-0 h-auto font-semibold">
              <Link to="/login">Fazer Login</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SignUpPage;
