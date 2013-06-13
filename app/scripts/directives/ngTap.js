'use strict';

angular.module('asistanApp')
  .directive('ngTap', function () {
    return function (scope, element, attrs) {
      // FIXME: bind tap events for ios/safari 300ms delay
      element.bind("click", function (ev) {
        scope.$apply(attrs['ngTap']);
      });
    };
  });
