import React, { Component } from 'react';
import { 
  Typography,
  Button,
  Grid,
  Divider
} from 'material-ui';

export default class GiftsPage extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={24}>
        <Grid item xs={12} lg={4}>
          <Typography type="title" className="page-header" align="center">Registry</Typography>  
          <br/>
          <Divider className="divider"/>
          <br/>
          <br/>
          <Typography type="body1" align="center">
            Your love, laughter, and company at the <br/> celebration of our marriage is the greatest gift <br/> of all. However, if you desire to give <br/> nonetheless, our registry can be found at <br/><a href="https://www.blueprintregistry.com/registry/LeighandMichael01.13.18" target="_blank" rel="noopener" >Blueprint Registry</a>. 
          </Typography>
          <br/>
          <Typography type="body1" align="center">
          With love and gratitude,<br/>
          Michael &amp; Leigh
          </Typography>
          <br/>
          <br/>
          <Divider className="divider"/>

          <br/>
          <div style={{textAlign: 'center'}}>
            <Button target="_blank" href="https://www.blueprintregistry.com/registry/LeighandMichael01.13.18">Visit the registry</Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}