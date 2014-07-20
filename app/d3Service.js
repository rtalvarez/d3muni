angular.module('d3', [])

.factory('deleteCircles', [function() {

  return function(tag) {

    var selector;
    if (tag) {
      selector = '.r' + tag;
    } else {
      selector = '.route';
    }
    
    d3.selectAll(selector)
    .data([])
    .exit()
    .remove();

  };

}])

.factory('putCircles', [function() {

  return function(data, tag, color) {
    d3.select('svg')
    .append('g')
    .attr('class', 'route r' + tag)
    .selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('r', 3)
    .attr('cx', function(d, i) { return d[0]; })
    .attr('cy', function(d, i) { return d[1]; })
    .attr('fill', color);
  };

}]);

