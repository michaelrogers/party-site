// import { setTimeout } from 'core-js/library/web/timers';

const socket = require('socket.io');
const axios = require('axios');
const lockinDuration = 15 * 1000;
const fetchInterval = 15 * 1000;

let currentSongData = {
  isPlaying: null,
  elapsed: null,
  currentSong: {
    title: "When the Music's Over",
    artist: 'The Doors',
    album: 'L.A. Woman',
    imagery: 'https://i.scdn.co/image/006e418c379a9417ebf9af0c67a2d17726aa1932',
    duration: 292066
  }
};
let upNextChoices = [];



exports = module.exports = function(server) {
  const io = socket(server);

  async function determineVoteWinner() {
    let index = Math.floor(upNextChoices.length * Math.random());
    let maxVotes = 0;
    // Grab upnext for random selection
    if (!upNextChoices.length) {
      await fetchNewUpNext();
    }
    upNextChoices.map((choice, i) => {
      if (choice.votes > maxVotes) {
        maxVotes = choice.votes;
        index = i;
      }
    });
    const selectedTrack = upNextChoices[index];
    console.log('Winner: ', selectedTrack.title);
    await axios.post('/spotify/queue/' + selectedTrack.uri);
  };



  // Called periodically to refresh data
  async function fetchCurrentSong () {
    try {
      const response = await axios.get('/spotify/player/current');
      const player = response.data;
      const elapsed = player.progress_ms;
      const duration = player.item.duration_ms;
      if (player.item) {
        currentSongData = {
          isPlaying: player.is_playing,
          elapsed: elapsed,
          currentSong: {
            title: player.item.name,
            artist: player.item.album.artists.map(x => x.name).join(', '),
            imagery: player.item.album.images[0].url,
            duration: duration,
            album: player.item.album.name
          }
        };
        if (elapsed + lockinDuration > duration) {
          console.log('Time to set new song');
          await determineVoteWinner();
          await fetchNewUpNext();
          
          setTimeout(async function() {
            io.emit('player:current', currentSongData); 
            io.emit('player:song-choices', upNextChoices);
          }, duration - elapsed);
        }
        io.emit('player:current', currentSongData); 
        // io.emit('player:song-choices', upNextChoices); 
      }
    } catch (e) {
      console.error(e);
    }
    };

  async function fetchNewUpNext() {
    try {
      const response = await axios.post('/spotify/queue/newupnext')
      const songs = response.data;
      songs.map(song => {
        song.votes = 0;
        return song;
      });
      upNextChoices = songs;
      console.log({upNextChoices});
      // io.emit('player:song-choices', upNextChoices); 
    } catch (e) {
      console.log(e);
    }
  };


  fetchNewUpNext();
  io.emit('player:song-choices', upNextChoices); 
  
  // Commented out
  setInterval(fetchCurrentSong, fetchInterval);


  io.on('connection', socket => {
    io.emit('player:current', currentSongData);
    io.emit('player:song-choices', upNextChoices);
    io.emit('user:count', socket.server.engine.clientsCount);
    
    socket.on('song:vote', uri => {
      const songIndex = upNextChoices.map(song => song.uri).indexOf(uri);
      if (songIndex >= 0) {
        upNextChoices[songIndex].votes++;
        io.emit('player:song-choices', upNextChoices);
      }
    });
    
    
    
    io.on('disconnect', socket => {
      io.emit('user:count', socket.server.engine.clientsCount);
    });

  });
};