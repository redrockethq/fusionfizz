'use strict';

angular.module('core', ['ui'])
  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', { controller: 'HomeCtrl', templateUrl: '/app/modules/core/views/home.html' })
      .when('/404', { controller: 'ErrorCtrl', templateUrl: '/app/modules/core/views/404.html' })
      .when('/login', { controller: 'HomeCtrl', templateUrl: '/app/modules/core/views/login.html' })
      .otherwise({ redirectTo: '/404' });

  }]);