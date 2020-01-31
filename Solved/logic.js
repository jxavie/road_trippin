// State center points
centerpoints = [
  {
      "State": "Alabama",
      "Latitude": 32.7794,
      "Longitude": -86.8287
  },
  {
      "State": "Alaska",
      "Latitude": 64.0685,
      "Longitude": -152.2782
  },
  {
      "State": "Arizona",
      "Latitude": 34.2744,
      "Longitude": -111.6602
  },
  {
      "State": "Arkansas",
      "Latitude": 34.8938,
      "Longitude": -92.4426
  },
  {
      "State": "California",
      "Latitude": 37.1841,
      "Longitude": -119.4696
  },
  {
      "State": "Colorado",
      "Latitude": 38.9972,
      "Longitude": -105.5478
  },
  {
      "State": "Connecticut",
      "Latitude": 41.6219,
      "Longitude": -72.7273
  },
  {
      "State": "Delaware",
      "Latitude": 38.9896,
      "Longitude": -75.505
  },
  {
      "State": "District of Columbia",
      "Latitude": 38.9101,
      "Longitude": -77.0147
  },
  {
      "State": "Florida",
      "Latitude": 28.6305,
      "Longitude": -82.4497
  },
  {
      "State": "Georgia",
      "Latitude": 32.6415,
      "Longitude": -83.4426
  },
  {
      "State": "Hawaii",
      "Latitude": 20.2927,
      "Longitude": -156.3737
  },
  {
      "State": "Idaho",
      "Latitude": 44.3509,
      "Longitude": -114.613
  },
  {
      "State": "Illinois",
      "Latitude": 40.0417,
      "Longitude": -89.1965
  },
  {
      "State": "Indiana",
      "Latitude": 39.8942,
      "Longitude": -86.2816
  },
  {
      "State": "Iowa",
      "Latitude": 42.0751,
      "Longitude": -93.496
  },
  {
      "State": "Kansas",
      "Latitude": 38.4937,
      "Longitude": -98.3804
  },
  {
      "State": "Kentucky",
      "Latitude": 37.5347,
      "Longitude": -85.3021
  },
  {
      "State": "Louisiana",
      "Latitude": 31.0689,
      "Longitude": -91.9968
  },
  {
      "State": "Maine",
      "Latitude": 45.3695,
      "Longitude": -69.2428
  },
  {
      "State": "Maryland",
      "Latitude": 39.055,
      "Longitude": -76.7909
  },
  {
      "State": "Massachusetts",
      "Latitude": 42.2596,
      "Longitude": -71.8083
  },
  {
      "State": "Michigan",
      "Latitude": 44.3467,
      "Longitude": -85.4102
  },
  {
      "State": "Minnesota",
      "Latitude": 46.2807,
      "Longitude": -94.3053
  },
  {
      "State": "Mississippi",
      "Latitude": 32.7364,
      "Longitude": -89.6678
  },
  {
      "State": "Missouri",
      "Latitude": 38.3566,
      "Longitude": -92.458
  },
  {
      "State": "Montana",
      "Latitude": 47.0527,
      "Longitude": -109.6333
  },
  {
      "State": "Nebraska",
      "Latitude": 41.5378,
      "Longitude": -99.7951
  },
  {
      "State": "Nevada",
      "Latitude": 39.3289,
      "Longitude": -116.6312
  },
  {
      "State": "New Hampshire",
      "Latitude": 43.6805,
      "Longitude": -71.5811
  },
  {
      "State": "New Jersey",
      "Latitude": 40.1907,
      "Longitude": -74.6728
  },
  {
      "State": "New Mexico",
      "Latitude": 34.4071,
      "Longitude": -106.1126
  },
  {
      "State": "New York",
      "Latitude": 42.9538,
      "Longitude": -75.5268
  },
  {
      "State": "North Carolina",
      "Latitude": 35.5557,
      "Longitude": -79.3877
  },
  {
      "State": "North Dakota",
      "Latitude": 47.4501,
      "Longitude": -100.4659
  },
  {
      "State": "Ohio",
      "Latitude": 40.2862,
      "Longitude": -82.7937
  },
  {
      "State": "Oklahoma",
      "Latitude": 35.5889,
      "Longitude": -97.4943
  },
  {
      "State": "Oregon",
      "Latitude": 43.9336,
      "Longitude": -120.5583
  },
  {
      "State": "Pennsylvania",
      "Latitude": 40.8781,
      "Longitude": -77.7996
  },
  {
      "State": "Rhode Island",
      "Latitude": 41.6762,
      "Longitude": -71.5562
  },
  {
      "State": "South Carolina",
      "Latitude": 33.9169,
      "Longitude": -80.8964
  },
  {
      "State": "South Dakota",
      "Latitude": 44.4443,
      "Longitude": -100.2263
  },
  {
      "State": "Tennessee",
      "Latitude": 35.858,
      "Longitude": -86.3505
  },
  {
      "State": "Texas",
      "Latitude": 31.4757,
      "Longitude": -99.3312
  },
  {
      "State": "Utah",
      "Latitude": 39.3055,
      "Longitude": -111.6703
  },
  {
      "State": "Vermont",
      "Latitude": 44.0687,
      "Longitude": -72.6658
  },
  {
      "State": "Virginia",
      "Latitude": 37.5215,
      "Longitude": -78.8537
  },
  {
      "State": "Washington",
      "Latitude": 47.3826,
      "Longitude": -120.4472
  },
  {
      "State": "West Virginia",
      "Latitude": 38.6409,
      "Longitude": -80.6227
  },
  {
      "State": "Wisconsin",
      "Latitude": 44.6243,
      "Longitude": -89.9941
  },
  {
      "State": "Wyoming",
      "Latitude": 42.9957,
      "Longitude": -107.5512
  }
];

