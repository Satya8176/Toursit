import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  LinearProgress,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import {
  Security as SecurityIcon,
  Schedule as TimeIcon,
  People as CrowdIcon,
  WbSunny as WeatherIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useLocationStore } from '../../store/locationStore';
import { useTranslation } from 'react-i18next';

const SafetyScoreCard: React.FC = () => {
  const { t } = useTranslation();
  const { safetyScore, loading, fetchSafetyScore } = useLocationStore();

  useEffect(() => {
    fetchSafetyScore();
    // Refresh every 5 minutes
    const interval = setInterval(fetchSafetyScore, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Medium';
    return 'Low';
  };

  const factorIcons = {
    locationSafety: <SecurityIcon fontSize="small" />,
    timeOfDay: <TimeIcon fontSize="small" />,
    crowdDensity: <CrowdIcon fontSize="small" />,
    weatherConditions: <WeatherIcon fontSize="small" />,
    historicalIncidents: <WarningIcon fontSize="small" />
  };

  const factorLabels = {
    locationSafety: 'Location Safety',
    timeOfDay: 'Time of Day',
    crowdDensity: 'Crowd Density',
    weatherConditions: 'Weather',
    historicalIncidents: 'Historical Incidents'
  };

  if (loading || !safetyScore) {
    return (
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="between" mb={2}>
          <Typography variant="h6" component="div">
            {t('dashboard.safetyScore')}
          </Typography>
          <Chip
            label={getScoreLabel(safetyScore.overall)}
            color={getScoreColor(safetyScore.overall) as any}
            size="small"
          />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={safetyScore.overall}
              size={100}
              thickness={4}
              color={getScoreColor(safetyScore.overall) as any}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              bottom={0}
              right={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Typography variant="h4" component="div" fontWeight="bold">
                {safetyScore.overall}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                /100
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Safety Factors
        </Typography>

        <Grid container spacing={2}>
          {Object.entries(safetyScore.factors).map(([key, value]) => (
            <Grid item xs={12} key={key}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                {factorIcons[key as keyof typeof factorIcons]}
                <Typography variant="body2" flexGrow={1}>
                  {factorLabels[key as keyof typeof factorLabels]}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {value}/100
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={value}
                color={getScoreColor(value) as any}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="caption" color="text.secondary" mt={2} display="block">
          Last updated: {new Date(safetyScore.lastUpdated).toLocaleTimeString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SafetyScoreCard;