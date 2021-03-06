
const spotifyController = require('../controllers/spotify-controller.js');
const router = require('express').Router();


router.get('/login', spotifyController.login);
router.get('/callback', spotifyController.callback);
router.get('/refresh-token', spotifyController.refreshToken);
router.get('/me', spotifyController.fetchUserProfile);
router.get('/controls/skip', spotifyController.skip);
router.get('/controls/unskip', spotifyController.unskip);
router.get('/player/current', spotifyController.current);
router.get('/player/song', spotifyController.currentSong);
router.get('/playlist/:playlistid/tracks', spotifyController.fetchPlaylist);
router.get('/playlist/all', spotifyController.fetchAllPlaylists);


module.exports = router;