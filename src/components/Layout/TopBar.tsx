import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Language as LanguageIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { useAlertStore } from '../../store/alertStore';
import { Shield } from 'lucide-react';

const TopBar: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const { unreadCount } = useAlertStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Shield size={24} color="white" />
          <Typography variant="h6" component="div" sx={{ ml: 1, color: 'white' }}>
            {t('app.title')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <LanguageIcon />
          </IconButton>

          <IconButton onClick={handleMenu} color="inherit">
            {user?.profilePicture ? (
              <Avatar src={user.profilePicture} sx={{ width: 32, height: 32 }} />
            ) : (
              <AccountIcon />
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <AccountIcon sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              {t('auth.logout')}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;