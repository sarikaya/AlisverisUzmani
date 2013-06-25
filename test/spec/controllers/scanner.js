'use strict';

describe('Controller: ScannerCtrl', function () {

  // load the controller's module
  beforeEach(module('asistanApp'));

  var ScannerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScannerCtrl = $controller('ScannerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
