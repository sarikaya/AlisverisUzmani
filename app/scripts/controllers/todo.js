'use strict';

angular.module('asistanApp')
  .controller('TodoCtrl', function ($scope, storage) {
     var todos = $scope.todos = storage.get("todos") || [];

     $scope.addTodo = function() {
       var input = $scope.todoInput;
       if (input) {
         todos.push({"text": input});
         storage.set("todos", todos);
         $scope.todoInput = '';
       }
     };

     $scope.removeTodo = function (index) {
       todos.splice(index, 1);
       storage.set("todos", todos);
     };
  });
