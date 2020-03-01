// different colored markers
// source: https://github.com/pointhi/leaflet-color-markers
var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var goldIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// tile layers
var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var mapLayers = {
  "Dark": darkmap,
  "Street": streetmap,
  "Satellite": satellitemap
};


d3.json("../static/data/Ward_from_2012.geojson").then((response) => {

  var features = response.features;

  var wardOutlines = [];
  var wardNames = [];
  var polygons = [];

  features.forEach(function(feature) {
    // wardOutlines.push(feature.geometry.rings[0]);
    wardOutlines.push(feature.geometry);
    wardNames.push(feature.properties.NAME);
    polygons.push(feature.geometry.coordinates);
  })

  console.log(wardOutlines);

  // // set static labels (ward names)
  // var label = new L.label();
  // label.setContent()

  var polygonStyle = {
    "color": "darkorange",
    "weight": 1,
    "opacity": 1
  };

  var clusterBounds = L.polygon(polygons)

  wardsLayer = L.geoJSON(wardOutlines, {style: polygonStyle});

  d3.json("/api/dc_potholes").then((response) => {
  
    // var potholeMarkers = [];
    var potholeLayer = L.markerClusterGroup();
    var potholeLayer_closed = L.markerClusterGroup();
    var potholeLayer_open = L.markerClusterGroup();

    for (var i = 0; i < response.length; i++) {
      var lat = response[i].latitude;
      var long = response[i].longitude;
      var address = response[i].street_address;
      var status = response[i].service_order_status;
      var date = response[i].add_date;
      //  console.log(lat);
      //  console.log(long);
    
      var icon = "";

      // assign marker color based on status
      if (status) {
        if (status == "Closed") {
          icon = greenIcon;
        }
        else {
          icon = goldIcon;
        };
      }

      if (lat) {
        if (long) {  
          var potholemarker = L.marker([lat, long], {
            icon: icon
          })
          .bindPopup("<strong style='font-size:12px;'>" + address + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "Status:  " + status + "<br>" + 
            "Date Opened:  " + date
          );

          // potholeLayer.addLayer(potholemarker);

          if (status == "Closed") {
            potholeLayer_closed.addLayer(potholemarker);
          }
          else {
            potholeLayer_open.addLayer(potholemarker);
          };
        };
      };
    };

    // var potholeLayer = L.layerGroup(potholeMarkers);
    
    var overlayMaps = {
      // "DC Wards": polygons,
      "DC Wards": wardsLayer,
      "Potholes - Closed": potholeLayer_closed,
      "Potholes - Open": potholeLayer_open
    };

    var potholeMap = L.map("pothole_map", {
      center: [38.9072, -77.0369],
      zoom: 11,
      layers: [darkmap, wardsLayer, potholeLayer]
    });

    L.control.layers(mapLayers, overlayMaps, {collapse: false}).addTo(potholeMap).getBounds();
  });

});





