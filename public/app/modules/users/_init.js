'use strict';

angular.module('users', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/users/new', {templateUrl: '/app/modules/users/views/new.html', controller: 'RegistrationCtrl'})
      .when('/users/edit', {templateUrl: '/app/modules/users/views/edit.html', controller: 'UpdateProfileCtrl'})
      .when('/users/forgot-password', {templateUrl: '/app/modules/users/views/forgotPassword.html', controller: 'ForgotPasswordCtrl'})
      .when('/users/reset-password/:token', {templateUrl: '/app/modules/users/views/resetPassword.html', controller: 'ResetPasswordCtrl'});
  }]);