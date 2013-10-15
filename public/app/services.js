'use strict';
angular.module('app')
  .factory('EpisodeService', ['$http',
    function ($http) {

      var episodeBaseUrl = '/api/v1/episodes';

      return {
        all: function () {
          return $http.get(episodeBaseUrl);
        },
        get: function (id) {
          return $http.get(getUrlWithId(id));
        },
        post: function (episode) {
          return $http.post(episodeBaseUrl, episode);
        },
        put: function (id, episode) {
          return $http.put(getUrlWithId(id), episode);
        },
        destroy: function (id) {
          return $http.delete(getUrlWithId(id));
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
          return $http.get(usersBaseUrl);
        },
        get: function (id) {
          return $http.get(getUrlWithId(id));
        },
        post: function (episode) {
          return $http.post(usersBaseUrl, episode);
        },
        put: function (id, episode) {
          return $http.put(getUrlWithId(id), episode);
        },
        destroy: function (id) {
          return $http.delete(getUrlWithId(id));
        },
        login: function (email, password) {
          return $http.post(userBaseUrl + "/login", {email: email.toLowerCase(), password: password});
        },
        forgotPassword: function (email) {
          return $http.post(userBaseUrl + '/forgot-password', { email: email.toLowerCase()});
        },
        resetPassword: function (token, password) {
          return $http.put(usersBaseUrl + "/" + token + '/reset-password', { password: password });
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
