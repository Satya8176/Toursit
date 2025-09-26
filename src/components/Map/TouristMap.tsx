import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { useLocationStore } from '../../store/locationStore';
import { useTranslation } from 'react-i18next';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface TouristMapProps {
  height?: string | number;
  showControls?: boolean;
}

const TouristMap: React.FC<TouristMapProps> = ({ 
  height = 400, 
  showControls = true 
}) => {
  const { t } = useTranslation();
  const { currentLocation, geoFences, fetchGeoFences } = useLocationStore();
  const mapRef = useRef<any>(null);

  useEffect(() => {
    fetchGeoFences();
  }, []);

  // Default to Goa, India if no location is available
  const defaultCenter: [number, number] = [15.2993, 74.1240];
  const center: [number, number] = currentLocation 
    ? [currentLocation.latitude, currentLocation.longitude] 
    : defaultCenter;

  const getPolygonColor = (type: string, riskLevel: string) => {
    switch (type) {
      case 'safe_zone':
        return '#4CAF50';
      case 'risk_zone':
        return riskLevel === 'high' ? '#F44336' : '#FF9800';
      case 'restricted_zone':
        return '#9C27B0';
      default:
        return '#2196F3';
    }
  };

  const getPolygonOptions = (fence: any) => ({
    color: getPolygonColor(fence.type, fence.riskLevel),
    fillColor: getPolygonColor(fence.type, fence.riskLevel),
    fillOpacity: 0.2,
    weight: 2,
  });

  return (
    <Paper elevation={2} sx={{ height, overflow: 'hidden' }}>
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Current Location Marker */}
        {currentLocation && (
          <Marker position={[currentLocation.latitude, currentLocation.longitude]}>
            <Popup>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {t('map.yourLocation')}
                </Typography>
                <Typography variant="body2">
                  Lat: {currentLocation.latitude.toFixed(6)}
                </Typography>
                <Typography variant="body2">
                  Lng: {currentLocation.longitude.toFixed(6)}
                </Typography>
                <Typography variant="body2">
                  Accuracy: {currentLocation.accuracy}m
                </Typography>
              </Box>
            </Popup>
          </Marker>
        )}

        {/* Geo-fences */}
        {geoFences.map((fence) => (
          <Polygon
            key={fence.id}
            positions={fence.coordinates as [number, number][]}
            pathOptions={getPolygonOptions(fence)}
          >
            <Popup>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {fence.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {fence.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    size="small"
                    label={fence.type.replace('_', ' ')}
                    color={fence.type === 'safe_zone' ? 'success' : 'warning'}
                  />
                  <Chip
                    size="small"
                    label={fence.riskLevel}
                    color={
                      fence.riskLevel === 'low' ? 'success' :
                      fence.riskLevel === 'medium' ? 'warning' : 'error'
                    }
                  />
                </Box>
              </Box>
            </Popup>
          </Polygon>
        ))}
      </MapContainer>

      {showControls && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          <Paper sx={{ p: 1 }}>
            <Typography variant="caption" display="block">
              <span style={{ color: '#4CAF50' }}>●</span> {t('map.safeZone')}
            </Typography>
            <Typography variant="caption" display="block">
              <span style={{ color: '#FF9800' }}>●</span> {t('map.riskZone')}
            </Typography>
            <Typography variant="caption" display="block">
              <span style={{ color: '#9C27B0' }}>●</span> {t('map.restrictedZone')}
            </Typography>
          </Paper>
        </Box>
      )}
    </Paper>
  );
};

export default TouristMap;