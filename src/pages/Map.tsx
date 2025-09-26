import React from 'react';
import { Box, Typography } from '@mui/material';
import TouristMap from '../components/Map/TouristMap';

const Map: React.FC = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h1">
          Interactive Map
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View your location, safety zones, and real-time updates
        </Typography>
      </Box>
      
      <Box sx={{ flex: 1 }}>
        <TouristMap height="100%" showControls />
      </Box>
    </Box>
  );
};

export default Map;