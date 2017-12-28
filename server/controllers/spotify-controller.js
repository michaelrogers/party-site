const request = require('request');
const rp = require('request-promise');
const path = require('path');
const querystring = require('querystring');
const nconf = require('nconf');
// const axios = require('axios');

const client_id = process.env.spotifyClientId || nconf.get('server:api:spotify:clientId');
const client_secret = process.env.spotifyClientSecret || nconf.get('server:api:spotify:clientSecret');
const publicUrl = process.env.PUBLIC_URL || 'http://localhost';
const user_id = process.env.spotify_user_id || nconf.get('server:api:spotify:user_id');

// Set on initial authentication, used for spotify bearer token
let access_token;
let refresh_token;

// Queue should precede list
const playlists = process.env.spotifyPlaylists || nconf.get('server:api:spotify:playlists');
// list of all playlist uri
let playlistTracks = [];
const queueid = process.env.queueid || nconf.get(('server:api:spotify:queueid'));

const redirect_uri = publicUrl + '/spotify/callback'; // Your redirect uri

const apiBase = 'https://api.spotify.com/v1';
const accountBase = 'https://accounts.spotify.com';

const authorizationScope = [
  'user-read-private',
  'user-read-email',
  'user-read-currently-playing',
  'user-read-recently-played streaming',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-library-read',
  'playlist-modify-private',
  'playlist-modify-public',
];
const scope = authorizationScope.join(' ');
const stateKey = 'spotify_auth_state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(
      Math.floor(
        Math.random() * possible.length
      )
    );
  }
  return text;
};

const selectNextOptions = () => (
  playlistTracks.map(
    playlist => (
      playlist[Math.floor(Math.random() * playlist.length)]
    ))
  );


async function fetchPlaylistTracks(playlistid) {
  const body = await rp({
    uri: `${apiBase}/users/${user_id}/playlists/${playlistid}/tracks`,
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  });
  return body.items.map(item => {
      return {
        title: item.track.name || '',
        id: item.track.id || '',
        uri: item.track.uri || '',
        artist: item.track.artists.map(a => a.name).join(', ') || '',
        album: item.track.album.name || '',
        imagery: item.track.album.images[0].url || '',
        duration: item.track.duration_ms || '',
      }
    });
}

async function clearQueue () {
  const queueTracks = await fetchPlaylistTracks(queueid);
  const queueUris = queueTracks.map(track => {return {uri: track.uri}});
  console.log({queueTracks, queueUris});
  const body = await removePlaylistTracks(queueid, queueUris);
  return body;
}

const removePlaylistTracks = (playlistid, track_uris) => (
  rp({
    uri: `${accountBase}/users/${user_id}/playlists/${playlistid}/tracks`,
    method: 'DELETE',
    body: {
      tracks: track_uris
    },
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  })
);
const playTracks = track_uris => (
  rp({
    headers: { 'Authorization': 'Bearer ' + access_token },
    uri: `${accountBase}/me/player/play`,
    method: 'PUT',
    body: {
      uris: track_uris
    },
    json: true
  })
);
const skipTrack = () => (
  rp({
    uri: apiBase + '/me/player/next',
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  })
);
const unskipTrack = () => (
  rp({
    uri: apiBase + '/me/player/previous',
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  })
);

const fetchCurrentPlayerState = () => {
  const url = (apiBase + '/me/player');
  const options = {
    uri: url,
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };
  return rp(options);
};

const appendToQueue = (trackuri) => {
  const options = {
    uri: apiBase + `/users/${user_id}/playlists/${queueid}/tracks?uris=${trackuri}`,
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };
  return rp(options);
}

module.exports = {
  login: function(req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    res.redirect(accountBase + '/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  },
  callback: async function(req, res, next) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      
      const authOptions = {
        uri: accountBase + '/api/token',
        method: 'POST',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
      try {
        const responseBody = await rp(authOptions);
        access_token = responseBody.access_token;
        refresh_token = responseBody.refresh_token;
        const promises = playlists.map(playlist => (
          fetchPlaylistTracks(playlist.playlistid)
        ));
        
        playlistTracks = await Promise.all(promises);
        
        //FIXME: Returns 405 unexpected method DELETE
        // Clear queue tracks on initial start
        // await clearQueue();
        
        // await playTracks(['spotify:track:3gXiZI3OPiqyB8QKAFiHE0']);
        selectNextOptions();
        // res.send(playlistTracks)
        res.send('Ready to rock!');
        
      } catch(e) {
        next(e);
        // res.redirect('/#' +
        // querystring.stringify({error: 'invalid_token'}));
      }
    }
  },


  skip: async function(req, res, next) {
    try {
      const response = await skipTrack();
      res.send(response);
    } catch(e) {
      next(e);
    }
  },
  unskip: async function(req, res, next) {
    try {
      const response = await unskipTrack();
      res.send(response);
      } catch(e) {
        next(e);
      }
  },
  current: async function(req, res, next) {
    try {
      
      const body = await fetchCurrentPlayerState();
      res.send(body);
    } catch(e) {
      next(e);
    }
  },
  newUpNext: function(req, res, next) {
    res.send(selectNextOptions());
  },
  currentSong: async function(req, res, next) {
    try {
      const options = {
        uri: apiBase + '/me/player/currently-playing',
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
      const body = await rp(options);
      res.send(body);
    } catch(e) {
      next(e);
    }
  },

  fetchPlaylistTracks: async function(req, res, next) {
    try {
      const playlistId = req.params.playlistid;
      const tracks = fetchPlaylistTracks(playlistId);
      
      res.send(tracks);
    } catch(e) {
      next(e);
    }
  },
  addTrackToQueue: async function(req, res, next) {
    try {
      const trackuri = req.params.trackuri;
      const body = await appendToQueue(trackuri);

      res.send(body);
    } catch(e) {
      next(e);
    }
  },
  fetchAllPlaylists: async function(req, res, next) {
    try {
      const options = {
        uri: apiBase + '/me/playlists/',
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
      const body = await rp(options);
      const playlists = body.items.map(item => {
        return {
          name: item.name,
          playlistid: item.id
        };

      });
      res.send(playlists);
    } catch(e) {
      next(e);
    }
  },
  fetchUserProfile: async function(req, res, next) {
    const options = {
      uri: apiBase + '/me/',
      headers: { 'Authorization': 'Bearer ' + access_token },
      method: 'GET',
      json: true
    };
    try {
      const body = await rp(options)
      res.send(body);
    } catch(e) {
      next(e);
    }
  },
  refreshToken: function(req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
    
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  },

};
