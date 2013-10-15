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

'use strict';

angular.module('modules', ['admin', 'core', 'episodes', 'users', 'sessions']);
'use strict';
angular.module('admin', ['admin.episodes']);


'use strict';
angular.module('admin.episodes', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin/episodes', { templateUrl: '/app/modules/admin/episodes/views/episodes.html', controller: 'AdminEpisodesCtrl'})
      .when('/admin/episodes/new', { templateUrl: '/app/modules/admin/episodes/views/new.html', controller: 'AdminNewEpisodeCtrl'})
      .when('/admin/episodes/:id/edit', { templateUrl: '/app/modules/admin/episodes/views/edit.html', controller: 'AdminEditEpisodeCtrl'})
    ;
  });
'use strict';

angular.module('core', ['ui'])
  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', { controller: 'HomeCtrl', templateUrl: '/app/modules/core/views/home.html' })
      .when('/404', { controller: 'ErrorCtrl', templateUrl: '/app/modules/core/views/404.html' })
      .when('/login', { controller: 'HomeCtrl', templateUrl: '/app/modules/core/views/login.html' })
      .otherwise({ redirectTo: '/404' });

  }]);
'use strict';

angular.module('episodes', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/episodes', { controller: 'EpisodesCtrl', templateUrl: '/app/modules/episodes/views/episodes.html'})
      .when('/episodes/:slug', { controller: 'EpisodeCtrl', templateUrl: '/app/modules/episodes/views/episode.html'});
  });

'use strict';

angular.module('sessions', [])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/logout', { templateUrl: '/app/modules/sessions/views/logout.html', controller: 'LogoutCtrl' });
    }]);
'use strict';

angular.module('users', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/users/new', {templateUrl: '/app/modules/users/views/new.html', controller: 'RegistrationCtrl'})
      .when('/users/edit', {templateUrl: '/app/modules/users/views/edit.html', controller: 'UpdateProfileCtrl'})
      .when('/users/forgot-password', {templateUrl: '/app/modules/users/views/forgotPassword.html', controller: 'ForgotPasswordCtrl'})
      .when('/users/reset-password/:token', {templateUrl: '/app/modules/users/views/resetPassword.html', controller: 'ResetPasswordCtrl'});
  }]);
'use strict';

angular.module('admin.episodes')
  .controller('AdminEpisodesCtrl', ['$scope',
    function ($scope) {

      $scope.api.episodes.all()
        .success(function (res, status) {
          if (status == 200) {
            $scope.episodes = res;
          } else {
            $scope.flashr.now.error('There was an error');
          }
        });

    }])
  .controller('AdminNewEpisodeCtrl', ['$scope',
    function ($scope) {
      $scope.episode = {};

      $scope.save = function () {
        $scope.api.episodes.post($scope.episode)
          .success(function (res, status) {
            if (status === 200) {
              $scope.flashr.later.success('Episode was created successfully!');
              $scope.$location.path('/admin/episodes');
            } else {
              $scope.flashr.now.error('There was an error');
            }
          });
      };

    }])
  .controller('AdminEditEpisodeCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
      $scope.api.episodes.get($routeParams.id)
        .success(function (req, status) {
          if (status === 200) {
            $scope.episode = req;
          } else {
            $scope.flashr.now.error('There was an error');
          }
        });

      $scope.save = function () {
        $scope.api.episodes.put($routeParams.id, $scope.episode)
          .success(function (res, status) {
            if (status === 200) {
              $scope.flashr.later.success('Episode was upated successfully!');
              $scope.$location.path('/admin/episodes');
            } else {
              $scope.flashr.now.error('There was an error');
            }
          });
      };
    }]);
'use strict';

angular.module('core')
  .controller('HomeCtrl', function ($scope) {

  })
  .controller('ErrorCtrl', function ($scope) {

  })
  .controller('AppCtrl', ['$scope', '$modal',
    function ($scope, $modal) {
      $scope.login = function () {
        var modalInstance = $modal.open({
          templateUrl: '/app/modules/sessions/views/login.html',
          controller: 'LoginCtrl'
        });

        modalInstance.result
          .then(function (user) {
            $scope.flashr.later.success('Login was successful!');
            $scope.$window.location.href = "/";
          });
      }
    }]);
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
'use strict';
angular.module('ui', ['flashr', 'ui.bootstrap']);
'use strict';

angular.module('episodes')
  .controller('EpisodesCtrl', function ($scope) {

  })
  .controller('EpisodeCtrl', function ($scope) {

  });
