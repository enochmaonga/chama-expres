import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Container, TextField, Button, Typography, Box, Alert
} from '@mui/material';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (res.ok && !res.error) {
  router.push('/'); // or whatever route
} else {
  setError('Invalid credentials');
}

  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4" align="center">Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField fullWidth margin="normal" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" onClick={handleLogin}>Login</Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
