'use strict';
angular.module('admin.episodes', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin/episodes', { templateUrl: '/app/modules/admin/episodes/views/episodes.html', controller: 'AdminEpisodesCtrl'})
      .when('/admin/episodes/new', { templateUrl: '/app/modules/admin/episodes/views/new.html', controller: 'AdminNewEpisodeCtrl'})
      .when('/admin/episodes/:id/edit', { templateUrl: '/app/modules/admin/episodes/views/edit.html', controller: 'AdminEditEpisodeCtrl'})
    ;
  });