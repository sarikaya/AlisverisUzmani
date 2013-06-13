'use strict';

angular.module('asistanApp')
  .directive('ngTap', function () {
    return function (scope, element, attrs) {
      $(element).on("tap", function (ev) {
        scope.$apply(attrs['ngTap']);
      });
    };
  });
