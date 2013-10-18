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
  .config(function ($locationProvider, $sceProvider) {
    $locationProvider.hashPrefix("!");
    $sceProvider.enabled(false);
  })
  .run(['$rootScope', '$location', '$cookies', '$window', '$http', 'Services', 'flashr', 'storage',
    function ($rootScope, $location, $cookies, $window, $http, services, flashr, storage) {
      $rootScope.api = services;
      $rootScope.flashr = flashr;
      $rootScope.$location = $location;
      $rootScope.$cookies = $cookies;
      $rootScope.$window = $window;
      $rootScope.storage = storage;

      var token = storage.get('token');
      if (token) {
        services.users.get(token)
          .success(function (req, status) {
            if (status === 200) {
              $rootScope.currentUser = req;
              $http.defaults.headers.authorization = token;
            }
          });
      }
    }]);
