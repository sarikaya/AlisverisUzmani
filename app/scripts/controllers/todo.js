'use strict';

angular.module('asistanApp')
  .controller('TodoCtrl', function ($scope) {
     $scope.todos = [{"text": "Süt"}, {"text": "Yumurta"}, {"text": "Bal"}];

     $scope.addTodo = function() {
       $scope.todos.push({"text": $scope.todoInput});
       $scope.todoInput = '';
     };

     $scope.removeTodo = function (index) {
       $scope.todos.splice(index, 1);
     };
  });
