import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography,
  Button,
  Divider,
  Paper,
  Grid
} from 'material-ui';


import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

export default class DetailsPage extends Component {
  render() {
    return (
      <Grid container alignItems="center" spacing={24} direction="column">
        <Grid item xs={12} lg={4}>
          <Grid container justify="center" alignItems="stretch" direction="column">
            <Grid item>
              <Grid container alignItems="center"   justify="center">
                <Typography type="headline">Details</Typography>
                <Typography type="body1" align="center">
                After eight years of dating, Michael & Leigh will begin a new life together in January 2018 in a private ceremony.
                </Typography>
                <br/>
                <Typography type="body1" align="center">
                Because you have shared in our lives 
                by your friendship and love, we would like to invite you to share in the joy of our new marriage.
                </Typography>
              </Grid>
            </Grid>
            <br/>
            <Grid item>
              <Typography type="title" align="center">When</Typography>
              <Divider />
              <br />
              <Typography type="body1" align="center">
                Join us for the celebration!<br />
                Saturday, January 20, 2018.<br />
                Seven to Midnight<br />
              </Typography>
            </Grid>
            <br />

            <Grid item>
              <Typography type="title" align="center">Where</Typography>
              <Divider />
              <br />
              <Typography type="body2" align="center">
                Sharespace Warehouse - Preston<br />
              </Typography>
              <Typography type="body1" align="center">
                2203 Preston Street<br />
                Houston, Texas<br />
              </Typography>
              <br />
              <Typography type="body1" align="center">Street parking is available and the parking lot to the right of Sharespace in a paid lot.</Typography>

              <div style={{ textAlign: 'center' }}>
                <a href="//www.sharespace.co/preston/" target="_blank" rel="noopener" >
                  <Button>About Sharespace</Button>
                </a>
                <br />
                <div style={{ textAlign: 'center' }}>
                  <iframe style={{ backgroundColor: 'darkgrey', width: '100%' }}
                    // width="600"
                    height="250"
                    src="https://maps.googleapis.com/maps/embed/v1/place?key=AIzaSyAQbuK2K8_Ii0RNadzmsAJZN5zaXqmyPHY&center=29.757656691602048,-95.34717518013304&zoom=16&maptype=roadmap&q=Sharespace+Warehouse,2203+Preston+Street,Houston+TX" >
                  </iframe>
                </div>
                <br />
              </div>
            </Grid>
            <br />

            <Grid>
              <Typography align="center" type="title">How</Typography>
              <Divider />
              <br />
              <Typography type="body1" align="center">Semi-formal attire</Typography>
              <br />
              <Typography type="body1" align="center">Libations, light fare, & Michael’s sweet dance moves will be served.</Typography>
            </Grid>
            <br />

          </Grid>
        </Grid>
      </Grid>
    );
  }
}