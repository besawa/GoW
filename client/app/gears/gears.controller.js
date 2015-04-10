'use strict';

angular.module('gowApp')
  .controller('GearsCtrl', function ($scope) {
    // init values
    var width = 960, height = 500;
    var color = d3.scale.category10();
    var engineNode = {id: "engine", "name": "Engine", "group": 0, fixed: true, x: width / 2, y: height / 2};
    var pagesNode = {id: "pages", "name": "Pages", "group": 1};
    var dbsNode = {id: "dbs", "name": "Databases", "group": 2};
    var themesNode = {id: "themes", "name": "Themes", "group": 3};

    // d3 force layout nodes and links
    var nodes = [engineNode, pagesNode, dbsNode, themesNode];
    var links = [
      {source: engineNode, target: pagesNode},
      {source: engineNode, target: dbsNode},
      {source: engineNode, target: themesNode}
    ];

    // d3 force layout
    var force = d3.layout.force()
      .nodes(nodes)
      .links(links)
      .charge(-400)
      .linkDistance(120)
      .size([width, height])
      .on("tick", tick);

    // svg ref
    var svg = d3.select("#gears").append("svg")
      .attr("width", width)
      .attr("height", height);

    // nodes, links and text
    var node = svg.selectAll(".node"), link = svg.selectAll(".link"), text = svg.append("g").selectAll("text");

    // the actual d3 render
    function drawGears() {
      link = link.data(force.links(), function (d) {
        return d.source.id + "-" + d.target.id;
      });
      link.enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function (d) {
          return Math.sqrt(d.value);
        });

      link.exit().remove();

      node = node.data(force.nodes(), function (d) {
        return d.id;
      });
      node.enter().append("circle")
        .attr("class", function (d) {
          return "node " + d.id;
        })
        .attr("r", 8)
        .style("fill", function (d) {
          return color(d.group);
        })
        .call(force.drag);

      node.append("title")
        .text(function (d) {
          return d.name;
        });

      node.exit().remove();

      svg.selectAll("g").remove();
      text = svg.append("g").selectAll("text");
      text = text.data(force.nodes())
        .enter().append("text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function (d) {
          return d.name;
        });

      force.start();
    }

    // render for the first time
    drawGears();

    // the tick event of the d3 force layout
    function tick() {
      node
        .attr("cx", function (d) {
          console.log(d.x);
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });

      link
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });

      text.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }

    $scope.newPage = function () {
      var newPagesNode = {id: "newPage" + Date.now(), "name": "New Page", "group": 4};
      nodes.push(newPagesNode);
      links.push({source: pagesNode, target: newPagesNode});
      drawGears();
    };
  }
);
