'use strict';

const nconf = require('nconf');
const mailgun = require('mailgun-js')({
  apiKey: process.env.mailgun || nconf.get('server:mailgun'),
  domain: 'mail.leighandmichael.com'
});

const adminEmailAddresses = process.env.adminEmail || nconf.get('server:adminEmail');


module.exports = {};