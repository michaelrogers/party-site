import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import logo from './logo.svg';
import './app.css';

import Grid from 'material-ui/Grid';
// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
// import Typography from 'material-ui/Typography';
// Components
import Home from './pages/Home';

import Music from './pages/Music';

class App extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Router>
              <div>
                <Route
                  path="/"
                  exact
                  render={
                    () => (
                  <Grid item xs={12} >
                    <Home/>
                  </Grid>
                  )}/>
                  <Route
                    path="/music"
                    exact
                    render={
                      () =>(
                      <Grid item>
                        <Music/>
                      </Grid>
                      )}
                  />
              </div>
            </Router>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
