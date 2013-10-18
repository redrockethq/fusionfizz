'use strict';

angular.module('core')
  .controller('HomeCtrl', function ($scope) {
    $scope.api.episodes.all()
      .success(function (episodes) {
        $scope.episodes = episodes;
      });
  })
  .controller('ErrorCtrl', function ($scope) {

  })
  .controller('AppCtrl', ['$scope', '$modal', 'promiseTracker',
    function ($scope, $modal, promiseTracker) {

      $scope.waiting = promiseTracker('waiting');

      $scope.login = function () {
        var modalInstance = $modal.open({
          templateUrl: '/app/modules/sessions/views/login.html',
          controller: 'LoginCtrl'
        });

        modalInstance.result
          .then(function (user) {
            $scope.flashr.later.success('Login was successful!');
            $scope.$window.location.href = "/";
          });
      }
    }]);