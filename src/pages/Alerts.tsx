import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Grid
} from '@mui/material';
import {
  Warning as WarningIcon,
  Info as InfoIcon,
  Dangerous as DangerIcon,
  LocationOn as LocationIcon,
  Check as CheckIcon,
  MarkAsUnread as UnreadIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAlertStore } from '../store/alertStore';

const Alerts: React.FC = () => {
  const { t } = useTranslation();
  const { alerts, fetchAlerts, markAsRead, markAsAcknowledged, clearAlert, loading } = useAlertStore();

  useEffect(() => {
    fetchAlerts();
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'danger':
        return <DangerIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'info':
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'danger':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading && alerts.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading alerts...</Typography>
      </Box>
    );
  }

  if (alerts.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CheckIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {t('alerts.noAlerts')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You're all caught up! No alerts to display.
        </Typography>
      </Box>
    );
  }

  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  const readAlerts = alerts.filter(alert => alert.isRead);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('alerts.title')}
      </Typography>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main">
                {alerts.filter(a => a.severity === 'danger').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Critical Alerts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">
                {alerts.filter(a => a.severity === 'warning').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Warning Alerts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                {alerts.filter(a => a.severity === 'info').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Info Alerts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4">
                {unreadAlerts.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Unread
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Unread Alerts */}
      {unreadAlerts.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Unread Alerts ({unreadAlerts.length})
            </Typography>
            <List>
              {unreadAlerts.map((alert, index) => (
                <React.Fragment key={alert.id}>
                  <ListItem
                    sx={{
                      bgcolor: alert.isRead ? 'transparent' : 'action.hover',
                      borderRadius: 1,
                      mb: 1
                    }}
                    secondaryAction={
                      <Box>
                        <IconButton
                          edge="end"
                          onClick={() => markAsRead(alert.id)}
                          size="small"
                          title="Mark as read"
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => clearAlert(alert.id)}
                          size="small"
                          title="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemIcon>
                      {getSeverityIcon(alert.severity)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="subtitle1" component="span">
                            {alert.title}
                          </Typography>
                          <Chip
                            label={alert.severity}
                            size="small"
                            color={getSeverityColor(alert.severity) as any}
                          />
                          <Chip
                            label={alert.type.replace('_', ' ')}
                            size="small"
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {formatTimeAgo(alert.createdAt)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {alert.message}
                          </Typography>
                          {alert.location && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationIcon fontSize="small" color="action" />
                              <Typography variant="caption" color="text.secondary">
                                {alert.location.address || `${alert.location.latitude.toFixed(4)}, ${alert.location.longitude.toFixed(4)}`}
                              </Typography>
                            </Box>
                          )}
                          {alert.actionRequired && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => markAsAcknowledged(alert.id)}
                              sx={{ mt: 1 }}
                            >
                              {t('alerts.acknowledge')}
                            </Button>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < unreadAlerts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Read Alerts */}
      {readAlerts.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Previous Alerts ({readAlerts.length})
            </Typography>
            <List>
              {readAlerts.map((alert, index) => (
                <React.Fragment key={alert.id}>
                  <ListItem
                    sx={{ opacity: 0.7 }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => clearAlert(alert.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      {getSeverityIcon(alert.severity)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="subtitle1" component="span">
                            {alert.title}
                          </Typography>
                          <Chip
                            label={alert.severity}
                            size="small"
                            color={getSeverityColor(alert.severity) as any}
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {formatTimeAgo(alert.createdAt)}
                          </Typography>
                          {alert.isAcknowledged && (
                            <Chip label="Acknowledged" size="small" color="success" variant="outlined" />
                          )}
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2">
                          {alert.message}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < readAlerts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Alerts;