'use strict';
var nodemailer = require('nodemailer')
  , nconf = require('nconf').file({ file: 'config/settings.json'}).env()
  ;


var transport = nodemailer.createTransport('SendGrid', {
  auth: {
    user: nconf.get('sendgrid_username'),
    pass: nconf.get('sendgrid_password')
  }
});

module.exports = {
  forgotPassword: function (user) {
    transport.sendMail({
      from: 'fusionfizz@redrockethq.com',
      to: user.email,
      subject: 'Forgot Password',
      text: 'Please click on this link to reset your password:  http://www.fusionfizz.com/#!/users/reset-password/' + user.token
    });
  },
  signup: function(user){
    transport.sendMail({
      from: 'fusionfizz@redrockethq.com',
      to: user.email,
      subject: 'Thank You',
      text: 'Thanks for signing up.  We look forward to increasing your knowledge, and most importantly having fun.  If you have any questions, feel free to ping us at fusionfizz@redrockethq.com.'
    });
  }

};
