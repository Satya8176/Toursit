import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import AppLayout from './components/Layout/AppLayout';
import TouristRoutes from './routes/touristRoutes';
import { FCMService } from './services/fcm';
import './i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  useEffect(() => {
    // Initialize Firebase Cloud Messaging
    const fcm = FCMService.getInstance();
    fcm.initialize().catch(console.error);

    // Set up service worker for offline functionality
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppLayout>
            <TouristRoutes />
          </AppLayout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;