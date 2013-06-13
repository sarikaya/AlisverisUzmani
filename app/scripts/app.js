'use strict';

angular.module('asistanApp', [])
  .config(function ($routeProvider) {
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
        controller: 'ProductCtrl'
      })
      .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('asistanApp')
  .run(function ($rootScope, $location, barcodeScanner) {

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

    $rootScope.scan = function() {
    
      function onError(error) {
        // TODO: when there is a error, redirect user to the search page for 
        // searching barcode no or name of product
      }

      barcodeScanner.scan(function(barcode) {
        if (barcode.cancelled) { 
          onError();
        }
        
        // TODO: use barcode.text. maybe barcode.format
        $location.path('/product/' + barcode.text);
      }, onError);
      
    };
  });

