import React, { Component } from 'react';
import { 
  Typography,
  Button,
  Grid,
  Divider
} from 'material-ui';
import CustomParticles from '../components/CustomParticles';

export default class GiftsPage extends Component {
  render() {
    return (
      <Grid container justify="center">
        <CustomParticles/>
        <Grid item xs={10} lg={4}>
          
          <Typography type="title" className="page-header" align="center">Registry</Typography>  
          <br/>
          <Divider className="divider"/>
          <br/>
          <br/>
          <div className="registry-wrapper particle-transition">
            <Typography type="body1" align="center">
            Please do not feel a gift is necessary. Your love, laughter, and company at the celebration of our marriage is the greatest gift of all. However, if you desire to give nonetheless, our registry can be found at <br/><a href="https://www.blueprintregistry.com/registry/LeighandMichael01.13.18" target="_blank" rel="noopener" >Blueprint Registry</a>. 
            </Typography>
            <br/>
            <Typography type="body1" align="center">
            With love and gratitude,<br/>
            Michael &amp; Leigh
            </Typography>
          </div>
          <br/>
          <br/>
          <Divider className="divider"/>
          <br/>

          <br/>
          <div style={{textAlign: 'center'}}>
            <Button target="_blank" rel="noopener" className="button-details" href="https://www.blueprintregistry.com/registry/LeighandMichael01.13.18">Visit the registry</Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}