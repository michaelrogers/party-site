
const nconf = require('nconf');
const rsvp = require('../models/rsvp');

const mailgun = require('mailgun-js')({
  apiKey: process.env.mailgun || nconf.get('server:mailgun'),
  domain: 'mail.michaelandleigh.com'
});

const adminEmailAddresses = process.env.adminEmail || nconf.get('server:adminEmail');
console.log(adminEmailAddresses)
const newRSVPEmail = (guestName, numberAttending, isAttending) => {
  const toAddress = adminEmailAddresses || '<mhrogers12@gmail.com>';
  return {
    from: 'MichaelandLeigh <mail@michaelandleigh.com>',
    to: toAddress,
    subject: `${guestName} RSVP'd`,
    text: `
      <p>${guestName} just RVSP'd that they ${isAttending ? 'are' : 'are not'} with ${numberAttending} in their party.</p>
    `
  };
};
const confirmRSVPEmail = (guestName, numberAttending, _isAttending, emailAddress) => {
  return {
    from: 'MichaelandLeigh <mail@michaelandleigh.com>',
    to: emailAddress,
    subject: "We've received your RSVP",
    text: `
      <p>Hi ${guestName},</p>
      <br/>
      <p>Thanks for RSVP'ing, we have you down for ${numberAttending}. Please let us know if your plans change.</p>
      <hr/>
      <p>Event Date</p>
      <p>January 20th, 2018</p>
      <p>7:00 PM - 12:01AM</p>
      <br/>
      <p>Location</p>
      <p>Sharespace Warehouse</p>
      <p>2203 Preston Street</p>
      <p>Houston, TX</p>
      `
  };
};

module.exports = {
  submit: function(req, res, next) {
    const numberAttending = parseInt(req.body.number, 10) || 0;
    const emailAddress = req.body.email;
    const newRSVP = new rsvp({
      guestName: req.body.name,
      email: emailAddress,
      isAttending: numberAttending > 0,
      numberAttending: numberAttending,
      notes: req.body.note
    });
    console.log('NewRSVP before save', newRSVP);
    newRSVP.save((error, success) => {
      if (error) {
        console.log(error);
        next(error);
      }
      console.log(success);
        
      mailgun.messages().send(
        newRSVPEmail(newRSVP.guestName, newRSVP.numberAttending, newRSVP.isAttending),
        (err, body) => console.log('newRSVP: ', err || body));

      if (emailAddress) {
        mailgun.messages().send(
          confirmRSVPEmail(req.body.guestName, req.body.numberAttending, req.body.isAttending, emailAddress),
          (err, body) => console.log('Confirmation: ', err || body));
      }
      res.send(rsvp);
    });

  }

};