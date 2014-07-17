angular.module("d3App", [])

.controller('mainCtrl', ['$scope', 'getAssets', 'makeMap', 'getRouteList', function($scope, getAssets, makeMap, getRouteList) {

  var mapData;
  $scope.model = {};
  window.model = $scope.model;
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


  getRouteList()
  .then(function(data) {
    var nodes = $(data).find('route');
    var title;
    var routeTag;

    $scope.model.routes = $scope.model.routes || {};

    nodes.each(function(index, node) {
      console.log($(node).attr);
      var $node = $(node);
      title = $node.attr('title');
      routeTag = $node.attr('tag');

      $scope.model.routes[routeTag] = title;

    });

  });

}])

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

}])

.factory('makeMap', [function() {

  return function() {
    var map = L.map('map', {
      center: [37.784875, -122.406643],
      zoom: 13,
      touchZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      scrollWheelZoom: false
    });

    // L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    //     maxZoom: 18,
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    //       '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    //       'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     id: 'examples.map-20v6611k'
    //   }).addTo(map);

    return map;
  };

}])

.factory('getRouteList', ['$q', function($q) {

  return function() {
    var url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni';
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



