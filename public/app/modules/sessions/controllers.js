'use strict';

angular.module('sessions')
  .controller('LoginCtrl', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

      $scope.user = {};
      $scope.loginUser = function () {

        $scope.api.users.login($scope.user.email, $scope.user.password)
          .success(function (res, status) {
            if (status === 200) {
              $modalInstance.close(res);
              $scope.storage.save('token', res.token);
              $scope.currentUser = res;
            } else {
              $scope.flashr.now.error('There was an error');
            }
          })
          .error(function (req, status) {
            if (status === 400) {
              $scope.flashr.now.error('Wrong username or password');
            } else {
              $scope.flashr.now.error('There was an error');
            }
          });
      }

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };


      $scope.forgotPassword = function () {
        $modalInstance.dismiss('cancel');
        $scope.$location.path('/users/forgot-password');
      };

      $scope.register = function () {
        $modalInstance.dismiss('cancel');
        $scope.$location.path('/users/new');
      };

    }])
  .controller('LogoutCtrl', ['$scope', '$cookieStore',
    function ($scope, $cookieStore) {
      $cookieStore.remove('token');
      $scope.$window.location.href = "/";
    }]);