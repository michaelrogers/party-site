
// const nconf = require('nconf');
// const mailgun = require('mailgun-js')({
//   apiKey: process.env.mailgun || nconf.get('server:mailgun'),
//   domain: 'mail.michaelandleigh.com'
// });

// const adminEmailAddresses = process.env.adminEmail || nconf.get('server:adminEmail');
const rsvp = require('../models/rsvp');


module.exports = {
  submit: async function(req, res) {
    console.log('req.body', req.body);
    // const newRSVP = new rsvp({
    //   guestName: req.body.name,
    //   isAttending: true,
    //   numberAttending: req.body.number || 1,
    //   notes: req.body.notes
    // });
    
    // await newRSVP.save();
    // res.send(newRSVP);
    res.send({});
  }

};