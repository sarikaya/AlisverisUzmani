'use strict';

describe('Service: barcodeScanner', function () {

  // load the service's module
  beforeEach(module('asistanApp'));

  // instantiate service
  var barcodeScanner;
  beforeEach(inject(function (_barcodeScanner_) {
    barcodeScanner = _barcodeScanner_;
  }));

  it('should do something', function () {
    expect(!!barcodeScanner).toBe(true);
  });

});
