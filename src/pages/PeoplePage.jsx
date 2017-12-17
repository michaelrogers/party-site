import React, { Component } from 'react';
import { Grid, Typography, Divider } from 'material-ui';

import PartyPeople from '../components/PartyPeople';
// import Partymaids from '../components/Partymaids';

export default class PeoplePage extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={24}>
        <Grid item xs={10} lg={6}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={10}>
              <Typography type="title" className="page-header" align="center">PARTYMAIDS &amp; PARTYMEN</Typography>
            </Grid>
            <Grid item xs={10}>
              <Divider className="divider"/>
              <br/>
              <PartyPeople/>
              <br/>
              <Divider className="divider"/>
            </Grid>


            <Grid item xs={10} lg={8} >
              <br />
              <Typography align="center">
              Our party people are special indeed. We truly are humbled by the show of love and support that we have received from family and friends not only as we start a new life together, but also over the last eight years. Each of our party people have helped with various aspects of this party and it would not have been nearly as beautiful or fun without your help. 
              </Typography>
              <br/>
              <Typography align="center">
              With sincere thanks,
              </Typography>
              <Typography align="center">
              Michael & Leigh
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}