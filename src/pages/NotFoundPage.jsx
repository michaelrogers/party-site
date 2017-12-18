import React, { Component } from 'react';
import { 
  Typography,
  Button,
  Grid
} from 'material-ui';
import { Link } from 'react-router-dom';
import CustomParticles from '../components/CustomParticles';

export default class NotFoundPage extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={24}>
        <CustomParticles/>
        <Grid item xs={12} lg={6}>
          <Typography>Seems Like you are lost friend</Typography>
          <Link to="/">
            <Button>Fly Home!</Button>
          </Link>
        </Grid>
      </Grid>
    );
  }
}