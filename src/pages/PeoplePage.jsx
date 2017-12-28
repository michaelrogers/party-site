import React, { Component } from 'react';
import { Grid, Typography, Divider } from 'material-ui';

import PartyPeople from '../components/PartyPeople';
import CustomParticles from '../components/CustomParticles';
// import Partymaids from '../components/Partymaids';

export default class PeoplePage extends Component {
  render() {
    return (
      <Grid container justify="center" >
        <CustomParticles />
        <Grid item xs={10} lg={8}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={10}>
              <div className="particle-transition">
                <Typography type="title" className="page-header" align="center">PARTYMAIDS &amp; PARTYMEN</Typography>
              </div>
            </Grid>
            <Grid item xs={10} lg={10} xl={10}>
              <Divider className="divider"/>
              <br/>
              <div className="particle-transition">
                <PartyPeople/>
              </div>
              <br/>
              <Divider className="divider"/>
            </Grid>


            <Grid item xs={10} lg={8} >
              <br />
              <div className="particle-transition">
              <Typography align="center">
              Our party people are special indeed. We truly are humbled by the show of love and support that we have received from family and friends not only as we start a new life together, but also over the last eight years. Each of our party people have helped with various aspects of this party and it would not have been nearly as beautiful nor as fun without your help. 
              </Typography>
              <br/>
              <Typography align="center">
              With sincere thanks,
              </Typography>
              <Typography align="center">
              Michael & Leigh
              </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}