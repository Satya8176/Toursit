import React, { useState } from 'react';
import {
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { Emergency as EmergencyIcon } from '@mui/icons-material';
import { useAuthStore } from '../../store/authStore';
import { useLocationStore } from '../../store/locationStore';
import { useTranslation } from 'react-i18next';

const PanicButton: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { currentLocation } = useLocationStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handlePanicPress = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmPanic = async () => {
    setIsSending(true);
    
    try {
      // TODO: Replace with actual API endpoint
      // await axios.post('/api/emergency/panic', {
      //   touristId: user?.id,
      //   location: currentLocation,
      //   timestamp: new Date().toISOString()
      // });

      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock emergency response
      const emergencyData = {
        touristId: user?.id,
        location: currentLocation,
        timestamp: new Date().toISOString(),
        emergencyServices: [
          { type: 'Police', eta: '5-8 minutes', contact: '100' },
          { type: 'Medical', eta: '8-12 minutes', contact: '108' },
          { type: 'Tourist Helpline', eta: '2-5 minutes', contact: '1363' }
        ]
      };

      console.log('Emergency activated:', emergencyData);
      
      setIsActivated(true);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to activate emergency:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleCancelPanic = () => {
    setIsDialogOpen(false);
  };

  const handleDeactivateEmergency = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // await axios.post('/api/emergency/deactivate', {
      //   touristId: user?.id,
      //   timestamp: new Date().toISOString()
      // });

      setIsActivated(false);
    } catch (error) {
      console.error('Failed to deactivate emergency:', error);
    }
  };

  if (isActivated) {
    return (
      <Box sx={{ position: 'relative' }}>
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small" onClick={handleDeactivateEmergency}>
              Deactivate
            </Button>
          }
        >
          <Typography variant="h6" component="div">
            Emergency Activated
          </Typography>
          <Typography variant="body2">
            Help is on the way. Stay calm and stay where you are if safe to do so.
          </Typography>
        </Alert>
        
        <Fab
          color="error"
          size="large"
          sx={{
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' }
            }
          }}
        >
          <EmergencyIcon />
        </Fab>
      </Box>
    );
  }

  return (
    <>
      <Fab
        color="error"
        size="large"
        onClick={handlePanicPress}
        sx={{
          bgcolor: 'error.main',
          '&:hover': { bgcolor: 'error.dark' },
          boxShadow: 3
        }}
      >
        <EmergencyIcon />
      </Fab>

      <Dialog
        open={isDialogOpen}
        onClose={handleCancelPanic}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', color: 'error.main' }}>
          <EmergencyIcon sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h5" component="div">
            Emergency SOS
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
            Are you in immediate danger? This will alert emergency services and your emergency contacts.
          </Typography>
          
          {currentLocation && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Your location will be shared:
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
              </Typography>
            </Alert>
          )}
          
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Emergency services will be notified immediately. Only use this in genuine emergencies.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
          <Button onClick={handleCancelPanic} variant="outlined" size="large">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPanic}
            variant="contained"
            color="error"
            size="large"
            disabled={isSending}
            startIcon={isSending ? <CircularProgress size={16} /> : <EmergencyIcon />}
          >
            {isSending ? 'Activating...' : 'Activate SOS'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PanicButton;