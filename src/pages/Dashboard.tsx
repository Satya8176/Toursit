import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Alert
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Schedule as TimeIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { useLocationStore } from '../store/locationStore';
import { useAlertStore } from '../store/alertStore';
import SafetyScoreCard from '../components/SafetyScore/SafetyScoreCard';
import TouristMap from '../components/Map/TouristMap';
import PanicButton from '../components/Emergency/PanicButton';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { currentLocation, startTracking, isTracking } = useLocationStore();
  const { alerts, fetchAlerts } = useAlertStore();

  const activeAlerts = alerts.filter(alert => !alert.isAcknowledged);

  useEffect(() => {
    fetchAlerts();
    if (user?.isLocationTrackingEnabled && !isTracking) {
      startTracking();
    }
  }, [user?.isLocationTrackingEnabled, isTracking]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('dashboard.welcome')}, {user?.firstName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay safe and enjoy your journey
        </Typography>
      </Box>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Alert 
          severity={activeAlerts.some(a => a.severity === 'danger') ? 'error' : 'warning'}
          sx={{ mb: 3 }}
          icon={<WarningIcon />}
        >
          <Typography variant="subtitle2">
            {activeAlerts.length} Active Alert{activeAlerts.length > 1 ? 's' : ''}
          </Typography>
          <Typography variant="body2">
            {activeAlerts[0].title} {activeAlerts.length > 1 && `and ${activeAlerts.length - 1} more`}
          </Typography>
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Safety Score */}
        <Grid item xs={12} md={4}>
          <SafetyScoreCard />
        </Grid>

        {/* Current Location & Status */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      {t('dashboard.currentLocation')}
                    </Typography>
                  </Box>
                  {currentLocation ? (
                    <>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Lat: {currentLocation.latitude.toFixed(6)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Lng: {currentLocation.longitude.toFixed(6)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Updated: {new Date(currentLocation.timestamp).toLocaleTimeString()}
                      </Typography>
                      <Chip
                        icon={<CheckIcon />}
                        label="Location Active"
                        color="success"
                        size="small"
                        sx={{ mt: 2 }}
                      />
                    </>
                  ) : (
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Location not available
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={startTracking}
                        sx={{ mt: 1 }}
                      >
                        Enable Location
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Trip Status</Typography>
                  </Box>
                  {user?.tripItinerary && (
                    <>
                      <Typography variant="body2" gutterBottom>
                        <strong>Destination:</strong> {user.tripItinerary.destination}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Duration:</strong> {new Date(user.tripItinerary.startDate).toLocaleDateString()} - {new Date(user.tripItinerary.endDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Purpose:</strong> {user.tripItinerary.purpose}
                      </Typography>
                      <Chip
                        label="Active Trip"
                        color="primary"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Map */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <TouristMap height={400} />
            </CardContent>
          </Card>
        </Grid>

        {/* Emergency Button & Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {t('dashboard.quickActions')}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <PanicButton />
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Press the emergency button if you're in immediate danger
              </Typography>
              
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="outlined" fullWidth size="small">
                  Report Incident
                </Button>
                <Button variant="outlined" fullWidth size="small">
                  Find Nearest Hospital
                </Button>
                <Button variant="outlined" fullWidth size="small">
                  Call Tourist Helpline
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;