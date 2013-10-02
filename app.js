"use strict";

var express = require('express')
  , app = express()
  , loader = require('minioc-loader')
  , minioc = loader.minioc
  ;


loader({
  basePath: __dirname,
  log: {
    info: function (message) {
      console.log(message);
    }
  }
});

minioc.fulfill('main', function ($app) {
  var port = process.env.port || 3000;
  $app.listen(port);
  console.log("App started on port " + port);
});

minioc.root.register('app').as.value(app)

loader.loadSync(minioc.root, './config');