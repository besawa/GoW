'use strict';

describe('Service: Pages', function () {

  // load the service's module
  beforeEach(module('gowApp'));

  // instantiate service
  var Pages;
  beforeEach(inject(function (_Pages_) {
    Pages = _Pages_;
  }));

  it('should do something', function () {
    expect(!!Pages).toBe(true);
  });

});
