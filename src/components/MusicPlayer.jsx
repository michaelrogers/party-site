import React, { Component } from 'react';
// import Button from 'material-ui/Button';
// import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
const appRoot = '//localhost:3001';

export default class Colophon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        title: 'Citizen',
        artist: 'Broken Bells',
        album: 'After the Disco',
        imagery: '',
        duration: 292066
      },
      progress: 0,
      elapsed: 150910
    };
    this.progress = this.progress.bind(this);
    this.skip = this.skip.bind(this);
    this.unskip = this.unskip.bind(this);
    this.fetchCurrentSong = this.fetchCurrentSong.bind(this);
    
  }
  timer: number;

  componentDidMount() {
    this.timer = setInterval(this.progress, 1000);
    this.fetchCurrentSong();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  fetchCurrentSong = () => {
    fetch(appRoot + '/spotify/player/current', {
      credentials: 'include',
      mode: 'cors',
    }).then((response) => console.log(response.body));
  }
  skip = () => {
    fetch(appRoot + '/spotify/controls/skip', {
      credentials: 'include',
      mode: 'no-cors',
    }).then((response) => console.log(response));
  }
  unskip = () => {
    fetch(appRoot + '/spotify/controls/unskip', {
      credentials: 'include',
      mode: 'no-cors',
    }).then((response) => console.log(response));
  }

  progress = () => {
    const { progress, elapsed } = this.state;
    const newElapsed = parseInt(elapsed + 1000, 10);
    const trackDuration = this.state.current.duration;
    const percentProgress = Math.floor(
      (
        1 - (trackDuration - newElapsed) / trackDuration
      )  * 100
    ); 
      this.setState({
        elapsed: newElapsed,
        progress: percentProgress 
      });
  };



  render() {
    return (
      <Card>
        {/* <CardMedia
          image={this.state.current.imagery}
          title={this.state.current.album}
        /> */}
        <CardContent>
          <Typography type="caption" component="p">
            Now Playing
          </Typography>
          <Typography type="headline" component="h2">
            {this.state.current.title}
          </Typography>
          <Typography component="p" type="subheading">
            {this.state.current.artist}
          </Typography>
          <Typography component="p">
            {this.state.current.album}
          </Typography>
          <br/>
          <LinearProgress color="accent" mode="determinate" value={this.state.progress} />
          <Typography component="span" alight="left">
            {this.state.elapsed}
          </Typography>
          <Typography component="span" align="right">
            {this.state.current.duration}
          </Typography>
        </CardContent>
        <CardActions>
        <IconButton aria-label="Previous" onClick={this.unskip}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="Play/pause">
            <PlayArrowIcon  />
          </IconButton>
          <IconButton aria-label="Next" onClick={this.skip}>
            <SkipNextIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}