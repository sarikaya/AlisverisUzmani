'use strict';

// TODO: set title in the every route change

angular.module('asistanApp', [])
  .config(function ($routeProvider) {
    // TODO: use locationProvider for html5location
    // TODO: use httpProvider for some http config
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/deals', {
        templateUrl: 'views/deals.html',
        controller: 'DealsCtrl'
      })
      .when('/product/:barcode', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        resolve: { // XXX: use inline annotation temporarily until ngmin implement it
          resp: ['$route', '$http', function ($route, $http) {
            var barcode = $route.current.params.barcode;
            // TODO: get geolocation fast (using some geolocation 30 min timeout cache)
            // TODO: send lat, long data to the server
            return $http.post('/product', {
              "barcode": barcode,
              "long": 29.014355,
              "lat": 41.022476
            });

          }]
        }
      })
      .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl'
      })
      .when('/scanner', {
        templateUrl: 'views/scanner.html',
        controller: 'ScannerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('asistanApp')
  .run(function ($rootScope) {

    // TODO: write loading screen between routechange start and success

    $rootScope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
    
  });
