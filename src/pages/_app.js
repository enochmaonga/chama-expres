// pages/_app.js
import { useRouter } from 'next/router';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import Box from '@mui/material/Box';
import TopAppBar from '@/components/home/Topbar';
import { useEffect, useRef } from 'react';

const INACTIVITY_LIMIT = 20 * 60 * 1000; // 20 minutes in milliseconds

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!isLoginPage && <TopAppBar />}
        <Box component="main" sx={{ mt: !isLoginPage ? 8 : 0 }}>
          <InactivityHandler>
            <Component {...pageProps} />
          </InactivityHandler>
        </Box>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;


const InactivityHandler = ({ children }) => {
  const { data: session } = useSession();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!session) return;

    const resetTimer = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        console.log('User inactive for 20 minutes. Signing out...');
        signOut({ callbackUrl: '/' });
      }, 10 * 60 * 1000); // 20 minutes
    };

    const activityEvents = ['mousemove', 'keydown', 'scroll', 'click'];

    activityEvents.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // Start the timer when session starts

    return () => {
      activityEvents.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
      clearTimeout(timeoutRef.current);
    };
  }, [session]);

  return children;
};
