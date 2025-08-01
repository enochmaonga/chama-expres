import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import { SERVER_URL } from '@/config';

const backendUrl = process.env.NEXT_PUBLIC_API_URL; 

const CreatePassword = () => {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setStatus({ message: 'Passwords do not match.', type: 'error' });
    }

    try {
      const res = await fetch(`${backendUrl}/api/set-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Error');

      setStatus({ message: 'Password set successfully. You can now log in.', type: 'success' });
    } catch (err) {
      setStatus({ message: err.message, type: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{pt: 8}}>
      <Box sx={{mt: 8}}>
        <Typography variant="h5" gutterBottom>Create Your Password</Typography>
        {status.message && <Alert severity={status.type}>{status.message}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Set Password</Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePassword;
