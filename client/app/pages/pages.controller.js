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
  .controller('PagesEditCtrl', function () {
  });
