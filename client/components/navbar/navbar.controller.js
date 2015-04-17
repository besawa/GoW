'use strict';

angular.module('gowApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Pages) {
    $scope.menu = [
      {'title': 'Home', 'link': '/'},
      {'title': 'Pages', 'link': '/pages'}
    ];

    // adding pages routes only if menu enabled
    var pages = Pages.query(function () {
      _.forEach(pages, function (page) {
        if (page.menu) {
          $scope.menu.push({title: page.name, link: page.route});
        }
      });
    });

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route) {
      return route === $location.path();
    };
  });
