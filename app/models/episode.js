"use strict";
var _ = require('lodash')
  , dbc = require('dbc.js')
  ;


function Episode(attrs) {
  dbc([!attrs, attrs.name], "Name is required");
  this.name = attrs.name;

}

module.exports = function $init() {
  this.register('Episode').as.ctor(Episode);
};




