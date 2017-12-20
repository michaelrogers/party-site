const request = require('request');
const rp = require('request-promise');
const path = require('path');
const querystring = require('querystring');
const nconf = require('nconf');
const axios = require('axios');

const queueId = '4mdBCkYnWOeIGyjttF9Ha4';
const partyPlaylistId = '2v7briJjtSi4zQeNgChn3I';


const client_id = process.env.spotifyClientId || nconf.get('server:api:spotify:clientId');
const client_secret = process.env.spotifyClientSecret || nconf.get('server:api:spotify:clientSecret');
const publicUrl = process.env.PUBLIC_URL || 'http://localhost';
const user_id = process.env.spotify_user_id || nconf.get('server:api:spotify:user_id');

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
];
const scope = authorizationScope.join(' ');

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';
//Shared between controllers
// let access_token = null;
// let refresh_token = null;

// const state = generateRandomString(16);
// axios.get(accountBase + '/authorize?' +
//   querystring.stringify({
//     response_type: 'code',
//     client_id: client_id,
//     scope: scope,
//     redirect_uri: redirect_uri,
//     state: state
//   })).then((response) => {
  
//     const authOptions = {
//       url: accountBase + '/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };
  
// });

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
        await module.exports.fetchAllPlaylists(req, res, next);
        res.send('Ready to rock!');
        
      } catch(e) {
        res.redirect('/#' +
        querystring.stringify({error: 'invalid_token'}));
      }
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

  skip: async function(req, res, next) {
    const options = {
      uri: apiBase + '/me/player/next',
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    try {
      const response = await rp(options);
      res.send(response);
      } catch(e) {
        next(e);
      }
  },
  unskip: async function(req, res) {
    const options = {
      uri: apiBase + '/me/player/previous',
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    try {
      const response = await rp(options);
      res.send(response);
      } catch(e) {
        next(e);
      }
  },
  current: async function(req, res) {
    const url = (apiBase + '/me/player');
    const options = {
      uri: url,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    try {
      const body = await rp(body);
      res.send(body);
    } catch(e) {
      next(e);
    }
  },
  currentSong: async function(req, res) {
    const options = {
      uri: apiBase + '/me/player/currently-playing',
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    try {
      const body = await rp(options);
      res.send(body);
    } catch(e) {
      next(e);
    }
  },

  fetchPlaylist: async function(req, res) {
    const playlistId = req.params.playlistid;
    const options = {
      uri: `${apiBase}/users/${user_id}/playlists/${playlistId}/tracks`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    try {
      const body = await rp(options);
      res.send(body);
    } catch(e) {
      next(e);
    }
  },

  fetchAllPlaylists: async function(req, res, next) {
    const options = {
      uri: apiBase + '/me/playlists/',
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    try {
      const body = await rp(options) 
      res.send(body);
    } catch(e) {
      next(e);
    }
  },
  fetchUserProfile: async function(req, res) {
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

};
