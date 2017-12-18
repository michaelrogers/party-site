import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography,
  Button,
  Divider,
  // Paper,
  Grid
} from 'material-ui';

import CustomParticles from '../components/CustomParticles';

// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

export default class DetailsPage extends Component {
  render() {
    return (
      <div>
        <CustomParticles style={{height: '100%'}}/>
        <Grid container alignItems="center"  direction="column">
          <Grid item xs={10} sm={8} md={6} lg={4}>
            <Grid container justify="center" alignItems="stretch" direction="column">
              <Grid item>
                <Grid container alignItems="center" justify="center" className="particle-transition">
                  <Typography type="title" className="page-header">WHEN</Typography>
                  <Divider className="divider"/><br/>
                  <div className="details-wrapper" >
                    <br/>
                    <Typography type="body1" align="center" style={{width: '100%'}}>
                    After eight years of dating, Michael & Leigh will begin a new life together in January 2018 in a private ceremony with their families.
                    </Typography>
                    <br/>
                    <Typography type="body1" align="center" style={{width: '100%'}}>
                      Because you have shared in our lives 
                      by your friendship and love, we would like to invite you to share in the joy of our new marriage.
                    </Typography>
                    <br/> 
                    <Typography type="body1" align="center">
                      Join us for the celebration!<br />
                      Saturday, January 20, 2018.<br />
                      Seven to Midnight<br />
                    </Typography>
                  </div>
                  <br/>
                </Grid>
              </Grid>
              <br/>
              <br/>
              <br/>
              <br/>
              

              <Grid item>
                <Grid container className="particle-transition"  alignItems="center" justify="center" >
                  <div>  
                    <Typography type="title"  className="page-header" align="center">WHERE</Typography>
                  </div>
                  <Divider className="divider" />
                  <br />
                  <br />
                  <br />
                  <div className="details-wrapper">
                    <Typography type="body2" align="center">
                      Sharespace Warehouse - Preston<br />
                    </Typography>
                    <Typography type="body1" align="center">
                      2203 Preston Street<br />
                      Houston, Texas<br />
                    </Typography>
                    <br />
                    <Typography type="body1" align="center">Street parking is available and the parking lot to the right of Sharespace is a paid lot.</Typography>
                    <br/>
                    {/*<div style={{ textAlign: 'center' }}>
                      <a href="//www.sharespace.co/preston/" target="_blank" rel="noopener" >
                        <Button>About Sharespace</Button>
                      </a>
                    </div>*/}
                    <br/>
                  </div>
                  
                  <div style={{ textAlign: 'center', display: 'block', width: '100%' }}>
                    <iframe style={{ backgroundColor: 'darkgrey', width: '100%' }}
                      title="Sharespace Location"
                      // width="600"
                      height="250"
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCaa4FCPfuZF7lLmZyTz3Rz4n7tnl-4-N0&q=Sharespace+Warehouse,2203+Preston+Street,Houston+TX" allowFullScreen>
                    </iframe>
                  </div>
                </Grid>
              </Grid>
              <br />
              <br />
              <br/>
              <br/>
              
              <Grid item>
                <Grid container className="particle-transition"  alignItems="center" justify="center" >
                  <div>
                    <Typography align="center" type="title" className="page-header">How</Typography>
                    <br />
                  </div>
                  <br />
                  <br/>
                  <Divider className="divider" />
                  <div className="details-wrapper" >
                    <br/>
                    <Typography type="body1" align="center">Cocktail attire</Typography>
                    <br/>
                    <Typography type="body1" align="center">Libations, light fare, & Michael’s sweet dance moves will be served.</Typography>
                  </div>
                </Grid>
                <br />
                <br />
                <br />
                <div style={{textAlign: 'center'}}>
                  <Link to="/rsvp">
                    <Button className="button-details">RSVP</Button>
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}