'use strict';

angular.module('gowApp')
  .directive('contentBox', function ($log, $document) {
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
              row.boxes.push({row: i, col: j, size: 1, body: 'xXx', blank: true});
            }
          }

          scope.rows.push(row);
        }

        // increase/decrease size click, taking the target box, its index,
        // the direction from the left or not, and if expanding or not
        scope.size = function (box, index, left, expand) {
          box.blank = false;

          // the target row
          var row = _.find(scope.rows, {index: box.row});

          if (expand) { // remove a blank cell
            box.size++;
            var blankIndex = left ? index - 1 : index + 1;
            row.boxes.splice(blankIndex, 1);

            if (left) { // change col
              box.col--;
            }
          }
          else { // add a blank cell
            box.size--;
            var col = left ? box.col : box.col + box.size;
            blankIndex = left ? index : index + 1;
            row.boxes.splice(blankIndex, 0, {row: box.row, col: col, size: 1, body: 'xXx', blank: true});

            if (left) { // change col
              box.col++;
            }
          }

          // add new rows
          var missingRowsCount = scope.rows.length - box.row - 1;
          if (missingRowsCount < 2) {
            var start = scope.rows.length;
            missingRowsCount = missingRowsCount == 0 ? 2 : missingRowsCount;
            var end = start + missingRowsCount;
            for (var i = start; i < end; i++) { // add extra x empty rows
              row = {index: i, boxes: []};

              // looping over 12 cells
              for (var j = 0; j < 12; j++) {
                // adding empty boxes
                row.boxes.push({row: i, col: j, size: 1, body: 'xXx', blank: true});
              }

              scope.rows.push(row);
            }
          }
        };

        scope.selectBox = function (box) {
          scope.selectedBox = box;
        }
      }
    };
  });
