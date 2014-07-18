angular.module('api', [])

.factory('APIUrls', function() {

  return {
    routeList: 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni'
  };

})

.factory('getRouteList', ['$q', function($q) {

  return function(url) {
    
    var deferred = $q.defer();

    $.ajax({
      method: 'GET',
      url: url
    })
    .then(function(data) {
      console.log(data);
      window.data = data;
      deferred.resolve(data);



    });

    return deferred.promise;
  };

}]);