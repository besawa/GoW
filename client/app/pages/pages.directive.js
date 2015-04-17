'use strict';

angular.module('gowApp')
  .directive('contentBox', function () {
    return {
      templateUrl: 'app/pages/contentBox.html',
      restrict: 'EA',
      scope: {
        contents: '=contentBox',
        editMode: '='
      },
      controller: function ($scope, $log, $timeout, $interval) {
        $scope.rows = [];

        $timeout(function () { // promise
          // looping over rows to build each row boxes
          var maxRow = _.result(_.max($scope.contents, 'row'), 'row');
          if (!maxRow) maxRow = 0; // in case of new page and no content
          for (var i = 0; i <= maxRow + 2; i++) { // adding extra 2 empty rows
            var row = {index: i, boxes: []};

            // looping over 12 cells
            for (var j = 0; j < 12; j++) {
              // check for the current cell content
              var colContent = _.find($scope.contents, {row: i, col: j});
              if (colContent) {
                row.boxes.push(colContent);
                j += colContent.size - 1; // j will increment on the loop by that 1
              }
              else { // adding empty boxes
                row.boxes.push({row: i, col: j, size: 1, body: ''});
              }
            }

            $scope.rows.push(row);
          }
        }, 100);

        // increase/decrease size click, taking the target box, its index,
        // the direction from the left or not, and if expanding or not
        $scope.size = function (box, index, left, expand) {
          // the target row
          var row = _.find($scope.rows, {index: box.row});

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
            row.boxes.splice(blankIndex, 0, {row: box.row, col: col, size: 1, body: ''});

            if (left) { // change col
              box.col++;
            }
          }
        };

        $scope.selectBox = function (box) {
          $scope.selectedBox = box;

          // add new rows, 2 beneath the current selected one if no room
          var missingRowsCount = $scope.rows.length - box.row - 1;
          if (missingRowsCount < 2) {
            var start = $scope.rows.length;
            missingRowsCount = missingRowsCount == 0 ? 2 : missingRowsCount;
            var end = start + missingRowsCount;
            for (var i = start; i < end; i++) { // add extra x empty rows
              var row = {index: i, boxes: []};

              // looping over 12 cells
              for (var j = 0; j < 12; j++) {
                // adding empty boxes
                row.boxes.push({row: i, col: j, size: 1, body: ''});
              }

              $scope.rows.push(row);
            }
          }
        };

        $scope.remove = function (box, index) {
          // the target row
          var row = _.find($scope.rows, {index: box.row});

          // remove this box
          row.boxes.splice(index, 1);

          // looping over the box cells
          for (var i = 0; i < box.size; i++) {
            // adding empty boxes
            row.boxes.splice(index + i, 0, {row: box.row, col: box.col + i, size: 1, body: ''});
          }

          // stop bubbling, for not selecting box
          return false;
        };

        $scope.isBlank = function (box) {
          return box && !box.body && box.size == 1;
        };

        // sync values of scope.rows.boxes with scope.contents
        // to notify the controller about the boxes changes
        $interval(function () {
          // only unblank boxes
          var boxes = _.flatten(_.map($scope.rows, 'boxes'));
          $scope.contents = _.where(boxes, function (box) {
            return !$scope.isBlank(box);
          });
        }, 1000);
      }
    };
  });
