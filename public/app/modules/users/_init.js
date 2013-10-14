'use strict';

angular.module('users', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/users/new', {templateUrl: '/app/modules/users/views/new.html', controller: 'RegistrationCtrl'})
      .when('/users/forgot-password', {templateUrl: '/app/modules/users/views/forgotPassword.html', controller: 'ForgotPasswordCtrl'});
  }]);