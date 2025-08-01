import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  MenuItem, // ✅ Import here
} from '@mui/material';
import { SERVER_URL } from '@/config';

const CreateMember = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userType: 'user', // default value
  });


  const [status, setStatus] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading
    console.log("Submitting:", formData);
    try {
      const response = await fetch(`${SERVER_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unknown error');

      setStatus({ message: 'Member created successfully.', type: 'success' });
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        // password: ''
      });
    } catch (error) {
      setStatus({ message: error.message || 'Something went wrong', type: 'error' });
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <Container maxWidth="md" >
      <Box mt={20}>
        <Typography variant="h4" gutterBottom >
          Create New Member
        </Typography>

        {status.message && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Middle Name"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            type="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="User Type"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            margin="normal"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>


          <Box sx={{ mt: 2, position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading} // ✅ Disable while loading
            >
              Submit
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: 'primary.main',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreateMember;
