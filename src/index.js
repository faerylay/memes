import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import store from './redux/store';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles'
import theme from './theme';

ReactDOM.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </>,
  document.getElementById('root')
);

