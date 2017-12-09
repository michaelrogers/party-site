// @flow weak
import React, { Component } from 'react';

// import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import { Hidden } from 'material-ui';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    // marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 6,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navLinks: {
    paddingLeft: 10,
    paddingRight: 10
  }
});
// export default class ButtonAppBar extends Component {

function ButtonAppBar(props) {
  const { classes, toggleDrawer } = props;
  return(
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
            <MenuIcon onClick={() => toggleDrawer()} />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            <Link to="/">M + L</Link>
          </Typography>
          <Hidden mdDown>
            <Link className={classes.navLinks} to="/details">Details</Link>
            <Link className={classes.navLinks} to="/people">Party People</Link>
            <Link className={classes.navLinks} to="/gifts">Gifts</Link>
            <Link className={classes.navLinks} to="/rsvp">RSVP</Link>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);