'use strict';

angular.module('asistanApp').factory('barcodeScanner', function ($rootScope, deviceReady) {
    return {
        scan: deviceReady(function (onSuccess, onError) {
            var scanner = cordova.require('cordova/plugin/BarcodeScanner');
            scanner.scan(function () {
                var that = this,
                    args = arguments;

                if (onSuccess) {
                    $rootScope.safeApply(function () {
                        onSuccess.apply(that, args);
                    });
                }
            }, function () {
                var that = this,
                    args = arguments;
                if (onError) {
                    $rootScope.safeApply(function () {
                        onError.apply(that, args);
                    });
                }
            });
        })
    };
});
