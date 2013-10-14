'use strict';

toastr.options = {
  "debug": false,
  "positionClass": "toast-top-full-width",
  "onclick": null,
  "fadeIn": 300,
  "fadeOut": 1000,
  "timeOut": 0,
  "extendedTimeOut": 0
}

angular.module('app', ['ngRoute', 'ngCookies', 'modules'])
  .config(function ($locationProvider) {
    $locationProvider.hashPrefix("!");
  })
  .run(['$rootScope', '$location', '$cookies', 'Services', 'flashr',
    function ($rootScope, $location, $cookies, services, flashr) {
      $rootScope.api = services;
      $rootScope.flashr = flashr;
      $rootScope.$location = $location;
      $rootScope.$cookies = $cookies;

      if ($cookies.token) {
        services.users.get($cookies.token).success(function (req, status) {
          if (status === 200) {
            $rootScope.currentUser = req;
          }
        })
      }

    }]);
