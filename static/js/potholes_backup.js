function pothole_map() {
  var myMap = L.map("pothole_map", {
      center: [38.9072, -77.0369],
      zoom: 11
    });
    
    // Adding tile layer
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
  }).addTo(myMap);

  // Create a legend to display information about our map
  var info = L.control({
    //position: "bottomright"
  });

  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(myMap);


    //myMap.addLayer(layer);

  d3.json(`/api/dc_potholes`).then((response) => {
      //console.log(response);

       for (var i = 0; i < response.length; i++) {
           var lat = response[i].latitude;
           var long = response[i].longitude;
           var address = response[i].street_address;
           var status = response[i].service_order_status;
          //  console.log(lat);
          //  console.log(long);
          if (lat) {
            if (long) {
              L.marker([lat, long]).addTo(myMap).bindPopup(address + "<hr>Status:" + status);
              //.bindPopup(response[i].street_address)
           }
         }
        }

        // var heat = L.heatLayer(heatArray, {
        //   radius: 20,
        //   blur: 35
        // }).addTo(myMap);
  })
}

pothole_map();




