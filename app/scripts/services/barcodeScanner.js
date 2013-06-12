'use strict';

angular.module('asistanApp')
  .factory('barcodeScanner', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
