import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          position: 'relative',
          minHeight: '100vh',
          margin: 0,
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("/images/chama-save.png")', // update path as needed
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1, // adjust this value for desired transparency
            zIndex: -1,
          },
        },
      },
    },
  },
});

export default theme;