console.log(centerpoints[0]['State'])

// Create a map object
// Chanhe center based on state selected!
var myMap = L.map("map", {
  center: [centerpoints[8]['Latitude'], centerpoints[8]['Longitude']],
  zoom: 11
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(myMap);

var tunnelIcon = L.icon({
  iconUrl: 'tunnel_icon.png',
  iconSize: [20, 20], // size of the icon
});

var bridgeIcon = L.icon({
  iconUrl: 'bridge_icon.png',
  iconSize: [30, 30], // size of the icon
});

// tunnel points
tunnels_data = [
  {
      "Tunnel_Name": "Hope Street Tunnel",
      "State_Code": "California",
      "Latitude": 34.04833889,
      "Longitude": -118.2572556,
      "Route_Type": "City Street",
      "Year_Built": 1972,
      "Lanes": 4,
      "Length": 75,
      "Condition": 2
  },
  {
      "Tunnel_Name": "12th St SW Tunnel at Southwest Fwy",
      "State_Code": "District of Columbia",
      "Latitude": 38.88277778,
      "Longitude": -77.02805556,
      "Route_Type": "City Street",
      "Year_Built": 1959,
      "Lanes": 4,
      "Length": 295,
      "Condition": 2
  },
  {
      "Tunnel_Name": "South Capitol Avenue under CSX RR and Other Items",
      "State_Code": "Indiana",
      "Latitude": 39.76291,
      "Longitude": 86.161866,
      "Route_Type": "City Street",
      "Year_Built": 1888,
      "Lanes": 4,
      "Length": 353,
      "Condition": 13
  },
  {
      "Tunnel_Name": "Illinois Street under CSX RR and Other Items",
      "State_Code": "Indiana",
      "Latitude": 39.762042,
      "Longitude": 86.160099,
      "Route_Type": "City Street",
      "Year_Built": 1888,
      "Lanes": 4,
      "Length": 310,
      "Condition": 4
  }
];

// Loop through the tunnels array and create one marker for each tunnel, bind a popup and add it to the map
for (var i = 0; i < tunnels_data.length; i++) {
  var tunnel = tunnels_data[i];
  L.marker([tunnel.Latitude,tunnel.Longitude], {icon: tunnelIcon})
    .bindPopup("<h4>" + tunnel.Tunnel_Name +
    "</h2> <hr> <p font color='LightGray' size='3'>Route Type: " + tunnel.Route_Type +
    "</p> <p font color='LightGray' size='3'>Year Built: " + tunnel.Year_Built +
    "</p> <p font color='LightGray' size='3'>Lanes: " + tunnel.Lanes +
    "</p> <p font color='LightGray' size='3'>Length: " + tunnel.Length +
    "</p> <p font color='LightGray' size='3'>Poor/Severe Elements: " + tunnel.Condition + "</p>")
    .addTo(myMap);
};

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["Tunnel", "Bridge"],
        labels = ["tunnel_icon.png","bridge_icon.png"];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
         (" <img src="+ labels[i] +" height='30' width='30'>") + "<font color='LightGray' size='5'>    " + grades[i] + "</font>"  +'<br>';
    }

    return div;
};

legend.addTo(myMap);
