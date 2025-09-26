import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import TopBar from './TopBar';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Outlet />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopBar />
      <Container maxWidth="lg" sx={{ py: 2, pb: 10 }}>
        <Paper elevation={0} sx={{ minHeight: 'calc(100vh - 120px)' }}>
          <Outlet />
        </Paper>
      </Container>
      <BottomNavigation />
    </Box>
  );
};

export default AppLayout;