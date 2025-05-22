import React from 'react';
import { Link } from 'react-router-dom';
import FAQSection from '@/components/FAQSection';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, MessageCircle, Users, DollarSign, Sparkles, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="h-full"
  >
    <Card className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border-none shadow-xl h-full flex flex-col">
      <CardHeader className="flex flex-row items-center space-x-3 pb-3">
        {icon}
        <CardTitle className="text-xl text-yellow-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-slate-200 dark:text-slate-300">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
            Seu Número Virtual em Segundos.
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-teal-400 to-blue-500">
            Privacidade e Flexibilidade com Preços Justos.
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 dark:text-slate-300 max-w-3xl mx-auto mb-10">
          Obtenha números virtuais temporários, fixos ou vitalícios com suporte em português. Ideal para proteger sua privacidade, testar apps ou para seu negócio.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/planos">
            <Button
              size="lg"
              className="text-lg w-full sm:w-auto font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-transform duration-300 px-10 py-6"
            >
              Comprar Número Agora
            </Button>
          </Link>
          <Link to="/planos">
            <Button
              size="lg"
              variant="outline"
              className="text-lg w-full sm:w-auto font-semibold border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 shadow-lg transform hover:scale-105 transition-transform duration-300 px-10 py-6"
            >
              Ver Todos os Planos
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-5xl p-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 dark:from-purple-800 dark:via-pink-700 dark:to-orange-600 rounded-xl shadow-2xl mb-16"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <Sparkles className="w-12 h-12 text-yellow-300 mr-4 animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold text-white text-left">
              NOVIDADE: Números Virtuais Vitalícios!
            </h2>
          </div>
          <Link to="/planos">
            <Button
              size="lg"
              className="bg-yellow-400 text-slate-900 hover:bg-yellow-500 font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300 whitespace-nowrap"
            >
              Descobrir Planos Vitalícios <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.section>

      <motion.section 
        className="w-full max-w-6xl p-8 bg-white/5 dark:bg-slate-800/30 backdrop-blur-md rounded-xl shadow-2xl mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-sky-400">Por que escolher Meu Novo Número?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-10 h-10 text-yellow-400" />}
            title="Ativação Instantânea"
            description="Receba seu número virtual em segundos, pronto para usar."
            delay={0.5}
          />
          <FeatureCard
            icon={<Shield className="w-10 h-10 text-green-400" />}
            title="Proteja Sua Privacidade"
            description="Ideal para cadastros online, evitando spam e protegendo seu número pessoal."
            delay={0.7}
          />
          <FeatureCard
            icon={<DollarSign className="w-10 h-10 text-blue-400" />}
            title="Preços Acessíveis em Reais"
            description="Planos flexíveis e créditos pré-pagos, sem surpresas na fatura."
            delay={0.9}
          />
          <FeatureCard
            icon={<MessageCircle className="w-10 h-10 text-purple-400" />}
            title="Suporte em Português"
            description="Atendimento dedicado para te ajudar com qualquer dúvida."
            delay={1.1}
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-orange-400" />}
            title="Para Todos os Públicos"
            description="Desde usuários casuais até testadores de software e pequenas empresas."
            delay={1.3}
          />
           <FeatureCard
            icon={<Sparkles className="w-10 h-10 text-pink-400" />}
            title="Opções Vitalícias"
            description="Adquira números para sempre, sem mensalidades recorrentes."
            delay={1.5}
          />
        </div>
      </motion.section>
      
      <motion.section 
        className="w-full max-w-4xl p-8 bg-white/5 dark:bg-slate-800/30 backdrop-blur-md rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.7 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">Como Funciona?</h2>
        <ol className="list-decimal list-inside space-y-4 text-lg text-slate-200 dark:text-slate-300 text-left">
          <li>
            <span className="font-semibold text-yellow-300">Escolha seu Plano:</span> Opte por números temporários, fixos mensais, vitalícios ou compre créditos.
          </li>
          <li>
            <span className="font-semibold text-yellow-300">Crie sua Conta:</span> Cadastre-se rapidamente para gerenciar seus números e pagamentos.
          </li>
          <li>
            <span className="font-semibold text-yellow-300">Obtenha seu Número:</span> Selecione o país (em breve) e ative seu número virtual instantaneamente.
          </li>
          <li>
            <span className="font-semibold text-yellow-300">Use e Receba SMS:</span> Utilize para verificações, cadastros e visualize as mensagens em nosso painel seguro.
          </li>
        </ol>
      </motion.section>

      {/* Aqui entra o FAQ Section */}
      <FAQSection />

    </div>
  );
};

export default HomePage;
