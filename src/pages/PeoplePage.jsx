import React, { Component } from 'react';
import { Grid, Typography } from 'material-ui';

export default class PeoplePage extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <Typography>
        Our party people are special indeed. We truly are humbled by the show of love and support that we have received from family and friends not only as we start a new life together, but also over the last eight years. Each of our party people have helped with various aspects of this party and it would not have been nearly as beautiful or fun without your help. 
        </Typography>
        <br/>
        <Typography>
        With sincere thanks,
        </Typography>
        <Typography>
        Michael & Leigh
        </Typography>
      </Grid>
    );
  }
}