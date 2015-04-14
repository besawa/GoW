'use strict';

describe('Directive: contentBox', function () {

  // load the directive's module and view
  beforeEach(module('gowApp'));
  beforeEach(module('app/pages/contentBox.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<content-box></content-box>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the contentBox directive');
  }));
});
