// import { setTimeout } from 'core-js/library/web/timers';
const debounce = require('./server/utils/debounce');
// const debounce = require('es6-promise-debounce');
const socket = require('socket.io');
const axios = require('axios');
const lockinDuration = process.env.lockin || 40 * 1000;
const fetchInterval = process.env.fetch || 10 * 1000;
const refreshInterval = process.env.refresh || 5 * 60 * 1000;

const publicUrl = process.env.PUBLIC_URL || 'http://localhost';
console.log({lockinDuration, fetchInterval, refreshInterval});

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
let acceptingUpdates = true;


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
    return axios.post('/spotify/queue/' + selectedTrack.uri);
  }

  async function fetchNewUpNext() {
    try {
      const response = await axios.get(publicUrl + '/spotify/queue/newupnext')
      const songs = response.data;
      songs.map(song => {
        song.votes = 0;
        return song;
      });
      upNextChoices = songs;
      console.log('upNext', upNextChoices.map(c => c.title));
      // io.emit('player:song-choices', upNextChoices); 
    } catch (e) {
      console.log(e);
    }
  }


  async function refreshToken() {
    try {
      console.log('Attempting refresh');
      const response = await axios.get(publicUrl + '/spotify/refresh-token');
    } catch (e) {
      console.log(e);
    }
  }
 
  // Called periodically to refresh data
  async function fetchCurrentSong() {
    try {
      const response = await axios.get(publicUrl + '/spotify/player/current');
      const player = response.data;
      const elapsed = player.progress_ms || 0;
      const duration = player.item ? player.item.duration_ms : 0;
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
        if ((elapsed + lockinDuration) > duration) {
            if (acceptingUpdates) {
              acceptingUpdates = false;
              await determineVoteWinner();
              await fetchNewUpNext();
              setTimeout(async function() {
                console.log('Playlist: End of song');
                acceptingUpdates = true;
                await fetchCurrentSong();
                io.emit('player:current', currentSongData); 
                io.emit('player:song-choices', upNextChoices);
              }, (duration - elapsed) + 1000);
            } else {
              console.log('Playlist: Update ignored');
            }
              
            // },
            // lockinDuration * 2
            // ); //debounce
          }
          io.emit('player:current', currentSongData); 
          // io.emit('player:song-choices', upNextChoices); 
      }
    } catch (e) {
      console.error(e);
    }
  }

  fetchNewUpNext();
  io.emit('player:song-choices', upNextChoices); 
  // Setup fetching
  if (!process.env.disableFetch) {
    console.log('Info: Fetch in progress');
    setInterval(fetchCurrentSong, fetchInterval);
    setInterval(refreshToken, refreshInterval);
  }

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