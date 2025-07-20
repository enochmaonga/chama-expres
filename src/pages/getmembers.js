// pages/index.js or app/page.jsx (depending on structure)
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import YouthDatabase from '@/components/contribute/GetYouth';
function Youth1() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <YouthDatabase />
    </ThemeProvider>
  );
}

export default Youth1;