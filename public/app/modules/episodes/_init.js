'use strict';

angular.module('episodes', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/episodes', { controller: 'EpisodesCtrl', templateUrl: '/app/modules/episodes/views/episodes.html'})
      .when('/episodes/:slug', { controller: 'EpisodeCtrl', templateUrl: '/app/modules/episodes/views/episode.html'});
  });
