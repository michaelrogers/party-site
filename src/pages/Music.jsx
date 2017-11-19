import React, { Component } from 'react';

import MusicPlayer from '../components/MusicPlayer';

import UpNext from '../components/UpNext';

export default class Music extends Component {

  render() {
    return (
      <div>
        <br/>
        <MusicPlayer/>
        <br/>
        <UpNext/>
      </div>
    )
  }
}