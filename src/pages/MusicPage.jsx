import React, { Component } from 'react';
import MusicPlayer from '../components/MusicPlayer';
import UpNext from '../components/UpNext';
import Grid from 'material-ui/Grid';


// const socket = io.connect(
//   'https://michaelandleigh.herokuapp.com',
//   {
//     reconnect: true,
//     transports: ['websocket'],
//     path: '/socket.io'
//   });

import io from 'socket.io-client';

const publicUrl = process.env.PUBLIC_URL || 'http://localhost/';
const socket = io.connect(
  publicUrl,
  {
    reconnect: true,
    transports: ['websocket'],
    // path: '/socket.io'
  });


export default class MusicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        title: 'Citizen',
        artist: 'Broken Bells',
        album: 'After the Disco',
        imagery: 'https://i.scdn.co/image/006e418c379a9417ebf9af0c67a2d17726aa1932',
        duration: 292066
      },
      songChoices: [],
      elapsed: 0
    };
    this.updateCurrentSong = this.updateCurrentSong.bind(this);
    this.updateSongChoices = this.updateSongChoices.bind(this);
    this.updateUserCount = this.updateUserCount.bind(this);
  }
  componentWillUnMount() {
    socket.off('player:current');
    socket.off('player:song-choices');
  }
  componentDidMount() {
    socket.on('player:current', this.updateCurrentSong);
    socket.on('player:song-choices', this.updateSongChoices);
    socket.on('user:count', this.updateUserCount);
  }
  updateCurrentSong(data) {
    console.log(data);
    this.setState({
      current: data.currentSong, 
      elapsed: data.elapsed
    });
  }
  updateSongChoices(data) {
    console.log(data);
    this.setState({
      songChoices: data
    });
  }
  updateUserCount(data) {
    console.log('Current users', data);
  }

  render() {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} lg={4}>
            <MusicPlayer
              current={this.state.current}
              elapsed={this.state.elapsed}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <UpNext
              songChoices={this.state.songChoices}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}