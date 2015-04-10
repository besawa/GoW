'use strict';

angular.module('gowApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('gears', {
        url: '/gears',
        templateUrl: 'app/gears/gears.html',
        controller: 'GearsCtrl'
      });
  });
