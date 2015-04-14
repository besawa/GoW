'use strict';

angular.module('gowApp')
  .directive('contentBox', function ($log) {
    return {
      templateUrl: 'app/pages/contentBox.html',
      restrict: 'EA',
      scope: {
        contents: '=contentBox'
      },
      link: function (scope, element, attrs) {
        scope.rows = [];

        // looping over rows to build each row boxes
        var maxRow = _.result(_.max(scope.contents, 'row'), 'row');
        for (var i = 0; i <= maxRow + 2; i++) { // add extra 2 empty rows
          var row = {index: i, boxes: []};

          // looping over 12 cells
          for (var j = 0; j < 12; j++) {
            // check for the current cell content
            var colContent = _.find(scope.contents, {row: i, col: j});
            if (colContent) {
              row.boxes.push(colContent);
              j += colContent.size - 1; // j will increment on the loop by that 1
            }
            else { // adding empty boxes
              row.boxes.push({row: i, col: j, size: 1, body: 'xXx'});
            }
          }

          scope.rows.push(row);
        }
      }
    };
  });
