angular.module('api', [])

.factory('APIUrls', function() {

  return {
    locations: function(routeTag) {
      return 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=sf-muni&r=' + routeTag + '&t=0';
    },
    routeList: 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni'
  };

})

.factory('queryAPI', ['$q', function($q) {

  return function(url) {
    
    var deferred = $q.defer();

    $.ajax({
      method: 'GET',
      url: url
    })
    .then(function(data) {
      deferred.resolve(data);
    });

    return deferred.promise;
  };

}])

.factory('getLocations', ['$q', 'APIUrls', 'queryAPI', function($q, APIUrls, queryAPI) {

  return function(routeTag) {
    var deferred = $q.defer();
    var url = APIUrls.locations(routeTag);
    queryAPI(url)
    .then(function(data) {
      deferred.resolve(data);
    });

    return deferred.promise;
  };

}])

.factory('saveRoutes', ['randomColor', function(randomColor) {

  return function(data, scope) {
    var nodes = $(data).find('route');
    var title;
    var routeTag;

    scope.model.routes = scope.model.routes || {};

    nodes.each(function(index, node) {
      var $node = $(node);
      title = $node.attr('title');
      routeTag = $node.attr('tag');

      scope.model.routes[routeTag] = {
        title: title,
        visible: false,
        routeTag: routeTag,
        color: randomColor()
      };

    });

    scope.$broadcast('initReady', scope.model);
  };

}])

.factory('parseLocations', [function() {

  return function(xml) {
    var locations = [];
    var nodes = $(xml).find('vehicle');
    var lat;
    var lon;

    nodes.each(function(index, node) {
      var $node = $(node);
      lat = $node.attr('lat');
      lon = $node.attr('lon');
      locations.push([lat, lon]);
    });

    return locations;
  };

}])

.factory('randomColor', [function() {

  return function(){
    var letters = 'ABCDEF0123456789'.split('');
    var color = '#';

    for (var i = 0; i < 6; i++){
      color = color + letters[Math.floor(Math.random() * letters.length)];    
    }

    return color;
 };

}]);






