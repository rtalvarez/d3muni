angular.module("d3App", ['map', 'api', 'assets'])


.controller('mainCtrl', ['$scope', 'getAssets', 'makeMap', 'getRouteList', 'APIUrls', function($scope, getAssets, makeMap, getRouteList, APIUrls) {

  var mapData;
  $scope.model = {};
  window.model = $scope.model;
  var routeListUrl = APIUrls.routeList;

  $scope.activate = function(tag) {
    console.log(tag);
    $scope.model.routes[tag].visible = !$scope.model.routes[tag].visible;
    $scope.$broadcast('visibleChange', $scope.model.routes[tag]);
  };


  getAssets()
  .then(function(result) {
    var map = makeMap();
    mapData = result;
    var dataLayer = L.geoJson().addTo(map);
    // map.latLngToContainerPoint({lat:37.784875, lng:-122.406643})
    dataLayer.addData(mapData.streets);
    // for (var key in mapData) {
    //   dataLayer.addData(mapData[key]);
    // }
  });


  getRouteList(routeListUrl)
  .then(function(data) {
    var nodes = $(data).find('route');
    var title;
    var routeTag;

    $scope.model.routes = $scope.model.routes || {};

    nodes.each(function(index, node) {
      var $node = $(node);
      title = $node.attr('title');
      routeTag = $node.attr('tag');

      $scope.model.routes[routeTag] = {
        title: title,
        visible: false
      };

    });

    $scope.$broadcast('initReady', $scope.model);

  });

}])











