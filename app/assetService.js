angular.module('assets', [])

.factory('loadJSON', ['$q','$http', function($q, $http) {

  return function(asset) {
    var deferred = $q.defer();
    $http.get(asset)
    .success(function(mapData) {
      deferred.resolve(mapData);
    });
    return deferred.promise;
  };

}])

.factory('getAssets', ['$q','loadJSON', function($q, loadJSON) {

  return function() {
    var assets = {};
    var deferred = $q.defer();
    var completePath;
    var rootPath = '../sfmaps/';

    var names = [
      'arteries',
      'streets',
      'neighborhoods',
      'freeways'
    ];

    var assetCount = 0;

    var loopable = function(i) {
      completePath = rootPath + names[i] + '.json';
      loadJSON(completePath)
      .then(function(result) {
        assetCount++;
        assets[names[i]] = result;
        if (assetCount === names.length) {
          return deferred.resolve(assets);
        } 
      });
    };

    for (var i = 0; i < names.length; i++) {
      loopable(i);
    }

    return deferred.promise;
  };

}]);