'use strict';

angular.module('asistanApp')
  .controller('ProductCtrl', function ($scope, $routeParams, $location, barcodeScanner, resp) {
  
    if ($routeParams.barcode === "scanitnow") {
    
      function onScanError(error) {
        // TODO: when there is a error, redirect user to the search page for 
        // searching barcode no or name of product
      }
      
      barcodeScanner.scan(function(barcode) {
      
        if (barcode.cancelled) {
          onScanError();
        } else {
          // TODO: use barcode.text. maybe barcode.format
          $location.path('/product/' + barcode.text).replace();
        }
      }, onScanError);
    
    } else {
    
      // the result of $http  (`resp` parameter)
      // contains .data, .status, .headers, .config
      $scope.productInfo = resp.data.productInfo;
      $scope.prices = resp.data.prices;
    }
  });
