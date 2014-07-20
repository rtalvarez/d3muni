angular.module("d3App", ['map', 'api', 'assets'])


.controller('mainCtrl', ['$scope', 'getAssets', 'makeMap', 'queryAPI', 'APIUrls', 'saveRoutes', function($scope, getAssets, makeMap, queryAPI, APIUrls, saveRoutes) {

  var mapData;
  $scope.model = {};
  window.model = $scope.model;
  var routeListUrl = APIUrls.routeList;

  $scope.activate = function(tag) {
    $scope.model.routes[tag].visible = !$scope.model.routes[tag].visible;
    if ($scope.model.routes[tag].visible) {
      $scope.$broadcast('enableRoute', $scope.model.routes[tag]);
    } else {
      $scope.$broadcast('disableRoute', $scope.model.routes[tag]);
    }
  };


  getAssets()
  .then(function(result) {
    var map = makeMap();
    mapData = result;
    var dataLayer = L.geoJson().addTo(map);
    dataLayer.addData(mapData.streets);
    // for (var key in mapData) {
    //   dataLayer.addData(mapData[key]);
    // }
  });

  queryAPI(routeListUrl)
  .then(function(data) {
    saveRoutes(data, $scope);
  });

}]);











