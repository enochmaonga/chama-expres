import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import { SERVER_URL } from '@/config';

const backendUrl = process.env.NEXT_PUBLIC_API_URL; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendUrl}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Something went wrong');

      setStatus({ message: 'Check your email for a reset link.', type: 'success' });
    } catch (err) {
      setStatus({ message: err.message, type: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 8 }}>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>Forgot Password</Typography>
        {status.message && <Alert severity={status.type}>{status.message}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Send Reset Link</Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
