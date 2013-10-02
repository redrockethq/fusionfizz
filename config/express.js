'use strict';

var express = require('express')
  ;

module.exports = function $init($app, $config) {
  console.log("Setting up express.js");

  $app.set('showStackError', true);
  $app.use(express.favicon());
  $app.use(express.bodyParser());
  $app.use(express.methodOverride());
  $app.use(express.compress());

  //Don't use logger for test env
  if (process.env.NODE_ENV !== 'test') {
    $app.use(express.logger('dev'));
  }

//  $app.set("view options", {layout: false});
  $app.set('views', $config.root + '/lib/shared/views');
  $app.set('view engine', 'ejs');
  $app.use(require('less-middleware')({ src: __dirname + '/public' }));
  $app.use(express.static($config.root + '/public'));

  //routes should be at the last
  $app.use($app.router);
};