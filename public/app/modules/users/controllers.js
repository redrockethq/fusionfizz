'use strict';
angular.module('users')
  .controller('RegistrationCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
      $scope.user = {};

      $scope.register = function () {
        $scope.api.users.post($scope.user)
          .success(function (res, status) {
            if (status === 200) {
              $rootScope.currentUser = res;
              $scope.$cookies.token = res.token;
              $scope.$location.path('/episodes');
              $scope.flashr.later.error("There was an error creating your account.");
            } else {
              $scope.flashr.now.error("There was an error creating your account.");
            }
          })
          .error(function (res, status) {
            if (status === 400) {
              $scope.flashr.now.error('Email address is already registered.  Please try another email address or login.');
            } else {
              $scope.flashr.now.error("There was an error created your account.");
            }
          });
      };

      $scope.passwordIsValid = function () {
        return $scope.user.password === $scope.user.passwordConfirmation;
      }
    }])
  .controller('UserCtrl', ['$scope',
    function ($scope) {

    }]);