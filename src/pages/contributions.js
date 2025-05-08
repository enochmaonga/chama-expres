// pages/index.js or app/page.jsx (depending on structure)
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import MemberCont from '@/components/contribute/Contributions';
function Contributions() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MemberCont />
    </ThemeProvider>
  );
}

export default Contributions;