'use strict';

toastr.options = {
  "debug": false,
  "positionClass": "toast-top-full-width",
  "onclick": null,
  "fadeIn": 300,
  "fadeOut": 1000,
  "timeOut": 10000,
  "extendedTimeOut": 1000
}

angular.module('app', ['ngRoute', 'modules'])
  .config(function ($locationProvider) {
    $locationProvider.hashPrefix("!");
  });
