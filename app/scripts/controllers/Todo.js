'use strict';

function TodoCtrl($scope) {
  $scope.todos = [{"text":"asfasf", "index":0},{"text":"asfasasfaf", "index":1},
  {"text":"asfas1yhhj1hj1j1{][}]|</span>£#$(/f", "index":2}];

  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoInput, index: $scope.todos.length});
    $scope.todoInput = '';
  };

  $scope.removeTodo = function (index) {
    $scope.todos.splice(index, 1);
  };
}