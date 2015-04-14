'use strict';

angular.module('gowApp')
  .service('Pages', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('/api/pages/:id'); // Note the full endpoint address
  });
