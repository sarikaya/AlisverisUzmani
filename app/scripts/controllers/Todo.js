'use strict';

function TodoCtrl($scope) {
  $scope.todos = [{"text":"Süt"},{"text":"Yumurta"},
  {"text":"Bal"}];

  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoInput});
    $scope.todoInput = '';
  };

  $scope.removeTodo = function (todo) {
    $scope.todos.splice($scope.todos.indexOf(todo), 1);
  };
}