'use strict';

angular.module('episodes')
  .controller('EpisodesCtrl', function ($scope) {
    $scope.api.episodes.all()
      .success(function (episodes, status) {
        $scope.episodes = episodes;
      });
  })
  .controller('EpisodeCtrl', function ($scope, $routeParams) {
    $scope.api.episodes.get($routeParams.id)
      .success(function (episode, status) {
        $scope.episode = episode;
      });
  });