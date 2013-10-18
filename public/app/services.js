'use strict';
angular.module('app')
  .factory('EpisodeService', ['$http',
    function ($http) {

      var episodeBaseUrl = '/api/v1/episodes';

      return {
        all: function () {
          return $http.get(episodeBaseUrl, { tracker: 'waiting' });
        },
        get: function (id) {
          return $http.get(getUrlWithId(id), { tracker: 'waiting' });
        },
        post: function (episode) {
          return $http.post(episodeBaseUrl, episode, { tracker: 'waiting' });
        },
        put: function (id, episode) {
          return $http.put(getUrlWithId(id), episode, { tracker: 'waiting' });
        },
        destroy: function (id) {
          return $http.delete(getUrlWithId(id), { tracker: 'waiting' });
        }
      };

      function getUrlWithId(id) {
        return episodeBaseUrl + "/" + id;
      }
    }])
  .factory('UserService', ['$http',
    function ($http) {

      var usersBaseUrl = '/api/v1/users';
      var userBaseUrl = '/api/v1/user';

      return {
        all: function () {
          return $http.get(usersBaseUrl, { tracker: 'waiting' });
        },
        get: function (id) {
          return $http.get(getUrlWithId(id), { tracker: 'waiting' });
        },
        post: function (episode) {
          return $http.post(usersBaseUrl, episode, { tracker: 'waiting' });
        },
        put: function (id, episode) {
          return $http.put(getUrlWithId(id), episode, { tracker: 'waiting' });
        },
        destroy: function (id) {
          return $http.delete(getUrlWithId(id), { tracker: 'waiting' });
        },
        login: function (email, password) {
          return $http.post(userBaseUrl + "/login", {email: email.toLowerCase(), password: password}, { tracker: 'waiting' });
        },
        forgotPassword: function (email) {
          return $http.post(userBaseUrl + '/forgot-password', { email: email.toLowerCase()}, { tracker: 'waiting' });
        },
        resetPassword: function (token, password) {
          return $http.put(usersBaseUrl + "/" + token + '/reset-password', { password: password }, { tracker: 'waiting' });
        }
      };

      function getUrlWithId(id) {
        return usersBaseUrl + "/" + id;
      }
    }])
  .factory('Services', ['EpisodeService', 'UserService',
    function (EpisodeService, UserService) {
      return {
        episodes: EpisodeService,
        users: UserService
      }
    }]);
