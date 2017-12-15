import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { 
  Typography,
  Button,
  Divider,
  // Paper,
  Grid
} from 'material-ui';


// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

export default class DetailsPage extends Component {
  render() {
    return (
      <Grid container alignItems="center" spacing={24} direction="column">
        <Grid item xs={12} lg={4}>
          <Grid container justify="center" alignItems="stretch" direction="column">
            <Grid item>
              <Grid container alignItems="center"   justify="center">
                <Typography type="title" className="page-header">WHEN</Typography>
                <Divider className="divider"/><br/>
                <div style={{width: '100%'}}>
                  <Typography type="body1" align="center" style={{width: '100%'}}>
                  After eight years of dating, Michael & Leigh <br/>will begin a new life together in January 2018<br/> in a private ceremony.
                  </Typography>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Typography type="body1" align="center">
                  Join us for the celebration!<br />
                  Saturday, January 20, 2018.<br />
                  Seven to Midnight<br />
                </Typography>
              </Grid>
            </Grid>
            <br/>
            <br />
            <br/>

            <Grid item>
              <Typography type="title"  className="page-header" align="center">WHERE</Typography>
              <br/>
              <Divider className="divider" />
              <br />
              <Typography type="body2" align="center">
                Sharespace Warehouse - Preston<br />
              </Typography>
              <Typography type="body1" align="center">
                2203 Preston Street<br />
                Houston, Texas<br />
              </Typography>
              <br />
              <Typography type="body1" align="center">Street parking is available and the parking lot <br/> to the right of Sharespace in a paid lot.</Typography>
              <br/>
              <div style={{ textAlign: 'center' }}>
                <a href="//www.sharespace.co/preston/" target="_blank" rel="noopener" >
                  <Button>About Sharespace</Button>
                </a>
              </div>
              <br/>
              <br/>
              <br/>
              <div style={{ textAlign: 'center' }}>
                <iframe style={{ backgroundColor: 'darkgrey', width: '100%' }}
                  // width="600"
                  height="250"
                  src="https://maps.googleapis.com/maps/embed/v1/place?key=AIzaSyAQbuK2K8_Ii0RNadzmsAJZN5zaXqmyPHY&center=29.757656691602048,-95.34717518013304&zoom=16&maptype=roadmap&q=Sharespace+Warehouse,2203+Preston+Street,Houston+TX" >
                </iframe>
              </div>
            </Grid>
            <br />
            <br />
            <br/>

            <Grid>
              <Typography align="center" type="title" className="page-header">How</Typography>
              <br />
              <Divider className="divider" />
              <br />
              <Typography type="body1" align="center">Cocktail attire</Typography>
              <br />
              <Typography type="body1" align="center">Libations, light fare, & Michael’s sweet dance <br/> moves will be served.</Typography>
            </Grid>
            <br />

          </Grid>
        </Grid>
      </Grid>
    );
  }
}