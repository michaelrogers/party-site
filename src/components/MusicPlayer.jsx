import React, { Component } from 'react';
import moment from 'moment';
// import Button from 'material-ui/Button';
// import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
// import IconButton from 'material-ui/IconButton';

// import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
// import PlayArrowIcon from 'material-ui-icons/PlayArrow';
// import SkipNextIcon from 'material-ui-icons/SkipNext';
const publicUrl = process.env.PUBLIC_URL || 'http://localhost';


const styles = {
  albumCover: {
    borderRadius: '2px 2px 0 0',
    height: 500,
  },

  card: {
    display: '-webkit-flex',
  },
  details: {
    display: '-webkit-flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  media: {
    height: 200,
  },
  controls: {
    display: '-webkit-flex',
    alignItems: 'center',
    // paddingLeft: theme.spacing.unit,
    // paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
};


export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      elapsed: 0,
    };
    this.progress = this.progress.bind(this);
    // this.skip = this.skip.bind(this);
    // this.unskip = this.unskip.bind(this);
    this.fetchCurrentSong = this.fetchCurrentSong.bind(this);
  }
  
  timer: Number;

  componentDidMount() {
    this.timer = setInterval(this.progress, 1000);
    // this.fetchCurrentSong();
  }
  componentWillReceiveProps(props) {
    this.setState({ elapsed: props.elapsed });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  fetchCurrentSong = () => {
    fetch(publicUrl + '/spotify/player/current', {
      credentials: 'include',
      mode: 'cors',
    }).then((response) => console.log(response.body));
  }
  // skip = () => {
  //   fetch(publicUrl + '/spotify/controls/skip', {
  //     credentials: 'include',
  //     mode: 'no-cors',
  //   }).then((response) => console.log(response));
  // }
  // unskip = () => {
  //   const endpoint = publicUrl + '/spotify/controls/unskip';
  //   fetch(endpoint, {
  //     credentials: 'include',
  //     mode: 'no-cors',
  //   }).then((response) => console.log(response));
  // }

  progress = () => {
    const { 
      // progress,
      elapsed 
    } = this.state;
    const newElapsed = this.props.isPlaying ? parseInt(elapsed + 1000, 10) : elapsed;
    const trackDuration = this.props.current.duration;
    const percentProgress = Math.floor(
      (1 - (trackDuration - newElapsed) / trackDuration)  * 100
    ); 
    this.setState({
      elapsed: newElapsed <= trackDuration ? newElapsed : trackDuration,
      progress: percentProgress 
    });
  };

  render() {
    return (
      <Card>
        <CardMedia
          style={styles.albumCover}
          image={this.props.current.imagery}
          title={this.props.current.album}
        />
        <CardContent>
          <Typography type="caption" component="p">
            Now Playing
          </Typography>
          <Typography type="headline" component="h2">
            {this.props.current.title}
          </Typography>
          <Typography component="p" type="subheading">
            {this.props.current.artist}
          </Typography>
          <Typography component="p">
            {this.props.current.album}
          </Typography>
          <br/>
          <LinearProgress color="accent" mode="determinate" value={this.state.progress} />
          <Typography component="span" alight="left" style={{display: 'inline-block'}}>
            {moment.utc(this.state.elapsed).format('m:ss')}
          </Typography>
          <Typography component="span" align="right" style={{display: 'inline-block', float: 'right'}}>
            {moment.utc(this.props.current.duration).format('m:ss')}
          </Typography>
        </CardContent>
        <CardActions>
        {/*
          <IconButton aria-label="Previous" onClick={this.unskip}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="Next" onClick={this.skip}>
            <SkipNextIcon />
          </IconButton>
        */}
        </CardActions>
      </Card>
    )
  }
}