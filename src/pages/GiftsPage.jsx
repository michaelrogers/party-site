import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { Typography, Button } from 'material-ui';

export default class GiftsPage extends Component {
  render() {
    return (
      <Grid item xs={12} lg={6}>
        <Typography type="title">
          Gifts
        </Typography>  
        <Typography type="body1">
        Your love, laughter, and company at the celebration of our marriage is the greatest gift of all. However, if you desire to give nonetheless, our registry can be found at <a href="https://www.blueprintregistry.com/registry/LeighandMichael01.13.18" target="_blank" rel="noopener" >Blueprint Registry</a>. 
          <br/><br/>
        With love and gratitude,<br/>
        Michael &amp; Leigh
        </Typography>
        <br/>
        <Button href="https://www.blueprintregistry.com/registry/LeighandMichael01.13.18">Visit the registry</Button>


      </Grid>
    );
  }
}