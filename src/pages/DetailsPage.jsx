import React, { Component } from 'react';
import { Typography, Button, Divider } from 'material-ui';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';


import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

export default class DetailsPage extends Component {
  render() {
    return (
      <Grid item style={{margin: '0 auto', display: 'block', textAlign: 'center'}}>
        <Typography type="headline">Details</Typography>
        <br/>
        <Divider/>

        <Typography type="title">When</Typography>
          <Typography type="body1" align="center">
          After eight years of dating, Michael & Leigh will begin a new life together in January 2018 in a private ceremony.
          <br/><br/>
          Because you have shared in our lives 
          by your friendship and love, we would like to invite you to share in the joy of our new marriage.
          <br/><br/>
          Join us for the celebration!
          Saturday, January 20, 2018.
          Seven to Midnight
          
          </Typography>
          <Divider/>
          
        <br/>
        <Divider/>
        
        <Typography type="title">Where</Typography>
          <Typography type="body1" align="center">
            Sharespace Warehouse<br/>
            <br/>
            2203 Preston Street<br/>
            Houston, Texas<br/>
            <br/>
            Street parking is available and the parking lot to the right of Sharespace is a paid lot. 
          </Typography>
          <br/>
          <iframe
          width="600"
          height="250"
          frameborder="0" 
          src="https://maps.googleapis.com/maps/embed/v1/place?key=AIzaSyAQbuK2K8_Ii0RNadzmsAJZN5zaXqmyPHY&center=29.757656691602048,-95.34717518013304&zoom=16&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x1d2c4d&style=element:labels.text.fill%7Ccolor:0x8ec3b9&style=element:labels.text.stroke%7Ccolor:0x1a3646&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x023e58&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Celement:geometry%7Ccolor:0x304a7d&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Celement:geometry%7Ccolor:0x2c6675&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x255763&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xb0d5ce&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x023e58&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=480x360&q=Sharespace+Warehouse,2203+Preston+Street,Houston+TX" >
        </iframe>

 
        <Divider/>
        
        <br/>
        
        <Typography type="title">How</Typography>
        <Typography type="body1" align="center">
        Semi-formal attire
        <br/><br/>
        Libations, light fare, & Michael’s sweet dance moves will be served.
        </Typography>

        
      </Grid>
    );
  }
}