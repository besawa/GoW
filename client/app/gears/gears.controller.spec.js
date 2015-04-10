'use strict';

describe('Controller: GearsCtrl', function () {

  // load the controller's module
  beforeEach(module('gowApp'));

  var GearsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GearsCtrl = $controller('GearsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
