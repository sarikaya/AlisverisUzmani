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
          resp: ['$route', '$http', 'barcodeScanner', function ($route, $http, barcodeScanner) {
            var barcodeParam = $route.current.params.barcode;
            
            function onScanError(error) {
              // TODO: when there is a error, redirect user to the search page for 
              // searching barcode no or name of product
              return {}
            }
            // FIXME: route is not change again
            if (barcodeParam === "scanitnow") {              
              barcodeScanner.scan(function(barcode) {
              
                if (barcode.cancelled) {
                  onScanError();
                } else {
                  // TODO: use barcode.text. maybe barcode.format
                  barcodeParam = barcode.text;
                }
              }, onScanError);
            }
            // TODO: send barcode.text as a barcode property of requests
            // TODO: get geolocation fast (using some geolocation 30 min timeout cache)
            // TODO: send barcode.text, lat, long data to the server
            return $http.post('/product', {
              "barcode": '1',
              "long": 29.014355,
              "lat": 41.022476
            });

          }]
        }
      })
      .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl',
        resolve: {
          todos: function () {
            // TODO: return from localstorage, and inject localstorage to the
            //       TodoCtrl for deleting and adding
            return [{"text": "Süt"}, {"text": "Yumurta"}, {"text": "Bal"}]; 
          }
        }
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
