'use strict';

angular.module('asistanApp')
  .factory('storage', function () {
    return {
      get: function (key) {
             return angular.fromJson(window.localStorage.getItem(key) || 'false');
      },
      set: function (key, value) {
             window.localStorage.setItem(key, angular.toJson(value));
      },
      remove: function (key) {
                window.localStorage.removeItem(key);
      }
    };
  });
