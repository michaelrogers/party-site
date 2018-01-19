import React, { Component } from 'react';
import Card, {
  // CardContent 
} from 'material-ui/Card';
import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';
import SongChoice from './SongChoice';
// const publicUrl = process.env.PUBLIC_URL || 'http://localhost';

const styles = {
  voteButton: {
    padding: 0,
    margin: 0,
    marginBottom: 10,
    width: '100%'

  },
  actionHeader: {
    fontSize:'1.4em',
    padding: '1em'
  }
};

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
          <Button color="accent" disableRipple={!acceptingVotes} fullwidth={'true'} key={i} onClick={this.voteForSong.bind(this, choice.uri)} 
            style={{...styles.voteButton, ...this.computeChoiceStyle(choice.votes, maxVotes, acceptingVotes)}}
          >
            <SongChoice song={choice} totalVotes={this.props.totalVotes} />
          </Button>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Card>
          <Typography component="h2" align="center" style={styles.actionHeader}>
            Tap to control the vibes
          </Typography>
          
        </Card>
        <br/>
        <div>
          {this.populateSongChoices(this.props.acceptingVotes)}
        </div>
      </div>
    );
  }
}