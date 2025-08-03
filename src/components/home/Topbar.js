'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  Button,
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const TopAppBar = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  // For menu dropdown:
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Contributions', href: '/contributions' },
    ...(session?.user?.userType === 'admin' ? [{ label: 'Dashboard', href: '/dashboard' }] : []),
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          borderBottom: 1,
          borderColor: 'divider',
          height: 'auto',
          px: 2,
          py: 1,
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: isMobile ? 1 : 0,
          }}
        >
          {/* Logo & mobile menu */}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'red' }}>
              ChamaXpress
            </Typography>

            {isMobile && (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  {navLinks.map((link) => (
                    <MenuItem
                      key={link.label}
                      component={Link}
                      href={link.href}
                      onClick={handleMenuClose}
                    >
                      {link.label}
                    </MenuItem>
                  ))}

                  <MenuItem>
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : session ? (
                      <Button
                        onClick={() => {
                          handleMenuClose();
                          handleLogout();
                        }}
                        sx={{ textTransform: 'none' }}
                      >
                        Sign Out
                      </Button>
                    ) : (
                      <Button
                        component={Link}
                        href="/login"
                        onClick={handleMenuClose}
                        sx={{ textTransform: 'none' }}
                      >
                        Sign In
                      </Button>
                    )}
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{ color: 'black', fontWeight: 500, textTransform: 'none' }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Auth */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {loading ? (
                <CircularProgress size={24} />
              ) : session ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    src={session.user?.image || '/default-avatar.png'}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Button
                    onClick={handleLogout}
                    sx={{ color: 'black', fontWeight: 500, textTransform: 'none' }}
                  >
                    Sign Out
                  </Button>
                </Box>
              ) : (
                <Button
                  component={Link}
                  href="/login"
                  sx={{ color: 'black', fontWeight: 500, textTransform: 'none' }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopAppBar;
