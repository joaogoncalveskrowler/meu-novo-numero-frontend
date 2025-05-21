import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Smartphone, MessageSquare, ShieldCheck, Sun, Moon, DollarSign, UserPlus, LogIn, LogOut, UserCircle } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useTheme } from '@/components/ThemeProvider';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';
    
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"


    const Layout = ({ children }) => {
      const { theme, setTheme } = useTheme();
      const { user, logout, loading } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleLogout = async () => {
        await logout();
        toast({ title: "Logout realizado", description: "Você foi desconectado com sucesso." });
        navigate('/');
      };

      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-500 via-indigo-600 to-purple-700 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 text-white">
          <header className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 shadow-lg bg-white/10 backdrop-blur-md sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-xl sm:text-3xl font-bold tracking-tight flex items-center">
                <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-yellow-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
                  Meu Novo Número
                </span>
              </Link>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Link to="/planos" className="text-xs sm:text-sm hover:text-yellow-300 transition-colors flex items-center p-1 sm:p-2 rounded-md hover:bg-white/10">
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Planos
                </Link>

                {!loading && user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-white/20 p-0">
                         <UserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-slate-800/80 backdrop-blur-md border-slate-700 text-slate-100" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">Minha Conta</p>
                          <p className="text-xs leading-none text-slate-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-700"/>
                      <DropdownMenuItem className="hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer" onClick={() => navigate('/numero')}>
                        <Smartphone className="mr-2 h-4 w-4" />
                        <span>Meus Números</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer" onClick={() => navigate('/admin')}>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        <span>Painel Admin</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-700"/>
                      <DropdownMenuItem className="hover:bg-red-500/20 focus:bg-red-500/20 text-red-400 focus:text-red-300 cursor-pointer" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {!loading && !user && (
                  <>
                    <Link to="/cadastro" className="text-xs sm:text-sm hover:text-yellow-300 transition-colors flex items-center p-1 sm:p-2 rounded-md hover:bg-white/10">
                      <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Cadastrar
                    </Link>
                    <Link to="/login" className="text-xs sm:text-sm hover:text-yellow-300 transition-colors flex items-center p-1 sm:p-2 rounded-md hover:bg-white/10">
                      <LogIn className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Login
                    </Link>
                  </>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                  className="w-7 h-7 sm:w-9 sm:h-9 hover:bg-white/20"
                >
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </div>
            </nav>
          </header>

          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </main>

          <footer className="py-8 px-4 sm:px-6 lg:px-8 text-center bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
                <Link to="/planos" className="hover:text-yellow-300 transition-colors">
                  Nossos Planos
                </Link>
                <Link to="#" className="hover:text-yellow-300 transition-colors">
                  Termos de Uso
                </Link>
                <Link to="#" className="hover:text-yellow-300 transition-colors">
                  Política de Privacidade
                </Link>
                 <Link to="/admin" className="hover:text-yellow-300 transition-colors">
                  Painel Admin
                </Link>
              </div>
              <p className="text-sm text-slate-300 dark:text-slate-400">
                &copy; {new Date().getFullYear()} Meu Novo Número. Todos os direitos reservados.
              </p>
              <div className="mt-4 flex justify-center items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-green-400" />
                <span className="text-xs">Comunicação Segura</span>
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span className="text-xs">Privacidade Garantida</span>
              </div>
            </div>
          </footer>
        </div>
      );
    };

    export default Layout;