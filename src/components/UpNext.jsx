import React, { Component } from 'react';
// import axios from 'axios';
// import Button from 'material-ui/Button';
// import Grid from 'material-ui/Grid';
import Card, { 
  // CardActions,
  CardContent,
  // CardMedia
} from 'material-ui/Card';

import Typography from 'material-ui/Typography';
import SongChoice from './SongChoice';
// const publicUrl = process.env.PUBLIC_URL || 'http://localhost';
export default class UpNext extends Component {
  constructor(props) {
    super(props);
    this.voteForSong = this.voteForSong.bind(this);
  }

  voteForSong(trackuri) {
    this.props.socket.emit('song:vote', trackuri);
  }


  populateSongChoices() {
    if(this.props.songChoices) {
      const songChoices = this.props.songChoices || [];
      return songChoices.map((choice, i) => {
        return (
          <div key={i} onClick={this.voteForSong.bind(this, choice.uri)}>
            <SongChoice song={choice} totalVotes={this.props.totalVotes} />
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography component="h2" align="center">
              Control the vibes
            </Typography>
            
          </CardContent>
        </Card>
        <br/>
        <div>
          {this.populateSongChoices()}
        </div>
      </div>
    );
  }
}