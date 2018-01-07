import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui/Card';

import Typography from 'material-ui/Typography';
import SongChoice from './SongChoice';
// const publicUrl = process.env.PUBLIC_URL || 'http://localhost';

export default class UpNext extends Component {
  constructor(props) {
    super(props);
    this.voteForSong = this.voteForSong.bind(this);
  }

  voteForSong(trackuri) {
    if (this.props.acceptingVotes) {
      this.props.socket.emit('song:vote', trackuri);
    } else {
      console.log('Nope vote');
    }
  }
  computeChoiceStyle(votes, maxVotes, acceptingVotes) {
    const greyedOutStyle = {
      filter: 'grayscale(.8)',
      opacity: 0.7,
      transition: 'opacity 0.5s, filter 0.5s'
    };
    return (!acceptingVotes && votes !== maxVotes) ? greyedOutStyle : {};
  }


  populateSongChoices(acceptingVotes) {
    if(this.props.songChoices) {
      const songChoices = this.props.songChoices || [];
      const maxVotes = songChoices.reduce((acc, song) => Math.max(acc, song.votes), 0);
      return songChoices.map((choice, i) => {
        return (
          <div key={i} onClick={this.voteForSong.bind(this, choice.uri)} 
            style={this.computeChoiceStyle(choice.votes, maxVotes, acceptingVotes)}
          >
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
          {this.populateSongChoices(this.props.acceptingVotes)}
        </div>
      </div>
    );
  }
}