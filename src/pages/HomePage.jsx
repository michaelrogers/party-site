import React, { Component } from 'react';
import { 
  Typography,
  Button,
  Grid
} from 'material-ui';
import { Link } from 'react-router-dom';

const styles = {
  backgroundImage: {
    backgroundColor: 'rgb(235, 239, 240)',
    backgroundImage: 'url("/images/Party%20Website%20Cover.jpg")',
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
    fontWeight: 600
  }
};


export default class HomePage extends Component {
  render() {
    return (
      <main>
        <div className="cover"  style={styles.backgroundImage}></div>
        <Grid container justify="center" alignItems="center" spacing={24} >
          <Grid item xs={12} lg={8}>
            <div style={{textAlign: 'center', position: 'absolute', top: '15%', left: 0, right: 0, color: 'black'}}>
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
              <Link to="/details">
                <Button className="button-details">Details</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </main>
    );
  }
}