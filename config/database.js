"use strict";
var arango = require('arango')
  ;

module.exports = function $init(next) {
  var db = arango.Connection('http://localhost:8529');
  this.register('db').as.value(db);

  db.collection.create('episodes');

  next();
};