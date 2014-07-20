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

// mysquare
//   .transition()
//   .attr("x",320)
//   .each("end",function() { 
//     d3.select(this).       // so far, as above
//       remove();            // we delete the object instead 
//    });

.factory('putCircles', ['animateCircle', function(animateCircle) {

  return function(data, tag, color) {

    var circle = d3.select('svg')
    .append('g')
    .attr('class', 'route r' + tag)
    .selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('r', 3)
    .attr('cx', function(d, i) { return d[0]; })
    .attr('cy', function(d, i) { return d[1]; })
    .attr('fill', color);

    animateCircle(data, tag, color);

  };

}])

.factory('animateCircle', [function() {

  return function(data, tag, color) {

    var circles = d3.select('svg')
    .append('g')
    .attr('class', 'route r' + tag)
    .selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('r', 3)
    .attr('cx', function(d, i) { return d[0]; })
    .attr('cy', function(d, i) { return d[1]; })
    .attr('fill', color)

    var anim = function(elements) {



      // elements
      // .selectAll('circle')
      // .data(data)
      // .enter().append('circle')
      // .attr('r', 3)
      // .attr('cx', function(d, i) { return d[0]; })
      // .attr('cy', function(d, i) { return d[1]; })
      // .attr('fill', color)
      
      elements.attr('opacity', 0.95)
      .attr('r', 3)
      .transition()
      .duration(1500)
      .attr('r', 20)
      .attr('opacity', 0.02)
      .each('end', function() {
        // console.log('troll')
        anim(d3.select(this));
      });

      
    };

    anim(circles)
  };


}]);

