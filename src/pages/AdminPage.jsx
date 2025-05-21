
    import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { BarChart, Users, PhoneOff, ListChecks, Smartphone } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';

    // Mock data - replace with actual API calls
    const initialStats = {
      activeNumbers: 125,
      users: 850,
      messagesToday: 5670,
      availableNumbers: 5000,
    };

    const initialNumberLogs = [
      { id: 'num_1', number: '+15551234567', user: 'user_a', startTime: '2025-05-20 10:00', status: 'Ativo', messages: 5 },
      { id: 'num_2', number: '+442079460958', user: 'user_b', startTime: '2025-05-20 10:05', status: 'Expirado', messages: 2 },
      { id: 'num_3', number: '+5511987654321', user: 'user_c', startTime: '2025-05-20 10:15', status: 'Ativo', messages: 12 },
    ];

    const AdminPage = () => {
      const [stats, setStats] = useState(initialStats);
      const [numberLogs, setNumberLogs] = useState(initialNumberLogs);
      const [searchTerm, setSearchTerm] = useState('');
      const { toast } = useToast();

      useEffect(() => {
        // Simulate fetching data
        const timer = setTimeout(() => {
          setStats(prev => ({ ...prev, messagesToday: prev.messagesToday + Math.floor(Math.random() * 10) }));
        }, 5000);
        return () => clearTimeout(timer);
      }, [stats]);

      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };

      const filteredLogs = numberLogs.filter(log =>
        log.number.includes(searchTerm) || log.user.includes(searchTerm)
      );

      const deactivateNumber = (numberId) => {
        setNumberLogs(prevLogs => prevLogs.map(log => 
          log.id === numberId ? { ...log, status: 'Desativado Manualmente' } : log
        ));
        toast({
          title: "Número Desativado",
          description: `O número associado ao ID ${numberId} foi marcado como desativado.`,
          variant: "destructive"
        });
      };

      const StatCard = ({ title, value, icon, color }) => (
        <Card className={`bg-gradient-to-br ${color} text-white shadow-lg`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
          </CardContent>
        </Card>
      );

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">Painel de Administração</h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Números Ativos" value={stats.activeNumbers} icon={<Smartphone className="h-5 w-5 text-white/70" />} color="from-sky-500 to-blue-600" />
            <StatCard title="Usuários (Simulado)" value={stats.users} icon={<Users className="h-5 w-5 text-white/70" />} color="from-green-500 to-teal-600" />
            <StatCard title="Mensagens Hoje" value={stats.messagesToday} icon={<BarChart className="h-5 w-5 text-white/70" />} color="from-orange-500 to-red-600" />
            <StatCard title="Números Disponíveis (API)" value={stats.availableNumbers} icon={<ListChecks className="h-5 w-5 text-white/70" />} color="from-purple-500 to-indigo-600" />
          </div>

          <Card className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-400">Logs de Uso de Números</CardTitle>
              <CardDescription className="text-slate-200 dark:text-slate-300">
                Monitore e gerencie os números virtuais em uso.
              </CardDescription>
              <Input 
                type="search" 
                placeholder="Buscar por número ou usuário..." 
                value={searchTerm}
                onChange={handleSearch}
                className="mt-4 bg-slate-700/50 border-slate-600 placeholder:text-slate-400"
              />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-700/30">
                    <TableHead className="text-slate-300">Número</TableHead>
                    <TableHead className="text-slate-300">Usuário (ID)</TableHead>
                    <TableHead className="text-slate-300">Início</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-right text-slate-300">Mensagens</TableHead>
                    <TableHead className="text-right text-slate-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id} className="border-slate-700 hover:bg-slate-700/30">
                      <TableCell className="font-medium text-green-400">{log.number}</TableCell>
                      <TableCell className="text-slate-300">{log.user}</TableCell>
                      <TableCell className="text-slate-400">{log.startTime}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          log.status === 'Ativo' ? 'bg-green-500/20 text-green-300' : 
                          log.status === 'Expirado' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {log.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-slate-300">{log.messages}</TableCell>
                      <TableCell className="text-right">
                        {log.status === 'Ativo' && (
                          <Button variant="destructive" size="sm" onClick={() => deactivateNumber(log.id)}>
                            <PhoneOff className="h-4 w-4 mr-1" /> Desativar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredLogs.length === 0 && (
                <p className="text-center text-slate-400 dark:text-slate-500 py-8">Nenhum log encontrado com os critérios de busca.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default AdminPage;
  