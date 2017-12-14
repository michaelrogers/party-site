const rsvpController = require('../controllers/rsvp-controller.js');
const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


router.post('/', jsonParser, rsvpController.submit);

module.exports = router;