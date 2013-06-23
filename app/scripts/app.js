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
          resp: ['$route', '$http', '$q', 'geolocation', function ($route, $http, $q, geolocation) {
            var barcode = $route.current.params.barcode, long, lat;
            var deferred = $q.defer();
            
            geolocation.getCurrentPosition(function (position) {
              deferred.resolve({
                "long": position.coords.longitude,
                "lat": position.coords.latitude
              });
            }, function (error) {
              // TODO: handle error cases
              // error.code == error.PERMISSION_DENIED;
              // error.code == error.POSITION_UNAVAILABLE;
              // error.code == error.TIMEOUT;
              // deferred.reject();
            }, {
              "maximumAge": 10*60*1000, // get cached data maximum 10 minute second ago
              "timeout": 1*60*1000 // timeout after 1 minute. which is throw error
            });
            
            return deferred.promise.then(function(coords) {
                return $http.post('/product', {
                  "barcode": barcode,
                  "long": coords.long,
                  "lat": coords.lat
                });
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

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $.ui.showMask('Lütfen bekleyiniz');
    });
    
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
        $.ui.hideMask();
    });
    
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        console.log("ROUTE CHANGE ERROR: " + rejection);
    });

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
