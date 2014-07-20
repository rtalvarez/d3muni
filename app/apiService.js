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
      // console.log(data);
      window.data = data;
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
      // console.log(data);
      deferred.resolve(data);
    });

    return deferred.promise;
  };

}])

.factory('saveRoutes', [function() {

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
        routeTag: routeTag
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

    console.log(locations[0]);
    return locations;
  };

}]);






