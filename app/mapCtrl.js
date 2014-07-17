angular.module('map', ['d3'])

.controller('mapCtrl', ['d3Service', function(d3Service) {

  d3Service()
  .then(function(d3){
    console.log(d3);
  });

}])

// .factory('circle', ['d3Service', function(d3Service) {

// }]);