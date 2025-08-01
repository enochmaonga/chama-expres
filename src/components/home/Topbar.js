'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Avatar, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const TopAppBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: '/' }); // ✅ This ensures a clean redirect
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        border: 1,
        height: '120px',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Toolbar>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'red', mr: 4 }}>
          ChamaXpress
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Button component={Link} href="/" sx={{ color: 'black', fontWeight: '500' }}>
            Home
          </Button>
          <Button component={Link} href="/contributions" sx={{ color: 'black', fontWeight: '500' }}>
            Contributions
          </Button>

          {session && session.user?.userType === 'admin' && (
            <Button component={Link} href="/dashboard" sx={{ color: 'black', fontWeight: '500' }}>
              Dashboard
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {loading ? (
            <CircularProgress size={24} />
          ) : session ? (
            <>
              <Avatar src={session.user?.image || '/default-avatar.png'} />
              <Button onClick={handleLogout} sx={{ color: 'black', fontWeight: '500' }}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button component={Link} href="/login" sx={{ color: 'black', fontWeight: '500' }}>
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
