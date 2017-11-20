const request = require('request');
const querystring = require('querystring');
const nconf = require('nconf');
const axios = require('axios');

const client_id = process.env.spotifyClientId || nconf.get('server:api:spotify:clientId');
const client_secret = process.env.spotifyClientSecret || nconf.get('server:api:spotify:clientSecret');

const redirect_uri = 'http://localhost/spotify/callback'; // Your redirect uri
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
let access_token = null;
let refresh_token = null;


// const state = generateRandomString(16);
// axios.get(accountBase + '/authorize?' +
// querystring.stringify({
//   response_type: 'code',
//   client_id: client_id,
//   scope: scope,
//   redirect_uri: redirect_uri,
//   state: state
// })).then((response) => {
//   console.log(response)
  
//   const authOptions = {
//     url: accountBase + '/api/token',
//     form: {
//       code: code,
//       redirect_uri: redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     },
//     json: true
//   };
  
//     request.post(authOptions, function(error, response, body) {
//       console.log(body)
//       if (!error && response.statusCode === 200) {
//       access_token = body.access_token;
//       refresh_token = body.refresh_token;
//     }
// });

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
  callback: function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    const code = req.query.code || null;
    const state = req.query.state || null;
    console.log('Cookies!',req.cookies);
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log('Debug', state, storedState);
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        url: accountBase + '/api/token',
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
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          access_token = body.access_token;
          refresh_token = body.refresh_token;
          // const { access_token, refresh_token} = body;
          // use the access token to access the Spotify Web API
          // we can also pass the token to the browser to make requests from there
          // res.redirect('/#' +
          //   querystring.stringify({
          //     access_token: access_token,
          //     refresh_token: refresh_token
          //   }));
          res.send('Ready to rock!');
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
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

  skip: function(req, res) {
    // const options = {...requestOptions};
    const options = {
      url: apiBase + '/me/player/next',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    request.post(options, function(error, response, body) {
      if (!error) {
        res.send(body);
      } else {
        console.log(error);
      }
    });

  },
  unskip: function(req, res) {
    const options = {
      url: apiBase + '/me/player/previous',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    request.post(options, function(error, response, body) {
      if (!error) {
        res.send(body);
      } else { 
        console.log(error);
      }
    });
  },
  current: function(req, res) {
    const options = {
      url: apiBase + '/me/player',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    request.get(options, function(error, response, body) {
    // const response = await request.get(options);
    // const json = await response.json();
      res.send(body);
    });
  },
  currentSong: function(req, res) {
    const options = {
      url: apiBase + '/me/player/currently-playing',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    request.get(options, function(error, response, body) {
      res.send(body);
    });
  },

  fetchPlaylist: function(req, res) {
    const playlistId = req.params.playlistid;
    const options = {
      url: `${apiBase}/users/coverfire/playlists/${playlistId}/tracks`,
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    request.get(options, function(error, response, body) {
      res.send(body);
    });
  },

  fetchAllPlaylists: function(req, res) {
    const options = {
      url: apiBase + '/me/playlists/',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    request.get(options, function(error, response, body) {
      res.send(body);
    });
  },
  fetchUserProfile: function(req, res) {
    const options = {
      url: apiBase +  '/me/',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    request.get(options, function(error, response, body) {
      res.send(body);
    });
  }

};
