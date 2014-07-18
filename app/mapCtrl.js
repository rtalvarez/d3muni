angular.module('map', ['api'])

.controller('mapCtrl', ['$scope', 'getLocations', 'parseLocations', 'makeMap', 'putCircle', function($scope, getLocations, parseLocations, makeMap, putCircle) {

  $scope.$on('initReady', function(other, data) {
    console.log(data.routes);
    
  });

  $scope.$on('enableRoute', function(other, route) {
    console.log(route);
    getLocations(route.routeTag)
    .then(function(data) {
      // console.log(data);
      var locations = parseLocations(data);
      locations.forEach(function(item, index) {
        var translated = map.latLngToContainerPoint({
          lat: item[0],
          lng: item[1]
        });

        locations[index][0] = translated.x;
        locations[index][1] = translated.y;

      });
      console.log(locations);
      putCircle(locations);
      // map.latLngToContainerPoint({lat:37.784875, lng:-122.406643})


    });

  });

}])


.factory('makeMap', [function() {

  var executed = false;
  var map;

  var createMap = function() {

    executed = true;
    map = L.map('map', {
      center: [37.768747165902056, -122.44880676269531],
      zoom: 14,
      touchZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'examples.map-20v6611k'
      }).addTo(map);

    window.map = map;
    // return map;
  };

  return function() {
    if (!executed) {
      createMap();
    } 
    return map;
  };

}])

.directive('circle', [function() {

  var link = function(scope, element, attr) {

    d3.select('svg')
    .append('g')
    .attr('class', 'node')
    .selectAll('circle')
    .data(scope.data)
    .enter().append('circle')
    .attr('r', 2)
    .attr('cx', function(d, i) { return d[0]; })
    .attr('cy', function(d, i) { return d[1]; })
    .attr('fill', 'red');

  };

  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };

}])

.factory('putCircle', [function() {

  return function(data) {
    d3.select('svg')
    .append('g')
    .attr('class', 'node')
    .selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('r', 2)
    .attr('cx', function(d, i) { return d[0]; })
    .attr('cy', function(d, i) { return d[1]; })
    .attr('fill', 'red');
  }

}])

