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
        // save btn goes here
        Pages.save(page);
        // todo: navigate to edit page
      }, function () {
        // cancel btn goes here
      });
    };
  })
  .controller('PagesModalCtrl', function ($scope, $modalInstance) {
    $scope.save = function () {
      $modalInstance.close({name: $scope.name, route: $scope.route});
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('PagesEditCtrl', function ($scope, $stateParams, $log, Pages) {
    $scope.page = Pages.get({id: $stateParams.id});

    $scope.save = function () {
      Pages.update({id: $scope.page._id}, $scope.page);
      // todo: notify user
    };
  })
  .controller('PageCtrl', function ($scope, $stateParams, $log, Pages) {
    // get page by url
    $scope.page = Pages.get({route: $stateParams.route});
  });
