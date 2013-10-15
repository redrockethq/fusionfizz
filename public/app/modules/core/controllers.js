'use strict';

angular.module('core')
  .controller('HomeCtrl', function ($scope) {

  })
  .controller('ErrorCtrl', function ($scope) {

  })
  .controller('AppCtrl', ['$scope', '$modal',
    function ($scope, $modal) {
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