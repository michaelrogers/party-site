import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom';

const options = {
  palette: {
    type: 'dark'
  }
}

const theme = createMuiTheme(options);

const ThemedApp = () => (
  <MuiThemeProvider theme={theme}>
    <App/>
  </MuiThemeProvider>
);



ReactDOM.render((
  <BrowserRouter>
    <ThemedApp />
  </BrowserRouter>), document.getElementById(':{'));
registerServiceWorker();
