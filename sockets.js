const socket = require('socket.io');
const axios = require('axios');
const appRoot = 'http://localhost';

let currentSongData = {};
let playlistData = {};

exports = module.exports = function(server) {
  const io = socket(server);
  const fetchCurrentSong = () => {
    axios.get('/spotify/player/current')
      .then(response => {
        if (!response.data.item) {
          console.error(response.data.error.status + ': ' + response.data.error.message);
        }
        if (response.data.item) {
          const data = {
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
          io.emit('player:current', data); 
        }

      });

  };
  // Commented out
  // setInterval(fetchCurrentSong, 10000);


  io.on('connection', socket => {
    // fetchCurrentSong();
    // io.emit('game:score', game.score);
  
    io.emit('user:count', socket.server.engine.clientsCount);
    io.on('disconnect', socket => {
      io.emit('user:count', socket.server.engine.clientsCount);
    });
    
    // socket.on('player:action', data => {
    
    //   // io.emit('game:score', game.score);
    // });
  });
};