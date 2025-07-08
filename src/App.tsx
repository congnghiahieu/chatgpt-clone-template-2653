import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import Index from './pages/Index';
import Login from './pages/Login';

const queryClient = new QueryClient();

// Simple auth check
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  return user ? children : (
      <Navigate
        to='/login'
        replace
      />
    );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      defaultTheme='dark'
      storageKey='vp-ui-theme'
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
