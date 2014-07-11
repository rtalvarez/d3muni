var arteries;

$.ajax({
  method: 'GET',
  url: '../sfmaps/arteries.json',
  success: function(data, message) {
    arteries = data;
    init();
  }
});

var init = function() {

  var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13
  });

  L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'examples.map-20v6611k'
    }).addTo(map);
  // L.geoJson(arteries).addTo(map);

  var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

var myLayer = L.geoJson().addTo(map);
console.log(arteries);
myLayer.addData(arteries);

//   L.geoJson(geojsonFeature, {
//     style: function (feature) {
//         return {color: feature.properties.color};
//     },
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(feature.properties.description);
//     }
// }).addTo(map);

};
