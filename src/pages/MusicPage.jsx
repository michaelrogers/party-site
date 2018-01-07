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
const socket = io.connect(publicUrl, {
  reconnect: true,
  transports: ['websocket'],
  // path: '/socket.io'
});


export default class MusicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      songChoices: [],
      isPlaying: false,
      elapsed: 0,
      totalVotes: 0
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
    this.setState({
      current: data.currentSong, 
      isPlaying: data.isPlaying, 
      elapsed: data.elapsed
    });
  }
  updateSongChoices(songs) {
    const totalVotes = songs.reduce((acc, song) => acc + song.votes, 0);
    this.setState({
      songChoices: songs,
      totalVotes: totalVotes
    });
  }
  updateUserCount(data) {
    console.log('Current users', data);
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={11} lg={4}>
          <MusicPlayer
            current={this.state.current}
            elapsed={this.state.elapsed}
            isPlaying={this.state.isPlaying}
          />
        </Grid>
        <Grid item xs={11} lg={6}>
          <UpNext
            songChoices={this.state.songChoices}
            totalVotes={this.state.totalVotes}
            socket={socket}
          />
        </Grid>
      </Grid>
    );
  }
}