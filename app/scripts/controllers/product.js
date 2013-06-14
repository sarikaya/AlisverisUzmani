'use strict';

angular.module('asistanApp')
  .controller('ProductCtrl', function ($scope, $routeParams, data) {
    $routeParams.barcode;
    $scope.productInfo = data.productInfo;
    $scope.prices = data.prices;
  });
