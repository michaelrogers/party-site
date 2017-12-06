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
const socket = io.connect(
  'http://localhost',
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
      elapsed: 0
    };
    this.updateCurrentSong = this.updateCurrentSong.bind(this);
    this.updateUserCount = this.updateUserCount.bind(this);
  }
  componentWillUnMount() {
    socket.off('player:current');
  }
  componentDidMount() {
    socket.on('player:current', this.updateCurrentSong);
    socket.on('user:count', this.updateUserCount);
  }
  updateCurrentSong(data) {
    console.log(data);
    this.setState({
      current: data.currentSong, 
      elapsed: data.elapsed
    });
  }
  updateUserCount(data) {
    console.log(data);
  }

  render() {
    return (
      <div>
        <br/>
        <Grid item xs={12} lg={6}>
          <MusicPlayer
            current={this.state.current}
            elapsed={this.state.elapsed}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <br/>
          <UpNext/>
        </Grid>
      </div>
    );
  }
}