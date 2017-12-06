import React, { Component } from 'react';
// import Typography from 'material-ui/Typography';
import { Typography, Button } from 'material-ui';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <main>
        <img style={{width: '1024px'}} className="img-responsive" src="/images/invitation.jpg"/>
        {/*
        <Typography>
          Michael &amp; Leigh
        </Typography>
        <Typography>
          Wedding Celebration
        </Typography>
        */}
        <br/>
        <Link to="/details">
          <Button>Details</Button>
        </Link>
      </main>
    );
  }
}