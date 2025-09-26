import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  VerifiedUser as VerifiedIcon,
  Schedule as PendingIcon,
  Error as ErrorIcon,
  Badge as BadgeIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
});

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile, loading } = useAuthStore();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (!user) return null;

  const getKYCStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <VerifiedIcon color="success" />;
      case 'pending':
        return <PendingIcon color="warning" />;
      case 'rejected':
        return <ErrorIcon color="error" />;
      default:
        return <PendingIcon color="disabled" />;
    }
  };

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleEditSubmit = async (values: any) => {
    try {
      await updateProfile(values);
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {t('profile.title')}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => setEditDialogOpen(true)}
        >
          {t('profile.editProfile')}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Basic Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={user.profilePicture}
                  sx={{ width: 80, height: 80, mr: 2 }}
                >
                  {user.firstName[0]}{user.lastName[0]}
                </Avatar>
                <Box>
                  <Typography variant="h5" component="div">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.phoneNumber}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BadgeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle2">
                    {t('profile.digitalId')}
                  </Typography>
                </Box>
                <Typography variant="body2" fontFamily="monospace" sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  {user.digitalTouristId}
                </Typography>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {getKYCStatusIcon(user.kycStatus)}
                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    {t('profile.kycStatus')}
                  </Typography>
                </Box>
                <Chip
                  label={user.kycStatus.charAt(0).toUpperCase() + user.kycStatus.slice(1)}
                  color={getKYCStatusColor(user.kycStatus) as any}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Trip Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                {t('profile.tripDetails')}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle2">Destination</Typography>
                </Box>
                <Typography variant="body1">
                  {user.tripItinerary.destination}
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Start Date
                  </Typography>
                  <Typography variant="body2">
                    {new Date(user.tripItinerary.startDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    End Date
                  </Typography>
                  <Typography variant="body2">
                    {new Date(user.tripItinerary.endDate).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Purpose
                </Typography>
                <Typography variant="body2">
                  {user.tripItinerary.purpose}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Emergency Contact */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                {t('profile.emergencyContact')}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">Name</Typography>
                  </Box>
                  <Typography variant="body1">
                    {user.emergencyContact.name}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle2">Phone</Typography>
                  </Box>
                  <Typography variant="body1">
                    {user.emergencyContact.phoneNumber}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">Relationship</Typography>
                  </Box>
                  <Typography variant="body1">
                    {user.emergencyContact.relationship}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('profile.editProfile')}</DialogTitle>
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber
          }}
          validationSchema={validationSchema}
          onSubmit={handleEditSubmit}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="firstName"
                      label={t('auth.firstName')}
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="lastName"
                      label={t('auth.lastName')}
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="phoneNumber"
                      label={t('auth.phoneNumber')}
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              
              <DialogActions>
                <Button onClick={() => setEditDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button type="submit" variant="contained" disabled={loading}>
                  {t('common.save')}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default Profile;