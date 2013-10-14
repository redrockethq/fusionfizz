'use strict';
var mongoose = require('mongoose')
  , nconf = require('nconf').file({ file: 'config/settings.json'}).env()
  ;


var dbUrl = nconf.get('db')
mongoose.connect(dbUrl);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Database connected successfully to " + dbUrl);
});


module.exports = db;