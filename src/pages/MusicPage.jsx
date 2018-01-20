import React, { Component } from 'react';
import MusicPlayer from '../components/MusicPlayer';
import UpNext from '../components/UpNext';
import Grid from 'material-ui/Grid';
import CustomParticles from '../components/CustomParticles';

import io from 'socket.io-client';

const publicUrl = process.env.PUBLIC_URL || 'http://localhost/';
const socket = io.connect(publicUrl, {
  reconnect: true,
  transports: ['websocket'],
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
      isPlaying: false,
      elapsed: 0,
      totalVotes: 0,
      acceptingVotes: false
    };
    this.updateCurrentSong = this.updateCurrentSong.bind(this);
    this.updateSongChoices = this.updateSongChoices.bind(this);
    this.updateUserCount = this.updateUserCount.bind(this);
    this.updateAcceptingVotes = this.updateAcceptingVotes.bind(this);
  }
  componentWillUnmount() {
    socket.off('player:current');
    socket.off('player:song-choices');
    socket.off('user:count');
    socket.off('player:accepting-votes');
  }
  componentDidMount() {
    socket.on('player:current', this.updateCurrentSong);
    socket.on('player:song-choices', this.updateSongChoices);
    socket.on('player:accepting-votes', this.updateAcceptingVotes);
    socket.on('user:count', this.updateUserCount);
    socket.emit('mount');
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
  updateAcceptingVotes(value) {
    this.setState({
      acceptingVotes: value
    });
  }
  updateUserCount(data) {
    console.log('Current users', data);
  }

  render() {
    return (
      <div>
        {/* <CustomParticles style={{height: '100%'}}/> */}
        <Grid container justify="center">
          <Grid item xs={11} md={6} lg={4}>
            <div id="music-player">  
              <MusicPlayer
                current={this.state.current}
                elapsed={this.state.elapsed}
                isPlaying={this.state.isPlaying}
                />
              </div>
          </Grid>
          <Grid item xs={11} md={6} lg={6}>
            <UpNext
              songChoices={this.state.songChoices}
              totalVotes={this.state.totalVotes}
              acceptingVotes={this.state.acceptingVotes}
              socket={socket}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}