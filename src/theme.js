import { createTheme } from '@mui/material/styles';
import { blueGrey, lightBlue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[800]
    },
    secondary: {
      main: lightBlue[800],
    },
    neutral: {
      main: '#fff',
      contrastText: '#000',
    },

  },
  typography: {
    button: {
      textTransform: 'none',
    }
  }
});
export default theme