import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Container, TextField, Button, Typography, Box, Alert, CircularProgress
} from '@mui/material';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // NEW

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res.ok && !res.error) {
      const session = await getSession(); // get the session

      const userType = session?.user?.userType; // assuming userType is set on session.user

      if (userType === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/contributions');
      }
    } else {
      setError('Invalid credentials');
    }
  };
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box width="100%">
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Box sx={{ mt: 2, position: 'relative' }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={loading} // Disable while loading
            >
              Login
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          <Box sx={{ mt: 2, position: 'relative' }}>
          <Typography variant="body2" sx={{ mt: 2 }}>
          <Link href="/forgot-password">Forgot your password?</Link>
        </Typography>
          </Box>
          
        </Box>
       
      </Box>
    </Container>
  );
};

export default LoginPage;
