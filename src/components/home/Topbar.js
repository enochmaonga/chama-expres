'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useSession } from 'next-auth/react'; // Optional if using next-auth

const TopAppBar = () => {
  const { data: session } = useSession(); // Replace with your auth method if not using next-auth
  const user = session?.user || { name: 'User', image: '/default-avatar.png' }; // Fallback

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'primary.main' }}>
  <Toolbar>
    {/* Logo on the left */}
    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
      ChamaXpress
    </Typography>

    {/* Avatar on the right */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton sx={{ p: 0 }}>
        <Avatar alt={user.name} src={user.image} />
      </IconButton>
    </Box>
  </Toolbar>
</AppBar>

  );
};

export default TopAppBar;
