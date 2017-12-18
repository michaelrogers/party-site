
const nconf = require('nconf');
const rsvp = require('../models/rsvp');

const mailgun = require('mailgun-js')({
  apiKey: process.env.mailgun || nconf.get('server:mailgun'),
  domain: 'mail.michaelandleigh.com'
});

const adminEmailAddresses = process.env.adminEmail || nconf.get('server:adminEmail');
const newRSVPEmail = (guestName, numberAttending, isAttending) => {
  const toAddress = adminEmailAddresses || '<mhrogers12@gmail.com>';
  return {
    from: 'MichaelandLeigh <mail@michaelandleigh.com>',
    to: toAddress,
    subject: `${guestName} RSVP'd`,
    html: `
      <p>${guestName} just RVSP'd that they ${isAttending ? 'are' : 'are not'} with ${numberAttending} in their party.</p>
    `
  };
};
const confirmRSVPEmail = (guestName, numberAttending, _isAttending, emailAddress) => {
  return {
    from: 'MichaelandLeigh <mail@michaelandleigh.com>',
    to: emailAddress,
    subject: "We've received your RSVP",
    html: `
      <p>Hi ${guestName},</p>
      <p>Thanks for RSVP'ing, we have you down for ${numberAttending}. Please let us know if your plans change.</p>
      <br/>
      <div>EVENT DATE</div>
      <div>
        <div>January 20th, 2018</div>
        <div>7:00 PM</div>
      </div>
      <br/>
      <div>LOCATION</div>
      <div>
        <div><em>Sharespace Warehouse</em></div>
        <div>2203 Preston Street</div>
        <div>Houston, TX</div>
      </div>
      <br/>
      <p>Can't wait to see you there,</p>
      <p>Michael & Leigh</p>
    `
  };
};

module.exports = {
  submit: async function(req, res, next) {
    const numberAttending = parseInt(req.body.number, 10) || 0;
    const emailAddress = req.body.email;
    const guestName = req.body.name;
    const isAttending = numberAttending > 0;
    const newRSVP = new rsvp({
      guestName: guestName,
      email: emailAddress,
      isAttending: isAttending,
      numberAttending: numberAttending,
      notes: req.body.note
    });
    await newRSVP.save();
      await mailgun.messages().send(
        newRSVPEmail(guestName, numberAttending, isAttending));

      if (emailAddress) {
        await mailgun.messages().send(
          confirmRSVPEmail(guestName, numberAttending, isAttending, emailAddress)
        );
      }
      res.send(rsvp);
  }

};
