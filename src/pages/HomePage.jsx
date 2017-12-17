import React, { Component } from 'react';
import { 
  Typography,
  Button,
  Grid
} from 'material-ui';
import { Link } from 'react-router-dom';

import backgroundImage from '../assets/cover.jpg';

const styles = {
  backgroundImage: {
    backgroundColor: 'rgb(235, 239, 240)',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '100vh',
    zIndex: -1
  },
  titleText: {
    color: 'rgb(78, 202, 189)',
    fontWeight: 600,
    textShadow: '1px 2px 2px rgba(43, 109, 101, 0.3)'
  },
  titleBlock: {
    // textAlign: 'center', position: 'absolute', top: '15%', left: 0, right: 0
  }
};


export default class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="cover"  style={styles.backgroundImage}></div>
        <Grid container justify="center" alignItems="center" spacing={24} >
          <Grid item xs={12} lg={8}>
            <div style={styles.titleBlock} className="title-block">
              <Typography style={{fontSize: '30px', ...styles.titleText}}>
                MICHAEL &amp; LEIGH
              </Typography>
              <Typography style={{fontSize: '46px', ...styles.titleText}}>
                INVITE YOU
              </Typography>
              <Typography style={{fontSize: '27px', ...styles.titleText}}>
                TO THEIR WEDDING
              </Typography>
              <Typography style={{fontSize: '38px', ...styles.titleText}}>
                CELEBRATION
              </Typography>
              <Typography style={{fontSize: '29.5px', ...styles.titleText}}>
                JANUARY 20, 2018
              </Typography>
              <br/>
              <br/>
              <Link to="/details">
                <Button className="button-details">Details</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}