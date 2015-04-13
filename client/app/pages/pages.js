'use strict';

angular.module('gowApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pages', {
        abstract: true,
        url: '/pages',
        templateUrl: 'app/pages/pages.html',
        controller: 'PagesCtrl'
      })
      .state('pages.list', {
        url: '',
        templateUrl: 'app/pages/pages.list.html',
        controller: 'PagesListCtrl'
      })
      .state('pages.edit', {
        url: '/:id/edit',
        templateUrl: 'app/pages/pages.edit.html',
        controller: 'PagesEditCtrl'
      });
  });
