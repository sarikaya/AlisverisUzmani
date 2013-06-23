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
          resp: ['$route', '$http', 'geolocation', function ($route, $http, geolocation) {
            var barcode = $route.current.params.barcode, long, lat;
            
            geolocation.getCurrentPosition(function (position) {
              // TODO: send these to the server            
              position.coords.longitude,
              position.coords.latitude;
            }, function (error) {
              // TODO: handle error cases
              // error.code == error.PERMISSION_DENIED;
              // error.code == error.POSITION_UNAVAILABLE;
              // error.code == error.TIMEOUT;
            }, {
              "maximumAge": 10*60*1000, // get cached data maximum 10 minute second ago
              "timeout": 1*60*1000 // timeout after 1 minute. which is throw error
            });
            
            // XXX: delete these when send lat, long data to the server
            long = 29.014355;
            lat = 41.022476;
            return $http.post('/product', {
              "barcode": barcode,
              "long": long,
              "lat": lat
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
