import React, { Component } from 'react';
import { 
  Typography,
  Button,
  Grid
} from 'material-ui';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <Grid container justify="center" alignItems="center" spacing={24}>
        <Grid item xs={12} lg={8}>
          <img style={{width: '1024px'}} className="img-responsive" src="/images/invitation.jpg"/>
          <div style={{textAlign: 'center'}}>
            <Typography>Michael &amp; Leigh</Typography>
            <Typography>Wedding Celebration</Typography>
            <br/>
            <Link to="/details">
              <Button>Details</Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    );
  }
}