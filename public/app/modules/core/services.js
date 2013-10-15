'use strict';
angular.module('core')
  .factory('utility', ['$scope',
    function ($scope) {

    }])
  .factory('storage', ['$cookieStore',
    function ($cookieStore) {
      return {
        get: function (key) {
          var cookie = $cookieStore.get(key);
          if (cookie) {
            return cookie.token;
          } else {
            return null;
          }
        },
        save: function (key, data) {
          if (key === 'token') {
            $cookieStore.put(key, {token: data});
          } else {
            $cookieStore.put(key, data);
          }
        },
        remove: function (key) {
          $cookieStore.remove(key);
        }
      }
    }]);