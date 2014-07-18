angular.module('d3', [])

// .directive('circle', [function() {

//   var link = function(scope, element, attr) {

//     d3.select('svg')
//     .append('g')
//     .attr('class', 'node')
//     .selectAll('circle')
//     .data(scope.data)
//     .enter().append('circle')
//     .attr('r', 2)
//     .attr('cx', function(d, i) { return d[0]; })
//     .attr('cy', function(d, i) { return d[1]; })
//     .attr('fill', 'red');

//   };

//   return {
//     link: link,
//     restrict: 'E',
//     scope: { data: '=' }
//   };

// }])

.factory('deleteCircles', [function() {

  return function(tag) {
    d3.selectAll('.r' + tag)
    .data([])
    .exit()
    .remove();
  };

}])

.factory('putCircles', ['circleColors', function(circleColors) {

  return function(data, tag) {
    var color = circleColors(tag);
    console.log(color);
    d3.select('svg')
    .append('g')
    .attr('class', 'r' + tag)
    .selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('r', 3)
    .attr('cx', function(d, i) { return d[0]; })
    .attr('cy', function(d, i) { return d[1]; })
    .attr('fill', color);
    return color;
  };

}])

.service('circleColors', [function() {

  return function(){
    var letters = 'ABCDEF0123456789'.split('');
    var color = '#';

    for (var i = 0; i < 6; i++){
      color = color + letters[Math.floor(Math.random() * letters.length)];    
    }

    return color;
 };

}]);
// .factory('d3Service', ['$q', function($q) {

//   return function() {
    
//     var scriptTag = document.createElement('script');
//     var deferred = $q.defer();

//     scriptTag.src = 'http://d3js.org/d3.v3.min.js';
//     scriptTag.async = true;
//     scriptTag.type = 'text/javascript';

//     scriptTag.onload = function() {
//       deferred.resolve(window.d3);
//     };

//     document.body.appendChild(scriptTag);
//     return deferred.promise;
//   };

// }]);