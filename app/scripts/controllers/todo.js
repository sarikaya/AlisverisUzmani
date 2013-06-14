'use strict';

angular.module('asistanApp')
  .controller('TodoCtrl', function ($scope, todos) {
     $scope.todos = todos;

     $scope.addTodo = function() {
       if ($scope.todoInput) {
         $scope.todos.push({"text": $scope.todoInput});
         $scope.todoInput = '';
       }
     };

     $scope.removeTodo = function (index) {
       $scope.todos.splice(index, 1);
     };
  });
