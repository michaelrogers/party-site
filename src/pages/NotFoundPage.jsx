import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { Typography, Button } from 'material-ui';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <br/>
        <Grid item xs={12} lg={6}>
          <Typography>Seems Like you are lost friend</Typography>
          <Link to="/">
          <Button>
            Fly Home!
            </Button>
            </Link>
        </Grid>
      </div>
    );
  }
}