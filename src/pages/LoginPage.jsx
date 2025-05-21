import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { Mail, Lock, LogIn as LogInIcon, AlertCircle } from 'lucide-react';
    import { supabase } from '@/lib/supabaseClient';
    import { useAuth } from '@/contexts/AuthContext';

    const LoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');
      const { toast } = useToast();
      const navigate = useNavigate();
      const { login } = useAuth();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!email || !password) {
          setError("Por favor, preencha e-mail e senha.");
          setIsLoading(false);
          return;
        }

        const { error: signInError } = await login(email, password);
        
        setIsLoading(false);

        if (signInError) {
          if (signInError.message === "Invalid login credentials") {
            setError("E-mail ou senha inválidos.");
          } else if (signInError.message === "Email not confirmed") {
            setError("Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada.");
            localStorage.setItem('userEmailForVerification', email);
            navigate('/verificar-email');
          } else {
            setError(signInError.message || "Ocorreu um erro ao fazer login. Tente novamente.");
          }
          toast({ title: "Erro no Login", description: signInError.message, variant: "destructive" });
        } else {
          toast({ title: "Login bem-sucedido!", description: "Bem-vindo de volta!", variant: "default" });
          navigate('/numero'); 
        }
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
              <LogInIcon className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
                Acessar Conta
              </CardTitle>
              <CardDescription className="text-slate-200 dark:text-slate-300 mt-1">
                Bem-vindo de volta! Faça login para continuar.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                    <Lock className="w-4 h-4 mr-2 text-yellow-400" />Senha
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
                <Button type="submit" size="lg" className="w-full text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg" disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
              <div className="mt-4 text-right">
                <Button variant="link" asChild className="text-sm text-slate-300 hover:text-yellow-300 p-0 h-auto">
                  <Link to="#">Esqueceu a senha?</Link>
                </Button>
              </div>
              <p className="mt-6 text-center text-sm text-slate-300 dark:text-slate-400">
                Não tem uma conta?{' '}
                <Button variant="link" asChild className="text-yellow-400 hover:text-yellow-300 p-0 h-auto font-semibold">
                  <Link to="/cadastro">Cadastre-se</Link>
                </Button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default LoginPage;