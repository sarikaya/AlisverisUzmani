'use strict';

angular.module('asistanApp')
  .controller('ProductCtrl', function ($scope) {
    $scope.productInfo = {
	"imageSrc": "main.jpg",
        "name": "ÜLKER ÇİKOLATALI GOFRET 38 GR"
    };
    $scope.prices = [
	{"chainName": "BİM", "branchName": "Bulgurlu", "price": 0.45, "here": true},
	{"chainName": "A 101", "branchName": "Bulgurlu", "price": 0.45},
	{"chainName": "Şok", "branchName": "Bulgurlu", "price": 0.57}
    ];
  });
