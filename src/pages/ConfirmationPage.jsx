import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, PartyPopper } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Confirmando cadastro... Aguarde');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    async function handleAuthFromUrl() {
      // Verifica se tem access_token na URL
      if (window.location.hash.includes('access_token')) {
        // Se sim, tenta pegar sessão
        await supabase.auth.getSessionFromUrl({ storeSession: true });
        setShowSuccess(true);
        setMessage('E-mail verificado com sucesso!');
        setTimeout(() => {
          navigate('/login'); // Ou '/numero', se preferir
        }, 3500);
      } else {
        // Se não tem token, considera já confirmado e mostra sucesso
        setShowSuccess(true);
        setMessage('Cadastro já confirmado!');
        setTimeout(() => {
          navigate('/login');
        }, 3500);
      }
    }
    handleAuthFromUrl();
  }, [navigate]);

  if (!showSuccess) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <span className="text-xl text-white/90">{message}</span>
      </div>
    );
  }

  // Tela de sucesso com botão
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex justify-center items-center min-h-[calc(100vh-200px)]"
    >
      <Card className="w-full max-w-lg bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border-none shadow-xl p-4 text-center">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          >
            <CheckCircle2 className="w-20 h-20 mx-auto text-green-400 mb-6" />
          </motion.div>
          <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-400 to-sky-500">
            {message}
          </CardTitle>
          <CardDescription className="text-slate-200 dark:text-slate-300 text-lg mt-2">
            Sua conta foi ativada. Agora você pode aproveitar todos os nossos serviços.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-slate-300 dark:text-slate-400">
              O que você gostaria de fazer agora?
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/numero">
                <Button
                  size="lg"
                  className="text-lg w-full sm:w-auto font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-transform duration-300 px-8 py-5"
                >
                  <PartyPopper className="w-5 h-5 mr-2" /> Pegar Meu Primeiro Número
                </Button>
              </Link>
              <Link to="/planos">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg w-full sm:w-auto font-semibold border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 shadow-lg transform hover:scale-105 transition-transform duration-300 px-8 py-5"
                >
                  Explorar Planos
                </Button>
              </Link>
            </div>
            <div className="mt-4 text-xs text-slate-400">Você será redirecionado em instantes...</div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConfirmationPage;
