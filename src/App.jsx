import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import NumberPage from '@/pages/NumberPage';
import AdminPage from '@/pages/AdminPage';
import PricingPage from '@/pages/PricingPage';
import SignUpPage from '@/pages/SignUpPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';
import ConfirmationPage from '@/pages/ConfirmationPage';
import LoginPage from '@/pages/LoginPage'; 
import Layout from '@/components/Layout';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { supabase } from '@/lib/supabaseClient';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-white text-xl">Carregando...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/numero" 
          element={
            <ProtectedRoute>
              <NumberPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/planos" element={<PricingPage />} />
        <Route path="/cadastro" element={user ? <Navigate to="/numero" /> : <SignUpPage />} />
        <Route path="/login" element={user ? <Navigate to="/numero" /> : <LoginPage />} />
        <Route path="/verificar-email" element={<VerifyEmailPage />} />
        <Route path="/confirmacao" element={<ConfirmationPage />} />
      </Routes>
      <Toaster />
    </Layout>
  );
}

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Conectado ao backend:", data);
      })
      .catch((err) => {
        console.error("❌ Erro ao conectar ao backend:", err);
      });
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
