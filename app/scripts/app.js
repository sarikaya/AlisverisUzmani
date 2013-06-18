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
          data: ['$route', '$http', 'barcodeScanner', function ($route, $http, barcodeScanner) {
            var barcodeParam = $route.current.params.barcode;

            function onScanError(error) {
              // TODO: when there is a error, redirect user to the search page for 
              // searching barcode no or name of product
            }
            // FIXME: when tapping to the scan again in the scan cause problems
            if (barcodeParam === "scanitnow") {
              barcodeScanner.scan(function(barcode) {
              
                if (barcode.cancelled) {
                  onScanError();
                }

                // TODO: use barcode.text. maybe barcode.format
                barcodeParam = barcode.text;
              }, onScanError);
            }

            // TODO: get geolocation fast (using some geolocation 30 min timeout cache)
            // TODO: get the response promise by using barcodeParam, geolocatin etc...
            // TODO: use resource e2e for faking(mocking) server. move all the response data to the e2e(in the develop.js) // its hard to achieve, forget it. use development server or production server
            // TODO: is resource called in every route change? or only once in the ctrlr

            return $http.post('/product', {/*request data*/});
          }]
        }
      })
      .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl',
        resolve: {
          todos: function () {
            // TODO: return from localstorage, and inject localstorage to the TodoCtrl
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
