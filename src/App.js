import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';

// import logo from './logo.svg';
import './styles/app.css';
import Grid from 'material-ui/Grid';

// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import MusicPage from './pages/MusicPage';
import GiftsPage from './pages/GiftsPage';
import PeoplePage from './pages/PeoplePage';
import RSVPPage from './pages/RSVPPage';
import NotFoundPage from './pages/NotFoundPage';


// import MusicPage from './pages/MusicPage';
// import NotFoundPage from './pages/NotFoundPage';
import AppBar from './layout/AppBar';
import Drawer from './layout/Drawer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  toggleDrawer() {
    this.setState({drawer: Boolean(!this.state.drawer)});
  }

  render() {
    return (
      <div>
        <Drawer
          drawer={this.state.drawer}
          toggleDrawer={this.toggleDrawer}
        />
        <AppBar
          toggleDrawer={this.toggleDrawer}
          Link={Link}
        />
        <Grid container spacing={24}>
          <Grid item>
            <Switch>
              <Route
                path="/"
                exact
                component={HomePage}
              />
              <Route
                path="/music"
                component={MusicPage}
              />
              <Route
                path="/details"
                component={DetailsPage}
              />
              <Route
                path="/people"
                component={PeoplePage}
              />
              <Route
                path="/gifts"
                component={GiftsPage}
              />
              <Route
                path="/rsvp"
                component={RSVPPage}
              />
              <Route 
                path="*"
                component={NotFoundPage} 
              />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
