angular.module('map', ['api', 'd3'])

.controller('mapCtrl', ['$scope', 'getLocations', 'parseLocations', 'makeMap', 'putCircles', 'deleteCircles', function($scope, getLocations, parseLocations, makeMap, putCircles, deleteCircles) {

  $scope.timers = {};

  $scope.$on('initReady', function(other, data) {
    console.log(data.routes);
    
  });

  $scope.$on('enableRoute', function(other, route) {


    var showVehicles = function() {
      getLocations(route.routeTag)
      .then(function(data) {
        
        var locations = parseLocations(data);

        var deltaLat = (map.getCenter().lat - map.initial[0]);
        var deltaLng = (map.getCenter().lng - map.initial[1]);
        // console.log('deltas', [deltaLat, deltaLng]);


        locations.forEach(function(item, index) {
          var translated = map.latLngToLayerPoint({
            lat: item[0] + deltaLat,
            lng: item[1] + deltaLng
          });

          locations[index][0] = translated.x;
          locations[index][1] = translated.y;

        });
        console.log('translated', locations[0]);
        var color = putCircles(locations, route.routeTag);

        $('.c' + route.routeTag).css({
          'background-color' : color
        });
        // map.latLngToContainerPoint({lat:37.784875, lng:-122.406643})
      });
    };

    showVehicles();

    $scope.timers[route.routeTag] = setInterval(function() {
      deleteCircles(route.routeTag);
      showVehicles();
    }, 15000);
    

  });

  $scope.$on('disableRoute', function(other, route) {
    $('.c' + route.routeTag).css({
      'background-color' : 'white'
    });
    deleteCircles(route.routeTag);
    clearInterval($scope.timers[route.routeTag]);
  });
}])


.factory('makeMap', [function() {

  var executed = false;
  var map;

  var createMap = function() {

    executed = true;
    var center = [37.764811863655154, -122.44863510131836];
    map = L.map('map', {
      center: center,
      zoom: 13,
      touchZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      scrollWheelZoom: false
    });

    map.initial = center;

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

}]);





