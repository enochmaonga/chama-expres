// pages/_app.js or _app.tsx
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import Box from '@mui/material/Box';
import TopAppBar from '@/components/home/Topbar';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  const isLoginPage = router.pathname === '/login';

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!isLoginPage && <TopAppBar />}
        <Box component="main" sx={{ mt: !isLoginPage ? 8 : 0 }}>
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
