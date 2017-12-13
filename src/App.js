import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

// import logo from './logo.svg';
import './styles/index.css';

// import Grid from 'material-ui/Grid';
import HomePage from './pages/HomePage';

// =====Pages=======================
import DetailsPage from './pages/DetailsPage';
import MusicPage from './pages/MusicPage';
import RegistryPage from './pages/RegistryPage';
import PeoplePage from './pages/PeoplePage';
import RSVPPage from './pages/RSVPPage';
import NotFoundPage from './pages/NotFoundPage';
// =====Components==================
import AppBar from './layout/AppBar';
import Drawer from './layout/Drawer';

export default class App extends Component {
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
        <main>
        {/*
        <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        */}
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
              path="/registry"
              component={RegistryPage}
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
            {/* </CSSTransitionGroup> */}
        </main>
      </div>
    );
  }
}
