import React from 'react';
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
  CircularProgress
} from '@mui/material';
import { Shield } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setError(null);
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Shield size={48} color="#1976d2" />
              <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 1 }}>
                {t('app.title')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('app.tagline')}
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    id="email"
                    name="email"
                    label={t('auth.email')}
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ mb: 3 }}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    id="password"
                    name="password"
                    label={t('auth.password')}
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ mb: 2 }}
                    startIcon={loading ? <CircularProgress size={16} /> : null}
                  >
                    {loading ? 'Signing in...' : t('auth.signIn')}
                  </Button>

                  <Box sx={{ textAlign: 'center' }}>
                    <Link component={RouterLink} to="/register" variant="body2">
                      {t('auth.dontHaveAccount')} {t('auth.createAccount')}
                    </Link>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;