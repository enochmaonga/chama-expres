// pages/index.js or app/page.jsx (depending on structure)
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import DashboardComponent from '@/components/dashboard/DashboardComponent';
function Contributions() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardComponent />
    </ThemeProvider>
  );
}

export default Contributions;