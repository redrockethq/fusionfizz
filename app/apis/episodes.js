"use strict";

var Episode = require('../models/episode')
  , _ = require('lodash')
  ;

module.exports = function (app) {

  app.get('/api/v1/episodes', function (req, res, next) {
    Episode.find({}, function (err, episodes) {
      if (err) {
        next(err);
      } else {
        res.send(200, episodes);
      }
    });

  });

  app.get('/api/v1/episodes/:id', function (req, res, next) {
    Episode.findById(req.params.id, function (err, episode) {
      if (err) {
        next(err);
      } else {
        if (episode)
          res.send(200, episode);
        else
          res.send(404, "Episode not found");
      }
    });
  });

  app.post('/api/v1/episodes', function (req, res, next) {
    var episode = new Episode(req.body);
    episode.save(function (err, episode) {
      if (err) {
        next(err);
      } else {
        res.send(200, episode);
      }
    });
  });

  app.put('/api/v1/episodes/:id', function (req, res, next) {
    var episode = _.omit(req.body, "_id", "__v");
    console.log(episode);
    Episode.findByIdAndUpdate(req.params.id, episode, function (err, episode) {
      if (err) {
        next(err);
      } else {
        if (!episode) {
          res.send(404, "Episode not found");
        } else {
          res.send(200, episode);
        }
      }
    });
  });

};
