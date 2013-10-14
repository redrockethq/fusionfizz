'use strict';

angular.module('admin.episodes')
  .controller('AdminEpisodesCtrl', ['$scope',
    function ($scope) {

      $scope.api.episodes.all()
        .success(function (res, status) {
          if (status == 200) {
            $scope.episodes = res;
          } else {
            $scope.flashr.now.error('There was an error');
          }
        });

    }])
  .controller('AdminNewEpisodeCtrl', ['$scope',
    function ($scope) {
      $scope.episode = {};

      $scope.save = function () {
        $scope.api.episodes.post($scope.episode)
          .success(function (res, status) {
            if (status === 200) {
              $scope.flashr.later.success('Episode was created successfully!');
              $scope.$location.path('/admin/episodes');
            } else {
              $scope.flashr.now.error('There was an error');
            }
          });
      };

    }])
  .controller('AdminEditEpisodeCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
      $scope.api.episodes.get($routeParams.id)
        .success(function (req, status) {
          if (status === 200) {
            $scope.episode = req;
          } else {
            $scope.flashr.now.error('There was an error');
          }
        });

      $scope.save = function () {
        $scope.api.episodes.put($routeParams.id, $scope.episode)
          .success(function (res, status) {
            if (status === 200) {
              $scope.flashr.later.success('Episode was upated successfully!');
              $scope.$location.path('/admin/episodes');
            } else {
              $scope.flashr.now.error('There was an error');
            }
          });
      };
    }]);