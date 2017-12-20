const socket = require('socket.io');
const axios = require('axios');
const appRoot = 'http://localhost';

function Song (name, artist, album, imagery) {
  return {
    name,
    artist,
    album,
    imagery,
    votes: 0
  };
}

let currentSongData = {
  isPlaying: null,
  elapsed: null,
  currentSong: {
    title: 'Citizen',
    artist: 'Broken Bells',
    album: 'After the Disco',
    imagery: 'https://i.scdn.co/image/006e418c379a9417ebf9af0c67a2d17726aa1932',
    duration: 292066
  }
};
let playlistData = {
  songs: [
    {
      title: 'Live From Space',
      artist: 'Mac Miller',
      album: 'Album 1',
      imagery: 'https://i.scdn.co/image/006e418c379a9417ebf9af0c67a2d17726aa1932',
      votes: 0,
    },
    {
      title: 'Song 2',
      artist: 'Artist 2',
      album: 'Album 2',
      imagery: 'https://i.scdn.co/image/006e418c379a9417ebf9af0c67a2d17726aa1932',
      votes: 0,
    },
    {
      title: 'Song 3',
      artist: 'Artist 3',
      album: 'Album 3',
      imagery: 'https://i.scdn.co/image/006e418c379a9417ebf9af0c67a2d17726aa1932',
      votes: 0,
    },
    {
      title: 'Song 3',
      artist: 'Artist 3',
      album: 'Album 3',
      imagery: 'https://i.scdn.co/image/006e418c379a9417ebf9af0c67a2d17726aa1932',
      votes: 0,
    }

  ]
};


const generateNextPlaylist = () => {

};

exports = module.exports = function(server) {
  const io = socket(server);

  // Called periodically to refresh data
  const fetchCurrentSong = () => {
    axios.get('/spotify/player/current')
      .then(response => {
        if (!response.data.item) {
          console.error(response.data.error.status + ': ' + response.data.error.message);
        }
        if (response.data.item) {
          currentSongData = {
            isPlaying: response.data.is_playing,
            elapsed: response.data.progress_ms,
            currentSong: {
              title: response.data.item.name,
              artist: response.data.item.album.artists.map(x => x.name).join(', '),
              imagery: response.data.item.album.images[0].url,
              duration: response.data.item.duration_ms,
              album: response.data.item.album.name
            }
          };
          io.emit('player:current', currentSongData); 
          io.emit('player:song-choices', playlistData.songs); 
        }
      });
  };
  // Commented out
  setInterval(fetchCurrentSong, 10000);


  io.on('connection', socket => {
    io.emit('player:current', currentSongData); 
    
    io.emit('user:count', socket.server.engine.clientsCount);
    io.on('disconnect', socket => {
      io.emit('user:count', socket.server.engine.clientsCount);
    });
    
    // socket.on('player:action', data => {
    
    //   // io.emit('game:score', game.score);
    // });
  });
};