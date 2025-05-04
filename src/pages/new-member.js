// pages/index.js or app/page.jsx (depending on structure)
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import CreateMember from '@/components/home/CreateMember';

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CreateMember />
    </ThemeProvider>
  );
}
