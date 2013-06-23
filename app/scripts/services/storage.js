'use strict';

angular.module('asistanApp')
  .factory('storage', function (deviceReady) {
    return {
      get: deviceReady(function (key) {
             return angular.fromJson(window.localStorage.getItem(key) || 'false');
      }),
      set: deviceReady(function (key, value) {
             window.localStorage.setItem(key, angular.toJson(value));
      }),
      remove: deviceReady(function (key) {
                window.localStorage.removeItem(key);
      })
    };
  });
