'use strict';

express = require('express')
fs = require('fs')
path = require('path')
loader = require('minioc-loader')
env = process.env.NODE_ENV || 'development'
app = express()
minioc = loader.minioc
container = minioc.root

loader(
  basePath: __dirname,
  log:
    info: (message) ->
      console.log(message)
)


minioc.fulfill('main', ($app) ->
  port = process.env.port || 3000
  $app.listen port
  console.log "App started on port #{port}"
)

container.register('app').as.value(app)

loader.loadSync(container, './config')