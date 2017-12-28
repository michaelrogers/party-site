import React, { Component } from 'react';
import axios from 'axios';
// import Button from 'material-ui/Button';
// import Grid from 'material-ui/Grid';
import Card, { 
  // CardActions,
  CardContent,
  // CardMedia
} from 'material-ui/Card';

import Typography from 'material-ui/Typography';
import SongChoice from './SongChoice';
const publicUrl = process.env.PUBLIC_URL || 'http://localhost';
export default class UpNext extends Component {
  constructor(props) {
    super(props);
    // this.addToQueue = this.addToQueue.bind(this);
    this.voteForSong = this.voteForSong.bind(this);
  }

  addToQueue(trackuri) {
    const url = publicUrl + '/spotify/queue/' + trackuri;
    console.log('addToQueue', trackuri, url);
    axios.post(url).then(response => {

    });
  }
  voteForSong(trackuri) {
    console.log('voteforsong');
  }


  populateSongChoices() {
    if(this.props.songChoices) {
      const songChoices = this.props.songChoices || [];
      return songChoices.map((choice, i) => {
        return (
          <SongChoice key={i}  song={choice} onClick={this.voteForSong} 
          />
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Card>
          {/* <CardMedia
            image={this.state.current.imagery}
            title={this.state.current.album}
          /> */}
          <CardContent>
            <Typography component="h2">
              Vote for whats up next
            </Typography>
            
          </CardContent>
          {/* <CardActions>
            <Button dense color="primary">Share</Button>
            <Button dense color="primary">Learn More</Button>
          </CardActions> */}
        </Card>
        <br/>
        <div>
          {this.populateSongChoices()}
        </div>
      </div>
    );
  }
}