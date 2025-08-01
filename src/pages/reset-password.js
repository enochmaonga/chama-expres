import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import { SERVER_URL } from '@/config';

const backendUrl = process.env.NEXT_PUBLIC_API_URL; 

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus({ message: 'Passwords do not match', type: 'error' });
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to reset password');

      setStatus({ message: 'Password successfully reset!', type: 'success' });

      setTimeout(() => router.push('/login'), 3000); // Redirect after success
    } catch (err) {
      setStatus({ message: err.message, type: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 8 }}>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>Reset Password</Typography>
        {status.message && <Alert severity={status.type}>{status.message}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">Reset Password</Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
