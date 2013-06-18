'use strict';

angular.module('asistanApp')
  .controller('ProductCtrl', function ($scope, resp) {
    // the result of $http  (`resp` parameter)
    //  contains .data, .status, .headers, .config
    $scope.productInfo = resp.data.productInfo;
    $scope.prices = resp.data.prices;
  });
