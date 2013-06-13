'use strict';

angular.module('asistanApp')
  .factory('geolocation', function ($rootScope, deviceReady) {
    return {
      getCurrentPosition: deviceReady(function (onSuccess, onError, options) {
        navigator.geolocation.getCurrentPosition(function () {
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
        },
        options);
      })
    };
  });
