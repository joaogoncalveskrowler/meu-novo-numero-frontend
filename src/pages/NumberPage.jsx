import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { useToast } from '@/components/ui/use-toast';
    import { Smartphone, Copy, RefreshCw, MessageSquare, Clock, AlertTriangle } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { useAuth } from '@/contexts/AuthContext'; 
    import { supabase } from '@/lib/supabaseClient';

    const NUMBER_VALIDITY_MINUTES = 20;

    const NumberPage = () => {
      const [virtualNumber, setVirtualNumber] = useState(null);
      const [messages, setMessages] = useState([]);
      const [timeLeft, setTimeLeft] = useState(0);
      const { toast } = useToast();
      const { user } = useAuth(); 

      const generateNumber = async () => {
        if (!user) {
          toast({
            title: "Acesso Negado",
            description: "Você precisa estar logado para gerar um número.",
            variant: "destructive",
          });
          return;
        }
        
        // Lógica para obter um número do Supabase (simulada por enquanto)
        // Idealmente, você teria uma tabela 'phone_numbers' e uma função para alocar um número disponível.
        // Por agora, vamos simular e guardar no localStorage, mas associado ao user.id se possível.
        const newNumber = `+55 (XX) 9${Math.floor(10000000 + Math.random() * 90000000)}`;
        const expirationTime = Date.now() + NUMBER_VALIDITY_MINUTES * 60 * 1000;

        localStorage.setItem(`virtualNumber_${user.id}`, newNumber);
        localStorage.setItem(`numberExpiration_${user.id}`, expirationTime.toString());
        localStorage.setItem(`virtualMessages_${user.id}`, JSON.stringify([]));

        setVirtualNumber(newNumber);
        setMessages([]);
        setTimeLeft(NUMBER_VALIDITY_MINUTES * 60);
        toast({
          title: "Número Gerado!",
          description: `Seu novo número virtual é ${newNumber}. Válido por ${NUMBER_VALIDITY_MINUTES} minutos.`,
          variant: "default",
        });
      };

      const copyNumber = () => {
        if (virtualNumber) {
          navigator.clipboard.writeText(virtualNumber);
          toast({
            title: "Número Copiado!",
            description: "O número virtual foi copiado para a área de transferência.",
          });
        }
      };

      const fetchMessages = () => {
        if (!user || !virtualNumber) return;

        // Simulação de busca de mensagens. Em um app real, você faria uma query no Supabase.
        // SELECT * FROM messages WHERE phone_number_id = (SELECT id FROM phone_numbers WHERE phone_number = virtualNumber AND user_id = user.id)
        const exampleMessages = [
          { id: Date.now() + Math.random(), sender: "ServiçoX", content: `Seu código de verificação é: ${Math.floor(100000 + Math.random() * 900000)}`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
          { id: Date.now() + Math.random(), sender: "PromoApp", content: "Oferta especial! Use o código PROMO123.", time: new Date(Date.now() - 2*60*1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ];
        const storedMessages = JSON.parse(localStorage.getItem(`virtualMessages_${user.id}`)) || [];
        
        let newMessagesList = storedMessages;
        if (Math.random() > 0.7) { 
          const newMessage = exampleMessages[Math.floor(Math.random()*exampleMessages.length)];
          newMessagesList = [newMessage, ...storedMessages].slice(0,10); 
           toast({
            title: "Nova Mensagem Recebida!",
            description: `De: ${newMessage.sender}`,
          });
        }
        localStorage.setItem(`virtualMessages_${user.id}`, JSON.stringify(newMessagesList));
        setMessages(newMessagesList);
      };

      useEffect(() => {
        if (!user) return;

        const storedNum = localStorage.getItem(`virtualNumber_${user.id}`);
        const expiration = localStorage.getItem(`numberExpiration_${user.id}`);
        if (storedNum && expiration && Date.now() < parseInt(expiration)) {
          setVirtualNumber(storedNum);
          const remaining = Math.floor((parseInt(expiration) - Date.now()) / 1000);
          setTimeLeft(remaining > 0 ? remaining : 0);
          const storedMessages = JSON.parse(localStorage.getItem(`virtualMessages_${user.id}`)) || [];
          setMessages(storedMessages);
        } else if (storedNum) { 
            localStorage.removeItem(`virtualNumber_${user.id}`);
            localStorage.removeItem(`numberExpiration_${user.id}`);
            localStorage.removeItem(`virtualMessages_${user.id}`);
        }
      }, [user]);

      useEffect(() => {
        let timerInterval;
        if (timeLeft > 0 && user) {
          timerInterval = setInterval(() => {
            setTimeLeft(prevTime => {
              if (prevTime <= 1) {
                clearInterval(timerInterval);
                setVirtualNumber(null);
                localStorage.removeItem(`virtualNumber_${user.id}`);
                localStorage.removeItem(`numberExpiration_${user.id}`);
                localStorage.removeItem(`virtualMessages_${user.id}`);
                toast({
                  title: "Número Expirado",
                  description: "Seu número virtual temporário expirou. Gere um novo se precisar.",
                  variant: "destructive",
                });
                return 0;
              }
              localStorage.setItem(`numberExpiration_${user.id}`, (Date.now() + (prevTime -1) * 1000).toString());
              return prevTime - 1;
            });
          }, 1000);
        }
        return () => clearInterval(timerInterval);
      }, [timeLeft, toast, user]);

      useEffect(() => {
        let messageFetchInterval;
        if (virtualNumber && user) {
          fetchMessages(); 
          messageFetchInterval = setInterval(fetchMessages, 15000); 
        }
        return () => clearInterval(messageFetchInterval);
      }, [virtualNumber, user]);

      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };


      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <Card className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center text-yellow-400">
                <Smartphone className="w-8 h-8 mr-3" />
                Seu Número Virtual Temporário
              </CardTitle>
              <CardDescription className="text-slate-200 dark:text-slate-300">
                {virtualNumber ? `Este número é válido por ${NUMBER_VALIDITY_MINUTES} minutos.` : "Clique abaixo para obter um número temporário."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!virtualNumber ? (
                <Button onClick={generateNumber} size="lg" className="w-full text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-lg">
                  <RefreshCw className="w-5 h-5 mr-2" /> Gerar Número (R$ 1,00 / 20 min)
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Input type="text" value={virtualNumber} readOnly className="text-2xl font-mono bg-slate-700/50 border-slate-600 text-green-300 flex-grow selection:bg-yellow-500 selection:text-black" />
                    <Button variant="outline" size="icon" onClick={copyNumber} className="border-slate-600 hover:bg-slate-700">
                      <Copy className="w-5 h-5 text-yellow-400" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-slate-300 dark:text-slate-400">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-400 animate-pulse" />
                      <span>Tempo restante: {formatTime(timeLeft)}</span>
                    </div>
                    <Button variant="ghost" onClick={fetchMessages} className="hover:text-yellow-300">
                      <RefreshCw className="w-4 h-4 mr-1" /> Atualizar Mensagens
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {virtualNumber && (
            <Card className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center text-yellow-400">
                  <MessageSquare className="w-7 h-7 mr-3" />
                  Mensagens Recebidas
                </CardTitle>
                <CardDescription className="text-slate-200 dark:text-slate-300">
                  As mensagens SMS recebidas neste número aparecerão aqui. Atualizações automáticas a cada 15 segundos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <p className="text-center text-slate-400 dark:text-slate-500 py-8">Nenhuma mensagem recebida ainda. Use o número e aguarde.</p>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 rounded-lg bg-slate-700/30 dark:bg-slate-900/50 border border-slate-600/50"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-semibold text-teal-300">{msg.sender}</p>
                          <p className="text-xs text-slate-400">{msg.time}</p>
                        </div>
                        <p className="text-slate-100 dark:text-slate-200 whitespace-pre-wrap break-words">{msg.content}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      );
    };

    export default NumberPage;