// pages/index.js (or app/page.jsx)
import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import DashboardComponent from '@/components/dashboard/DashboardComponent';

function Dashboard() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) {
    // You can show a loading spinner here while session is loading
    return <div>Loading...</div>;
  }

  if (!session) {
    // Not signed in - redirect to login page
    signIn(); // this will redirect to your /login page (because of your NextAuth config)
    return null; // or a placeholder
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardComponent />
    </ThemeProvider>
  );
}

export default Dashboard;
