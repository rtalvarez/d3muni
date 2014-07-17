angular.module('d3', [])
.factory('d3Service', ['$q', function($q) {

  return function() {
    
    var scriptTag = document.createElement('script');
    var deferred = $q.defer();

    scriptTag.src = 'http://d3js.org/d3.v3.min.js';
    scriptTag.async = true;
    scriptTag.type = 'text/javascript';

    scriptTag.onload = function() {
      deferred.resolve(window.d3);
    };

    document.body.appendChild(scriptTag);
    return deferred.promise;
  };

}]);