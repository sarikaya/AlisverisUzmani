'use strict';

function TodoCtrl($scope) {
  $scope.todos = [];

  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoInput, index: $scope.todos.length});
    $scope.todoInput = '';
  };

  $scope.removeTodo = function (index) {
    $scope.todos.splice(index, 1);
  };
}