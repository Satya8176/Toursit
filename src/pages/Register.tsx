import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Grid,
  MenuItem
} from '@mui/material';
import { Shield } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';

const steps = ['Personal Info', 'Emergency Contact', 'Trip Details'];

const personalInfoSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

const emergencyContactSchema = Yup.object({
  emergencyName: Yup.string().required('Emergency contact name is required'),
  emergencyPhone: Yup.string().required('Emergency contact phone is required'),
  relationship: Yup.string().required('Relationship is required')
});

const tripDetailsSchema = Yup.object({
  destination: Yup.string().required('Destination is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required'),
  purpose: Yup.string().required('Purpose is required')
});

const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    emergencyName: '',
    emergencyPhone: '',
    relationship: '',
    destination: '',
    startDate: '',
    endDate: '',
    purpose: 'Tourism'
  });

  const getValidationSchema = () => {
    switch (activeStep) {
      case 0: return personalInfoSchema;
      case 1: return emergencyContactSchema;
      case 2: return tripDetailsSchema;
      default: return personalInfoSchema;
    }
  };

  const handleNext = (values: any) => {
    setFormData({ ...formData, ...values });
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values: any) => {
    const completeData = { ...formData, ...values };
    
    try {
      setError(null);
      await register({
        firstName: completeData.firstName,
        lastName: completeData.lastName,
        email: completeData.email,
        phoneNumber: completeData.phoneNumber,
        emergencyContact: {
          name: completeData.emergencyName,
          phoneNumber: completeData.emergencyPhone,
          relationship: completeData.relationship
        },
        tripItinerary: {
          destination: completeData.destination,
          startDate: completeData.startDate,
          endDate: completeData.endDate,
          purpose: completeData.purpose
        }
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError('Registration failed. Please try again.');
    }
  };

  const renderStepContent = (step: number, values: any, handleChange: any, handleBlur: any, errors: any, touched: any) => {
    switch (step) {
      case 0:
        return (
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
                name="email"
                label={t('auth.email')}
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="password"
                label={t('auth.password')}
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                label={t('auth.confirmPassword')}
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="emergencyName"
                label="Emergency Contact Name"
                value={values.emergencyName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.emergencyName && Boolean(errors.emergencyName)}
                helperText={touched.emergencyName && errors.emergencyName}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="emergencyPhone"
                label="Emergency Contact Phone"
                value={values.emergencyPhone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.emergencyPhone && Boolean(errors.emergencyPhone)}
                helperText={touched.emergencyPhone && errors.emergencyPhone}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                select
                fullWidth
                name="relationship"
                label="Relationship"
                value={values.relationship}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.relationship && Boolean(errors.relationship)}
                helperText={touched.relationship && errors.relationship}
              >
                <MenuItem value="Spouse">Spouse</MenuItem>
                <MenuItem value="Parent">Parent</MenuItem>
                <MenuItem value="Child">Child</MenuItem>
                <MenuItem value="Sibling">Sibling</MenuItem>
                <MenuItem value="Friend">Friend</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Field>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="destination"
                label="Destination"
                value={values.destination}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.destination && Boolean(errors.destination)}
                helperText={touched.destination && errors.destination}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="startDate"
                label="Start Date"
                type="date"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.startDate && Boolean(errors.startDate)}
                helperText={touched.startDate && errors.startDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="endDate"
                label="End Date"
                type="date"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={touched.endDate && errors.endDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                select
                fullWidth
                name="purpose"
                label="Purpose of Visit"
                value={values.purpose}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.purpose && Boolean(errors.purpose)}
                helperText={touched.purpose && errors.purpose}
              >
                <MenuItem value="Tourism">Tourism</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Medical">Medical</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Field>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 600 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Shield size={48} color="#1976d2" />
              <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 1 }}>
                {t('auth.register')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join the Smart Tourist Safety Network
              </Typography>
            </Box>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Formik
              initialValues={formData}
              validationSchema={getValidationSchema()}
              onSubmit={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              enableReinitialize
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                  {renderStepContent(activeStep, values, handleChange, handleBlur, errors, touched)}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={16} /> : null}
                    >
                      {activeStep === steps.length - 1 
                        ? (loading ? 'Registering...' : 'Register') 
                        : 'Next'
                      }
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>

            {activeStep === 0 && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link component={RouterLink} to="/login" variant="body2">
                  {t('auth.alreadyHaveAccount')} {t('auth.signIn')}
                </Link>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;