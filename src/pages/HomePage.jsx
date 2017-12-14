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
      <main>
        <div class="cover"  style={{backgroundImage: 'url("/images/Party%20Website%20Cover.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'absolute', top: '0', width: '100%', height: '100vh', zIndex: -1}}></div>
        <Grid container justify="center" alignItems="center" spacing={24} >
          <Grid item xs={12} lg={8}>
            <div style={{textAlign: 'center', position: 'absolute', top: '50%', color: 'black'}}>
              <Typography style={{fontSize: '30px'}}>MICHAEL &amp; LEIGH</Typography>
              <Typography style={{fontSize: '30px'}}>INVITE YOU</Typography>
              <Typography style={{fontSize: '30px'}}>TO THEIR WEDDING</Typography>
              <Typography style={{fontSize: '30px'}}>CELEBRATION</Typography>
              <Typography style={{fontSize: '30px'}}>JANUARY 20, 2018</Typography>
              <br/>
              <Link to="/details">
                <Button>Details</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </main>
    );
  }
}