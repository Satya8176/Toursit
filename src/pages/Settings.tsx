import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import {
  Language as LanguageIcon,
  Notifications as NotificationsIcon,
  LocationOn as LocationIcon,
  Security as SecurityIcon,
  Info as InfoIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { useLocationStore } from '../store/locationStore';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, updateProfile, logout } = useAuthStore();
  const { isTracking, startTracking, stopTracking } = useLocationStore();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'as', name: 'অসমীয়া (Assamese)' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const handleLocationTrackingToggle = async (enabled: boolean) => {
    if (!user) return;

    await updateProfile({ isLocationTrackingEnabled: enabled });
    
    if (enabled) {
      startTracking();
    } else {
      stopTracking();
    }
  };

  const handleNotificationChange = async (type: keyof typeof user.notificationPreferences, enabled: boolean) => {
    if (!user) return;

    const updatedPreferences = {
      ...user.notificationPreferences,
      [type]: enabled
    };

    await updateProfile({ notificationPreferences: updatedPreferences });
  };

  const handleLogout = () => {
    logout();
    setLogoutDialogOpen(false);
  };

  if (!user) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('settings.title')}
      </Typography>

      {/* Language Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LanguageIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6">{t('settings.language')}</Typography>
          </Box>
          
          <FormControl fullWidth>
            <InputLabel>Select Language</InputLabel>
            <Select
              value={i18n.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              label="Select Language"
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Privacy & Location */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SecurityIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6">{t('settings.privacy')}</Typography>
          </Box>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <LocationIcon />
              </ListItemIcon>
              <ListItemText
                primary={t('settings.locationTracking')}
                secondary="Allow the app to track your location for safety monitoring"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={user.isLocationTrackingEnabled && isTracking}
                  onChange={(e) => handleLocationTrackingToggle(e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <NotificationsIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6">{t('settings.notifications')}</Typography>
          </Box>
          
          <List>
            <ListItem>
              <ListItemText
                primary={t('settings.safetyAlerts')}
                secondary="Receive alerts about safety risks and geo-fence violations"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={user.notificationPreferences.safetyAlerts}
                  onChange={(e) => handleNotificationChange('safetyAlerts', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary={t('settings.locationUpdates')}
                secondary="Get notified about location-based information and updates"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={user.notificationPreferences.locationUpdates}
                  onChange={(e) => handleNotificationChange('locationUpdates', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary={t('settings.incidentReports')}
                secondary="Receive notifications about incidents in your area"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={user.notificationPreferences.incidentReports}
                  onChange={(e) => handleNotificationChange('incidentReports', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* About & App Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6">{t('settings.about')}</Typography>
          </Box>
          
          <List>
            <ListItem>
              <ListItemText
                primary="Smart Tourist Safety App"
                secondary="Version 1.0.0 - Built for SIH Project"
              />
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Emergency Contacts"
                secondary={
                  <Box>
                    <Typography variant="body2">Police: 100</Typography>
                    <Typography variant="body2">Medical Emergency: 108</Typography>
                    <Typography variant="body2">Tourist Helpline: 1363</Typography>
                  </Box>
                }
              />
            </ListItem>
            
            <Divider />
            
            <ListItem button onClick={() => setLogoutDialogOpen(true)}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography color="error.main">
                    {t('auth.logout')}
                  </Typography>
                }
                secondary="Sign out of your account"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to sign out? You'll need to log in again to access the app.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;