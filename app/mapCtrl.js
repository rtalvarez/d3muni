angular.module('map', ['api', 'd3'])

.controller('mapCtrl', ['$scope', 'getLocations', 'parseLocations', 'makeMap', 'putCircles', 'deleteCircles', function($scope, getLocations, parseLocations, makeMap, putCircles, deleteCircles) {

  $scope.timers = {};

  $scope.$on('zoomend', function() {
    deleteCircles();

    for (var key in $scope.model.routes) {
      var route = $scope.model.routes[key];
      if (route.visible) {
        showVehicles(route);
      }
    }
  });

  var showVehicles = function(route) {
    getLocations(route.routeTag)
    .then(function(data) {
      
      var locations = parseLocations(data);

      locations.forEach(function(item, index) {
        var translated = map.latLngToLayerPoint({
          lat: item[0],
          lng: item[1]
        });

        locations[index][0] = translated.x;
        locations[index][1] = translated.y;

      });
      putCircles(locations, route.routeTag, route.color);

      $('.c' + route.routeTag).css({
        'background-color' : route.color
      });
      
    });
  };

  $scope.$on('enableRoute', function(other, route) {


    showVehicles(route);

    $scope.timers[route.routeTag] = setInterval(function() {
      deleteCircles(route.routeTag);
      showVehicles(route);
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


.factory('makeMap', ['$rootScope', function($rootScope) {

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

    map.on('zoomend', function() {
      $rootScope.$broadcast('zoomend');
    });

  };

  return function() {
    if (!executed) {
      createMap();
    } 
    return map;
  };

}]);





