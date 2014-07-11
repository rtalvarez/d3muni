angular.module("d3App", [])

.controller('mainCtrl', ['getAssets', function(getAssets) {

  getAssets()
  .then(function(result) {
    console.log(result);
  });

}])

.factory('loadJSON', ['$q','$http', function($q, $http) {

  var getJSONData = function(asset) {
    var deferred = $q.defer();
    $http.get(asset)
    .success(function(mapData) {
      deferred.resolve(mapData);
    });
    return deferred.promise;
  };

  return getJSONData;
}])

.factory('getAssets', ['$q','loadJSON', function($q, loadJSON) {


  return function() {
    var assets = {};
    var deferred = $q.defer();
   
    loadJSON('../sfmaps/arteries.json')
    .then(function(result) {
      assets.arteries = result;
      return loadJSON('../sfmaps/streets.json');
    })
    .then(function(result) {
      assets.streets = result;
      return loadJSON('../sfmaps/neighborhoods.json');
    })
    .then(function(result) {
      assets.neighborhoods = result;
      return loadJSON('../sfmaps/freeways.json');
    })
    .then(function(result) {
      assets.freeways = result;
      deferred.resolve(assets);
    });

    return deferred.promise;
  };

}]);

