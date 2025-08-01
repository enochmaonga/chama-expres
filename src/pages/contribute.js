// pages/index.js or app/page.jsx (depending on structure)
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import CashCollectionForm from '@/components/home/Contribute';

export default function HomePage(pageProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CashCollectionForm {...pageProps}/>
    </ThemeProvider>
  );
}