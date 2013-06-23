'use strict';

angular.module('asistanApp')
  .controller('ScannerCtrl', function ($scope, $location, barcodeScanner) {
    function onScanError(error) {
      // TODO: when there is a error, redirect user to the search page for 
      // searching barcode no or name of product
      return {}
    }  
    barcodeScanner.scan(function(barcode) {
      if (barcode.cancelled) {
          onScanError();
      } else {
        // TODO: use barcode.text. maybe barcode.format
        $location.path('/product/' + barcode.text);
      }
    }, onScanError);
  });
