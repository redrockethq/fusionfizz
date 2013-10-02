'use strict';

var path = require('path')
  , loader = require('minioc-loader')({basePath: path.resolve(__dirname + '../../../') })
  , minioc = loader.minioc
  , container = minioc.root
  , expect = require('expect.js')
  ;

loader.loadSync(container, './app/models');

describe('Episode', function () {
  describe('container registration', function () {

    it('should have an Episode registered', function () {
      expect(container.can('Episode')).to.be(true);
    });

  });

  describe('the model', function () {
    var blahEpisode = container.get('Episode', { opts: { name: "Blah", description: "Blah2" }});

    it('has a title', function () {
      expect(blahEpisode.name).to.be("Blah");

      var funEpisode = container.get('Episode');
      funEpisode.name = "Fun";
      expect(funEpisode.name).to.be("Fun");

    });

    it('has a description', function () {
      expect(blahEpisode.description).to.be('Blah2');

      var funEpisode = container.get('Episode');
      funEpisode.name = "Fun";
      funEpisode.description = "Fun Description";
      expect(funEpisode.description).to.be("Fun Description");

    });
  });
});