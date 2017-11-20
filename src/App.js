import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import logo from './logo.svg';
import './app.css';

import Grid from 'material-ui/Grid';
// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
// import Typography from 'material-ui/Typography';
// Components
import HomePage from './pages/HomePage';

import MusicPage from './pages/MusicPage';

import AppBar from './layout/AppBar';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar/>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Router>
              <div>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <HomePage/>
                  )}/>
                <Route
                  path="/music"
                  exact
                  render={() =>(
                    <MusicPage/>
                  )}/>
              </div>
            </Router>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
