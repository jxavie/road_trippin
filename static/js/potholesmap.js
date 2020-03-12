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
  label: "Base Layers",
  children: [
    {
      label: "Dark",
      layer: darkmap
    },
    {
      label: "Street",
      layer: streetmap
    },
    {
      label: "Satellite",
      layer: satellitemap
    }
  ]
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

  var bounds = L.polygon(polygons)

  wardsLayer = L.geoJSON(wardOutlines, {style: polygonStyle});

  // // mySQL API
  // var url = "/api/dc_potholes"

  // Open Data DC API
  var url = "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/SR_30days_Open/MapServer/10/query?where=1%3D1&outFields=*&outSR=4326&f=json"

  d3.json(url).then((response) => {
  
    var features = response.features;

    var potholeLayer1_closed = L.markerClusterGroup();
    var potholeLayer1_open = L.markerClusterGroup();
    var potholeLayer2_closed = L.markerClusterGroup();
    var potholeLayer2_open = L.markerClusterGroup();
    var potholeLayer3_closed = L.markerClusterGroup();
    var potholeLayer3_open = L.markerClusterGroup();
    var potholeLayer4_closed = L.markerClusterGroup();
    var potholeLayer4_open = L.markerClusterGroup();
    var potholeLayer5_closed = L.markerClusterGroup();
    var potholeLayer5_open = L.markerClusterGroup();
    var potholeLayer6_closed = L.markerClusterGroup();
    var potholeLayer6_open = L.markerClusterGroup();
    var potholeLayer7_closed = L.markerClusterGroup();
    var potholeLayer7_open = L.markerClusterGroup();
    var potholeLayer8_closed = L.markerClusterGroup();
    var potholeLayer8_open = L.markerClusterGroup();

    features.forEach((feature) => {
      var id = feature.attributes.OBJECTID;
      var add_date = new Date(feature.attributes.ADDDATE).toDateString();
      var status = feature.attributes.SERVICEORDERSTATUS;
      var address = feature.attributes.STREETADDRESS;
      var latitude = feature.attributes.LATITUDE;
      var longitude = feature.attributes.LONGITUDE;
      var ward = parseInt(feature.attributes.WARD);

      // var date = add_date.getDay() + ", " + add_date.getMonth()
      var date_components = add_date.split(" ");
      var date = date_components[1] + " " + date_components[2] + ", " + date_components[3];

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

      if (latitude && longitude && ward && status) {
        var potholemarker = L.marker([latitude, longitude], {
          icon: icon
        })
        .bindPopup("<strong style='font-size:12px;'>" + address + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
          "ID:  " + id + "<br>" + 
          "Status:  " + status + "<br>" + 
          "Date Opened:  " + date
        );
        if (status == "Closed") {
          switch (ward) {
            case 1:
              potholeLayer1_closed.addLayer(potholemarker);
              break;
            case 2:
              potholeLayer2_closed.addLayer(potholemarker);
              break;
            case 3:
              potholeLayer3_closed.addLayer(potholemarker);
              break;
            case 4:
              potholeLayer4_closed.addLayer(potholemarker);
              break;
            case 5:
              potholeLayer5_closed.addLayer(potholemarker);
              break;
            case 6:
              potholeLayer6_closed.addLayer(potholemarker);
              break;
            case 7:
              potholeLayer7_closed.addLayer(potholemarker);
              break;
            case 8:
              potholeLayer8_closed.addLayer(potholemarker);
              break;
          };
        }
        else {
          switch (ward) {
            case 1:
              potholeLayer1_open.addLayer(potholemarker);
              break;
            case 2:
              potholeLayer2_open.addLayer(potholemarker);
              break;
            case 3:
              potholeLayer3_open.addLayer(potholemarker);
              break;
            case 4:
              potholeLayer4_open.addLayer(potholemarker);
              break;
            case 5:
              potholeLayer5_open.addLayer(potholemarker);
              break;
            case 6:
              potholeLayer6_open.addLayer(potholemarker);
              break;
            case 7:
              potholeLayer7_open.addLayer(potholemarker);
              break;
            case 8:
              potholeLayer8_open.addLayer(potholemarker);
              break;
          };
        };
      };

    });
    
    var overlayMaps = {
      label: "Overlays",
      // selectAllCheckbox: "Un/select all",
      children: [
        {label: "DC Wards", layer: wardsLayer},
        {
          label: "Potholes",
          selectAllCheckbox: "Un/select all",
          children: [
            {
              label: "Closed",
              selectAllCheckbox: true,
              children: [
                {label: "Ward 1", layer: potholeLayer1_closed},
                {label: "Ward 2", layer: potholeLayer2_closed},
                {label: "Ward 3", layer: potholeLayer3_closed},
                {label: "Ward 4", layer: potholeLayer4_closed},
                {label: "Ward 5", layer: potholeLayer5_closed},
                {label: "Ward 6", layer: potholeLayer6_closed},
                {label: "Ward 7", layer: potholeLayer7_closed},
                {label: "Ward 8", layer: potholeLayer8_closed}
              ]
            },
            {
              label: "Open",
              selectAllCheckbox: true,
              children: [
                {label: "Ward 1", layer: potholeLayer1_open},
                {label: "Ward 2", layer: potholeLayer2_open},
                {label: "Ward 3", layer: potholeLayer3_open},
                {label: "Ward 4", layer: potholeLayer4_open},
                {label: "Ward 5", layer: potholeLayer5_open},
                {label: "Ward 6", layer: potholeLayer6_open},
                {label: "Ward 7", layer: potholeLayer7_open},
                {label: "Ward 8", layer: potholeLayer8_open},
              ]
            }
          ]
        }
      ]
    };

    var potholeMap = L.map("pothole_map", {
      center: [38.9072, -77.0369],
      zoom: 11,
      layers: [
        streetmap,
        wardsLayer,
        // potholeLayer1_closed,
        // potholeLayer2_closed,
        // potholeLayer3_closed,
        // potholeLayer4_closed,
        // potholeLayer5_closed,
        // potholeLayer6_closed,
        // potholeLayer7_closed,
        // potholeLayer8_closed,
        potholeLayer1_open,
        potholeLayer2_open,
        potholeLayer3_open,
        potholeLayer4_open,
        potholeLayer5_open,
        potholeLayer6_open,
        potholeLayer7_open,
        potholeLayer8_open
      ],
      fullscreenControl: true
    });

    L.control.layers.tree(mapLayers, overlayMaps, {
      namedToggle: false,
      selectorBack: true,
      closedSymbol: '&#8862;',
      openedSymbol: '&#8863;',
      // collapseAll: 'Collapse all',
      // expandAll: 'Expand all',
      collapsed: true
    }).addTo(potholeMap).expandSelected(true).collapseTree(true)
  });

});





