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
        controller: 'ProductCtrl',
        resolve: {
          data: function () {
            var resp = {};
            resp.productInfo = {
	          "imageSrc": "img/main.jpg",
              "name": "ÜLKER ÇİKOLATALI GOFRET 38 GR"
            };
            
            resp.prices = [
	          {"chainName": "BİM", "branchName": "Bulgurlu", "price": 0.45, "here": true},
  	          {"chainName": "A 101", "branchName": "Bulgurlu", "price": 0.45},
	          {"chainName": "Şok", "branchName": "Bulgurlu", "price": 0.57}
            ];

            return resp;
          }
        }
      })
      .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl',
        resolve: {
          todos: function () {
            return [{"text": "Süt"}, {"text": "Yumurta"}, {"text": "Bal"}]; 
          }
        }
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
    
  });


// TODO: add this to new scanner controller that run in the everytime or use as a resolver ... at /scan
function a($scope, $location, barcodeScanner) {

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
      
}
