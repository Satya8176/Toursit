import React from 'react';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge
} from '@mui/material';
import {
  Home as HomeIcon,
  LocationOn as LocationIcon,
  NotificationsActive as AlertsIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlertStore } from '../../store/alertStore';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useAlertStore();

  const getValue = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 0;
      case '/map':
        return 1;
      case '/alerts':
        return 2;
      case '/profile':
        return 3;
      case '/settings':
        return 4;
      default:
        return 0;
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate('/dashboard');
        break;
      case 1:
        navigate('/map');
        break;
      case 2:
        navigate('/alerts');
        break;
      case 3:
        navigate('/profile');
        break;
      case 4:
        navigate('/settings');
        break;
    }
  };

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      elevation={3}
    >
      <MuiBottomNavigation value={getValue()} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Map" icon={<LocationIcon />} />
        <BottomNavigationAction
          label="Alerts"
          icon={
            <Badge badgeContent={unreadCount} color="error">
              <AlertsIcon />
            </Badge>
          }
        />
        <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;