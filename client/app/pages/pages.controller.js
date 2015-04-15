'use strict';

angular.module('gowApp')
  .controller('PagesCtrl', function () {
  })
  .controller('PagesListCtrl', function ($scope, $modal, $log, Pages) {
    $scope.getPages = function () {
      // load all pages, for listing them
      $scope.pages = Pages.query();
    };
    $scope.getPages();

    $scope.newPage = function () {
      var modalInstance = $modal.open({
        templateUrl: 'pagesModal.html',
        controller: 'PagesModalCtrl'
      });

      modalInstance.result.then(function (page) {
        // ok goes here
        Pages.save(page);
        $scope.getPages();
        $log.info(page + ' saved successfully');
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  })
  .controller('PagesModalCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close({name: $scope.name, route: $scope.route});
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('PagesEditCtrl', function ($scope, $stateParams, Pages) {
    $scope.page = Pages.get({id: $stateParams.id});
    $scope.contents = [
      {row: 0, col: 0, size: 8, body: 'content -0-0-8-'},
      {row: 0, col: 8, size: 4, body: 'widget -0-8-4-'},
      {row: 1, col: 0, size: 12, body: 'big content -1-0-12-'},
      {row: 2, col: 4, size: 4, body: 'small widget -2-4-4-'},
      {row: 2, col: 2, size: 1, body: 'tiny w -2-2-1-'}
    ];
  });
