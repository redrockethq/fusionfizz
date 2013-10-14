'use strict';

var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , nconf = require('nconf').file({ file: 'config/settings.json'}).env()
  ;

module.exports = {
  development: {
    db: nconf.get('db'),
    root: rootPath,
    app: {
      name: "Fusion Fizz"
    }
  },
  test: {
    db: "",
    root: rootPath,
    app: {
      name: "Fusion Fizz"
    }
  },
  production: {
    db: nconf.get('db'),
    root: rootPath,
    app: {
      name: "Fusion Fizz"
    }
  }
};