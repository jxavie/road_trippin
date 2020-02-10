// define default state
var state = "AL";

var datasource = `/api/${state}`;

// select divs for displaying state data
var state_map = d3.select("#state_map");


function createMap(bridgeLocations) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
  
    var comicmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.comic",
      accessToken: API_KEY
    });
  
    var mapLayers = {
      Light: lightmap,
      Dark: darkmap,
      Comic: comicmap
    }
  
    // Create an overlayMaps object to hold the bridges and tunnels layer
    var overlayMaps = {
    //   "Bridges": bridges,
      "Tunnels": tunnels
    };
  
    // Create the map object with options
    var map = L.map("state_map", {
      center: [32.7794, -86.8287],
      zoom: 12,
      layers: [darkmap, bridgeLocations]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(mapLayers, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "bridges" property off of response.data
    var bridges = response.Bridge_Data;
    console.log(bridges[0]);
  
    // Initialize an array to hold bridge markers
    var bridgeMarkers = [];
  
    // Loop through the stations Bridge_Data array
    for (var index = 0; index < bridges.length; index++) {
      var bridge = bridges[index];
  
      // For each bridge, create a marker and bind a popup with the bridge information
      var bridgeMarker = L.marker([bridges.Latitude, bridges.Longitude])
        .bindPopup("<h3>" + bridges.Facility_Carried.trim() + " over " + bridges.Feature_Intersected.trim() + "<h3>\
                    <h3>Type:" + bridges.Structure_Kind + "<h3>\
                    <h3>Year Built: " + bridges.Year_Built + "<h3>\
                    <h3>Condition: " + bridges.Score + "<h3>\
                    <h3>Capacity: " + bridges.capacity + "<h3>");
  
      // Add the marker to the bridgeMarkers array
      bridgeMarkers.push(bridgeMarker);
    }

    // Pull the "bridges" property off of response.data
    var tunnels = response.Tunnel_Data;
  
    // Initialize an array to hold bridge markers
    var tunnelMarkers = [];
  
    // Loop through the stations Bridge_Data array
    for (var index = 0; index < tunels.length; index++) {
      var tunnel = tunnels[index];
  
      // For each bridge, create a marker and bind a popup with the bridge information
      var tunnelMarker = L.marker([tunnel.Latitude, tunnel.Longitude])
        .bindPopup("<h4>" + tunnel.Tunnel_Name +
            "</h2> <hr> <p font color='LightGray' size='3'>Route Type: " + tunnel.Route_Type +
            "</p> <p font color='LightGray' size='3'>Year Built: " + tunnel.Year_Built +
            "</p> <p font color='LightGray' size='3'>Lanes: " + tunnel.Lanes +
            "</p> <p font color='LightGray' size='3'>Length: " + tunnel.Length +
            "</p> <p font color='LightGray' size='3'>Poor/Severe Elements: " + tunnel.Condition + "</p>");
  
      // Add the marker to the bridgeMarkers array
      tunnelMarkers.push(tunnelMarker);
    }

    console.log(tunnels[0])
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(tunnelMarkers));
  }

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json(datasource, createMarkers);



// d3.json(datasource).then((dataset) => {

//     // assign features data to variable
//     var features = dataset.features;

//     // initialize array to store state names
//     var state_names = []

//     // store state names to array
//     features.forEach((state) => {
//         state_names.push(state.properties.NAME)
//     });
//     console.log(state_names);

// });