'use strict';

angular.module('sessions')
  .controller('LoginCtrl', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

      $scope.user = {};
      $scope.loginUser = function () {

        $scope.api.users.login($scope.user.email, $scope.user.password)
          .success(function (res, status) {
            if (status === 200) {
              $modalInstance.close(res);
              $scope.storage.save('token', res.token);
              $scope.currentUser = res;
            } else {
              $scope.flashr.now.error('There was an error');
            }
          })
          .error(function (req, status) {
            if (status === 400) {
              $scope.flashr.now.error('Wrong username or password');
            } else {
              $scope.flashr.now.error('There was an error');
            }
          });
      }

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };


      $scope.forgotPassword = function () {
        $modalInstance.dismiss('cancel');
        $scope.$location.path('/users/forgot-password');
      };

      $scope.register = function () {
        $modalInstance.dismiss('cancel');
        $scope.$location.path('/users/new');
      };

    }])
  .controller('LogoutCtrl', ['$scope', '$cookieStore',
    function ($scope, $cookieStore) {
      $cookieStore.remove('token');
      $scope.$window.location.href = "/";
    }]);
'use strict';
angular.module('users')
  .controller('RegistrationCtrl', ['$scope',
    function ($scope) {
      $scope.user = {};

      $scope.register = function () {
        $scope.api.users.post($scope.user)
          .success(function (res, status) {
            if (status === 200) {
              $scope.$cookies.token = res.token;
              $scope.currentUser = res;
              $scope.flashr.later.success("Account was created successful");
              $scope.$window.location.href = "/";
            } else {
              $scope.flashr.now.error("There was an error creating your account.");
            }
          })
          .error(function (res, status) {
            if (status === 400) {
              $scope.flashr.now.error('Email address is already registered.  Please try another email address or login.');
            } else {
              $scope.flashr.now.error("There was an error created your account.");
            }
          });
      };

      $scope.passwordIsValid = function () {
        return $scope.user.password === $scope.user.passwordConfirmation;
      }
    }])
  .controller('UserCtrl', ['$scope',
    function ($scope) {

    }])
  .controller('ForgotPasswordCtrl', ['$scope',
    function ($scope) {
      $scope.resetPassword = function () {
        $scope.api.users.forgotPassword($scope.user.email)
          .success(function (res, status) {
            if (status === 200) {
              $scope.flashr.now.success('Please check your email a reset link has been sent to ' + $scope.user.email);
            }
          })
          .error(function (req, status) {
            if (status === 404) {
              $scope.flashr.now.error('Email Address not found.  Please try another email address or register.');
            } else {
              $scope.flashr.now.error('An unknown error occurred.  Please try again or contact support.');
            }
          })
      };
    }])
  .controller('ResetPasswordCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
      $scope.api.users.get($routeParams.token)
        .success(function (res, status) {
          if (status === 200) {
            $scope.user = res;
          }
        })
        .error(function (res, status) {
          if (status === 404) {
            $scope.flashr.later.error('There was an issue getting your user account.  Please try again.');
            $scope.$location.path('/users/forgot-password');
          } else {
            $scope.flashr.later.error('Unknown error.  Please try again');
            $scope.$location.path('/');
          }
        });

      $scope.passwordIsValid = function () {
        if ($scope.user && $scope.user.password)
          return $scope.user.password === $scope.user.passwordConfirmation;
        else
          return false;
      }

      $scope.resetPassword = function () {
        $scope.api.users.resetPassword($routeParams.token, $scope.user.password)
          .success(function (res, status) {
            if (status === 200) {
              $scope.flashr.later.success('Please login to continue.');
              $scope.$location.path('/');
            }
          })
          .error(function (res, status) {
            if (status === 404) {
              $scope.flashr.later.error('There was an issue getting your user account.  Please try again.');
              $scope.$location.path('/users/forgot-password');
            } else {
              $scope.flashr.later.error('Unknown error.  Please try again');
              $scope.$location.path('/');
            }
          });
      }


    }])
  .controller('UpdateProfileCtrl', ['$scope',
    function ($scope) {
      $scope.api.users.get($scope.storage.get('token'))
        .success(function (res, status) {
          $scope.user = res;
        });

      $scope.updateProfile = function () {


      };

      $scope.passwordIsValid = function () {
        if ($scope.user.password) {
          return $scope.user.password === $scope.user.passwordConfirmation;
        } else {
          return true;
        }
      }

    }]);
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
