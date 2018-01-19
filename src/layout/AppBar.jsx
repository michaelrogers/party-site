// @flow weak
import React from 'react';

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
const showMusic = process.env.showMusic || false;

const styles = theme => ({
  root: {
    // marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 14,
    width: '100%',
  },
  '@media (max-width: 600px)': {
    root: {
      marginBottom: theme.spacing.unit * 4,
    }
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },

  navButton: {
    height: 62,
    fontFamily: 'Raleway, sans-serif',
    textTransform: 'initial'
  }
});
// export default class ButtonAppBar extends Component {

function showMusicLink(classes) {
  if (showMusic) {
    return (
      <Link className="navbar-link" to="/music">
        <Button className={classes.navButton}>Music</Button>
      </Link>
    );
  }
}


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
          <Hidden smDown>
            <Link className="navbar-link" to="/details">
              <Button className={classes.navButton}>Details</Button>
            </Link>
            <Link className="navbar-link" to="/people">
              <Button className={classes.navButton}>Party People</Button>
            </Link>
            <Link className="navbar-link" to="/registry">
              <Button className={classes.navButton}>Registry</Button>
            </Link>
            <Link className="navbar-link" to="/rsvp">
              <Button className={classes.navButton}>RSVP</Button>
            </Link>
            {showMusicLink(classes)}
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