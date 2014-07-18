angular.module('map', ['api', 'd3'])

.controller('mapCtrl', ['$scope', 'getLocations', 'parseLocations', 'makeMap', 'putCircles', 'deleteCircles', function($scope, getLocations, parseLocations, makeMap, putCircles, deleteCircles) {

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
      putCircles(locations, route.routeTag);
      // map.latLngToContainerPoint({lat:37.784875, lng:-122.406643})
    });
  });

  $scope.$on('disableRoute', function(other, route) {
    deleteCircles(route.routeTag);
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



