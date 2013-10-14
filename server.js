"use strict";

var express = require('express')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , app = express()
  , mongoose = require('./config/mongoose')
  ;


app.set('showStackError', true);
app.use(express.favicon());

if (process.env.NODE_ENV !== 'test') {
  app.use(express.logger('dev'));
}

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.compress());
app.use(express.cookieParser());

app.set('views', config.root + '/app/views');
app.set('view engine', 'ejs');
app.use(express.static(config.root + '/public'));

var api = require('./app/apis')(app);
app.use(app.router);


var port = process.env.port || 3000;
app.listen(port);
//console.log(app.routes);
console.log("App started on port " + port);

