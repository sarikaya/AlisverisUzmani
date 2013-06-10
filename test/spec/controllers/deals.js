'use strict';

describe('Controller: DealsCtrl', function () {

  // load the controller's module
  beforeEach(module('asistanApp'));

  var DealsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DealsCtrl = $controller('DealsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
