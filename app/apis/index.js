'use strict';


module.exports = function (app) {
  var episodes = require('./episodes')(app)
    , users = require('./users')(app)
    ;
};