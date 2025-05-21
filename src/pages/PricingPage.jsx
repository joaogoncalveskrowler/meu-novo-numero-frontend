import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { CheckCircle, Zap, Star, Briefcase, ShieldCheck, TrendingUp } from 'lucide-react';
    import { Link } from 'react-router-dom';

    const PlanCard = ({ title, price, priceDetails, features, popular, buttonText, buttonLink = "/cadastro", icon, delay, highlightColor = "from-pink-500 to-purple-600", requiresAuth = true }) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={`h-full flex flex-col ${popular ? 'border-4 border-yellow-400 dark:border-yellow-500 transform scale-105' : ''} rounded-xl`}
      >
        <Card className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-md border-slate-700/50 shadow-xl h-full flex flex-col relative overflow-hidden">
          {popular && (
            <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 px-3 py-1 text-xs font-bold rounded-bl-lg z-10">POPULAR</div>
          )}
          <CardHeader className="pb-4">
            <div className="flex items-center mb-3">
              {icon}
              <CardTitle className="text-2xl ml-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">{title}</CardTitle>
            </div>
            <div className="flex items-baseline">
              <span className="text-4xl font-extrabold text-white">{price}</span>
              {priceDetails && <span className="ml-1 text-lg text-slate-300 dark:text-slate-400">{priceDetails}</span>}
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-3 pt-0">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-1 shrink-0" />
                <p className="text-slate-200 dark:text-slate-300">{feature}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link to={requiresAuth ? buttonLink : "/numero"} className="w-full">
              <Button size="lg" className={`w-full text-lg font-semibold bg-gradient-to-r ${highlightColor} hover:opacity-90 text-white shadow-md`}>
                {buttonText}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    );

    const PricingPage = () => {
      return (
        <div className="py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
                Nossos Planos
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 dark:text-slate-300 max-w-2xl mx-auto">
              Escolha o plano perfeito para suas necessidades. Preços transparentes em Reais e ativação instantânea.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <PlanCard
              icon={<Zap className="w-8 h-8 text-orange-400" />}
              title="Números Temporários"
              price="A partir de R$1"
              priceDetails="/ 20 min"
              features={[
                "Pague apenas pelo que usar",
                "Validade de 20 minutos por número",
                "Ideal para verificações rápidas",
                "Ampla seleção de países (em breve)",
                "Requer cadastro simples",
              ]}
              buttonText="Comprar Número Avulso"
              buttonLink="/numero" 
              delay={0.1}
              highlightColor="from-orange-500 to-red-600"
            />
            <PlanCard
              icon={<Star className="w-8 h-8 text-yellow-400" />}
              title="Números Fixos"
              price="R$9,90"
              priceDetails="/ mês"
              features={[
                "Mantenha um número exclusivo",
                "Ideal para uso contínuo e profissional",
                "Receba SMS ilimitados (consulte política)",
                "Suporte prioritário",
                "Faturamento recorrente simplificado",
              ]}
              popular
              buttonText="Assinar Plano Mensal"
              delay={0.3}
              highlightColor="from-teal-500 to-cyan-600"
            />
            <PlanCard
              icon={<ShieldCheck className="w-8 h-8 text-green-400" />}
              title="Número Vitalício"
              price="A partir de R$199"
              priceDetails="/ pagamento único"
              features={[
                "Seu número para sempre!",
                "Pagamento único, sem mensalidades",
                "Perfeito para quem busca estabilidade",
                "Quantidade limitada por país",
                "Benefícios exclusivos VIP",
              ]}
              buttonText="Quero Meu Número Vitalício!"
              delay={0.5}
              highlightColor="from-green-500 to-lime-600"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">Créditos Pré-Pagos</h2>
            <p className="text-lg text-slate-200 dark:text-slate-300 mb-8 max-w-xl mx-auto">
              Adicione créditos à sua conta e use para números temporários ou outros serviços. Quanto mais créditos, maior o bônus!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              {[
                { amount: "R$10", bonus: "+ 0% Bônus", color: "from-sky-500 to-blue-600" },
                { amount: "R$20", bonus: "+ 5% Bônus", color: "from-indigo-500 to-purple-600" },
                { amount: "R$50", bonus: "+ 10% Bônus", color: "from-pink-500 to-rose-600" },
              ].map((credit, index) => (
                 <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                 >
                    <Card className={`bg-gradient-to-br ${credit.color} text-white shadow-lg p-6 transform hover:scale-105 transition-transform`}>
                        <p className="text-4xl font-bold">{credit.amount}</p>
                        <p className="text-lg font-semibold">{credit.bonus}</p>
                    </Card>
                 </motion.div>
              ))}
            </div>
             <Link to="/cadastro">
                <Button size="lg" className="text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:opacity-90 text-white shadow-md px-10 py-6">
                    <TrendingUp className="w-5 h-5 mr-2"/> Comprar Créditos
                </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <Card className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-md border-slate-700/50 shadow-xl">
              <CardHeader className="items-center text-center">
                <Briefcase className="w-12 h-12 text-purple-400 mb-3" />
                <CardTitle className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">API para Empresas</CardTitle>
                <CardDescription className="text-slate-200 dark:text-slate-300 text-lg max-w-xl mx-auto">
                  Integre nossos serviços de números virtuais em suas aplicações com nossa API robusta e confiável.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-slate-200 dark:text-slate-300">Cobrança por volume, documentação completa e suporte técnico especializado para escalar seu negócio.</p>
                <Button size="lg" variant="outline" className="text-lg font-semibold border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-slate-900 shadow-lg px-8 py-5">
                  Entre em Contato para Demanda
                </Button>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      );
    };

    export default PricingPage;