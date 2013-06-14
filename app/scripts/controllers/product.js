'use strict';

angular.module('asistanApp')
  .controller('ProductCtrl', function ($scope, data) {
    $scope.productInfo = data.productInfo;
    $scope.prices = data.prices;
  });
