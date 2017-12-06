import React, { Component } from 'react';
import { Typography, Button } from 'material-ui';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';


// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

export default class DetailsPage extends Component {
  render() {
    return (
      <div>
        <Typography type="headline">Details</Typography>
        <Paper>
          <Typography type="title">When</Typography>
          <div>January 20th, 2018 @ 6:00pm</div>
        </Paper>
        <Paper>
          <Typography type="title">Where</Typography>
          <div>Sharespace HTX - Preston</div>
          <div>Google maps shiz here</div>
        </Paper>
        <Paper>
          <Typography type="title">How</Typography>
          <div>Parking stuff here?</div>
        </Paper>
      </div>
    );
  }
}