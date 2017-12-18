import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { BrowserRouter, withRouter } from 'react-router-dom';
// import { withRouter } from 'react-router';

const options = {
  palette: {
    type: 'dark'
  }
};

const theme = createMuiTheme(options);

const AppWithRouter = withRouter(App);

const ThemedApp = () => (
  <MuiThemeProvider theme={theme}>
    <AppWithRouter />
  </MuiThemeProvider>
);



ReactDOM.render((
  <BrowserRouter>
    <ThemedApp />
  </BrowserRouter>),
document.getElementById(':{')
);

registerServiceWorker();
