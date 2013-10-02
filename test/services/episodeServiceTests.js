"use strict";

var path = require('path')
  , loader = require('minioc-loader')({
    basePath: path.resolve(__dirname + '../../../'),
    log: {
      info: function (message) {
        console.log(message);
      }
    }
  })
  , _ = require('lodash')
  , async = require('async')
  , minioc = loader.minioc
  , container = minioc.root
  , expect = require('expect.js')
  ;

loader.loadSync(container, './config');
loader.loadSync(container, './app/models');
loader.loadSync(container, './app/services');

describe('EpisodeServices', function () {


  describe('container registration', function () {

    it('db is found in container', function () {
      expect(container.can('db')).to.be(true);
    });

    it('service is found in container', function () {
      expect(container.can('EpisodeServices')).to.be(true);
    });
  });


  describe('saving data', function () {
    beforeEach(function (done) {
      var db = container.get('db');
      expect(db).to.be.ok();

      async.series([
        function (callback) {
          db.use('episodes').collection.delete('episodes', callback);
        },
        function (callback) {
          db.use('episodes').collection.create('episodes', callback);
        }
      ], done);
    });

    it('should be able to save an episode', function () {

      var episode = container.get('Episode', { opts: { name: "The best episode ever", description: "This is the best episode ever."} });
      expect(episode).to.be.ok();

      var episodeServices = container.get('EpisodeServices');
      expect(episodeServices).to.be.ok();

      episodeServices.all(function (err, episodes) {
        expect(episodes.length).to.be(0);
      })


      episodeServices.save(episode, function (err, episode) {
        if (err) {
          console.log(err);
          expect.fail();
        }
        expect(episode).to.be.ok();
      });

      episodeServices.all(function (err, episodes) {
        expect(episodes.length).to.be(1);
      });


    });
  });

});