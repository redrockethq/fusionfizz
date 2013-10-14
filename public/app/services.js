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

      var userBaseUrl = '/api/v1/users';

      return {
        all: function () {
          return $http.get(userBaseUrl);
        },
        get: function (id) {
          return $http.get(getUrlWithId(id));
        },
        post: function (episode) {
          return $http.post(userBaseUrl, episode);
        },
        put: function (id, episode) {
          return $http.put(getUrlWithId(id), episode);
        },
        destroy: function (id) {
          return $http.delete(getUrlWithId(id));
        },
        login: function (email, password) {
          return $http.post(userBaseUrl + "/login", {email: email.toLowerCase(), password: password});
        }
      };

      function getUrlWithId(id) {
        return userBaseUrl + "/" + id;
      }
    }])
  .factory('Services', ['EpisodeService', 'UserService',
    function (EpisodeService, UserService) {
      return {
        episodes: EpisodeService,
        users: UserService
      }
    }]);
