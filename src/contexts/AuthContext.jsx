import React, { createContext, useState, useEffect, useContext } from 'react';
    import { supabase } from '@/lib/supabaseClient';

    const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const getSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          setUser(session?.user ?? null);
          setLoading(false);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
          }
        );

        return () => {
          authListener?.subscription.unsubscribe();
        };
      }, []);

      const login = async (email, password) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        return { data, error };
      };

      const logout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setUser(null);
        setLoading(false);
      };
      
      const value = {
        user,
        login,
        logout,
        loading,
      };

      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };

    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };