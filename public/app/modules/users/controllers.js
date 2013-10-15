'use strict';
angular.module('users')
  .controller('RegistrationCtrl', ['$scope',
    function ($scope) {
      $scope.user = {};

      $scope.register = function () {
        $scope.api.users.post($scope.user)
          .success(function (res, status) {
            if (status === 200) {
              $scope.$cookies.token = res.token;
              $scope.currentUser = res;
              $scope.flashr.later.success("Account was created successful");
              $scope.$window.location.href = "/";
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

    }])
  .controller('ForgotPasswordCtrl', ['$scope',
    function ($scope) {
      $scope.resetPassword = function () {
        $scope.api.users.forgotPassword($scope.user.email)
          .success(function (res, status) {
            if (status === 200) {
              $scope.flashr.now.success('Please check your email a reset link has been sent to ' + $scope.user.email);
            }
          })
          .error(function (req, status) {
            if (status === 404) {
              $scope.flashr.now.error('Email Address not found.  Please try another email address or register.');
            } else {
              $scope.flashr.now.error('An unknown error occurred.  Please try again or contact support.');
            }
          })
      };
    }])
  .controller('ResetPasswordCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
      $scope.api.users.get($routeParams.token)
        .success(function (res, status) {
          if (status === 200) {
            $scope.user = res;
          }
        })
        .error(function (res, status) {
          if (status === 404) {
            $scope.flashr.later.error('There was an issue getting your user account.  Please try again.');
            $scope.$location.path('/users/forgot-password');
          } else {
            $scope.flashr.later.error('Unknown error.  Please try again');
            $scope.$location.path('/');
          }
        });

      $scope.passwordIsValid = function () {
        if ($scope.user && $scope.user.password)
          return $scope.user.password === $scope.user.passwordConfirmation;
        else
          return false;
      }

      $scope.resetPassword = function () {
        $scope.api.users.resetPassword($routeParams.token, $scope.user.password)
          .success(function (res, status) {
            if (status === 200) {
              $scope.flashr.later.success('Please login to continue.');
              $scope.$location.path('/');
            }
          })
          .error(function (res, status) {
            if (status === 404) {
              $scope.flashr.later.error('There was an issue getting your user account.  Please try again.');
              $scope.$location.path('/users/forgot-password');
            } else {
              $scope.flashr.later.error('Unknown error.  Please try again');
              $scope.$location.path('/');
            }
          });
      }


    }])
  .controller('UpdateProfileCtrl', ['$scope',
    function ($scope) {
      $scope.api.users.get($scope.storage.get('token'))
        .success(function (res, status) {
          $scope.user = res;
        });

      $scope.updateProfile = function () {


      };

      $scope.passwordIsValid = function () {
        if ($scope.user.password) {
          return $scope.user.password === $scope.user.passwordConfirmation;
        } else {
          return true;
        }
      }

    }]);