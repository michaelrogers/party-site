
const nconf = require('nconf');
const mailgun = require('mailgun-js')({
  apiKey: process.env.mailgun || nconf.get('server:mailgun'),
  domain: 'mail.michaelandleigh.com'
});

const adminEmailAddresses = process.env.adminEmail || nconf.get('server:adminEmail');
const rsvp = require('../models/rsvp');
const newRSVP = (guestName, numberAttending, isAttending) => {
  return {
    from: 'MichaelandLeigh <mail@michaelandleigh.com>',
    to: adminEmailAddresses | 'mhrogers12@gmail.com',
    subject: `${guestName} RSVP'd`,
    text: `
      <p>${guestName} just RVSP'd that they ${isAttending ? 'are' : 'are not'} with ${numberAttending} in their party.</p>
    `
  };
};
const confirmRSVP = (guestName, numberAttending, isAttending) => {
  return {
    from: 'MichaelandLeigh <mail@michaelandleigh.com>',
    to: adminEmailAddresses | 'mhrogers12@gmail.com',
    subject: `We've received your RSVP`,
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
      notes: req.body.notes
    });
    console.log(newRSVP);
    newRSVP.save((error, success) => {
      if (error) {
        console.log(error);
        next(error);
      }
      console.log(success);
        
      mailgun.messages().send(
        newRSVP(req.body.guestName, req.body.numberAttending, req.body.isAttending),
        (err, body) => console.log(err || body));

      if (emailAddress) {
        mailgun.messages().send(
          confirmRSVP(req.body.guestName, req.body.numberAttending, req.body.isAttending),
          (err, body) => console.log(err || body));
      }
      console.log(rsvp);
      res.send(rsvp);
    });

  }

};