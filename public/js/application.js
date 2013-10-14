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

'use strict';

angular.module('modules', ['core', 'episodes', 'sessions']);
'use strict';
angular.module('admin', []);


'use strict';
angular.module('admin.episodes', [])
  .config(function ($routeProvider) {
    $routeProvider.when('/admin/episodes', { templateUrl: '/app/modules/admin/episodes/views/episodes.html', controller: 'EpisodesCtrl'});
  });
'use strict';

angular.module('core', [])
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
  .config(function ($routeProvider) {

    $routeProvider
      .when('/login', {templateUrl: '/app/modules/sessions/views/login.html', controller: 'loginCtrl'});
    
  });
'use strict';

angular.module('admin.episodes')
  .controller('EpisodesCtrl', function ($scope) {

  });
'use strict';

angular.module('core')
  .controller('HomeCtrl', function ($scope) {

  })
  .controller('LoginCtrl', function ($scope) {

  })
  .controller('ErrorCtrl', function ($scope) {

  });
'use strict';

angular.module('episodes')
  .controller('EpisodesCtrl', function ($scope) {

  })
  .controller('EpisodeCtrl', function ($scope) {

  });
'use strict';

angular.module('sessions')
  .controller('loginCtrl', function ($scope) {

  });