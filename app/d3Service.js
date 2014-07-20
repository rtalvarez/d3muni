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

.factory('putCircles', ['animateCircles', 'createCircles', function(animateCircles, createCircles) {

  return function(data, tag, color) {
    createCircles(data, tag, color);
    animateCircles(data, tag, color);
  };

}])

.factory('createCircles', [function() {

  return function(data, tag, color) {
    var elements = d3.select('svg')
    .append('g')
    .attr('class', 'route r' + tag)
    .selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('r', 3)
    .attr('cx', function(d, i) { return d[0]; })
    .attr('cy', function(d, i) { return d[1]; })
    .attr('fill', color);
    return elements;
  };

}])

.factory('animateCircles', ['createCircles', function(createCircles) {

  return function(data, tag, color) {

    var circles = createCircles(data, tag, color);

    var anim = function(elements) {
      
      elements.attr('opacity', 0.95)
      .attr('r', 3)
      .transition()
      .duration(1500)
      .attr('r', 20)
      .attr('opacity', 0.02)
      .each('end', function() {
        anim(d3.select(this));
      });

      
    };

    anim(circles);
  };


}]);

