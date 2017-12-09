import React, { Component } from 'react';
import { Typography, Button, Grid} from 'material-ui';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={24}>
        <Grid item xs={12} lg={6}>
          <Typography>Seems Like you are lost friend</Typography>
          <Link to="/">
            <Button>Fly Home!</Button>
          </Link>
        </Grid>
      </Grid>
    );
  }
}