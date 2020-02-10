function pothole_map() {
  var myMap = L.map("map", {
      center: [38.9072, -77.0369],
      zoom: 13
    });
    
    // Adding tile layer
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: "pk.eyJ1IjoianhhdmllIiwiYSI6ImNrNjdvem1zZzFmMXYzbm5yeW51aHpycDMifQ.i5budp-6LFnJvFzl-nKhrw"
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

  d3.json(`/api/dc_potholes`, function(response) {
      //console.log(response);

       for (var i = 0; i < response.length; i++) {
           var lat = response[i].latitude;
           var long = response[i].longitude;
           var address = response[i].street_address;
           var status = response[i].service_order_status;
           console.log(lat);
           console.log(long);
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

// function bridge_map() {
//   var bridge_map = L.map("bridge_map", {
//     center: [38.9072, -77.0369],
//     zoom: 13
//   })
  
//   // Adding tile layer
//   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.dark",
//       accessToken: ""
//   }).addTo(bridge_map);

//   // Create a legend to display information about our map
//   var info = L.control({
//     position: "bottomright"
//   });

//   // When the layer control is added, insert a div with the class of "legend"
//   info.onAdd = function() {
//     var div = L.DomUtil.create("div", "legend");
//     return div;
//   };
//   // Add the info legend to the map
//   info.addTo(bridge_map);

// function state_map() {
//   var bridge_map = L.map("bridge_map", {
//     center: [34.1520, -85.6789],
//     zoom: 13
//   });
  
//   // Adding tile layer
//   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.comic",
//     accessToken: ""
// }).addTo(bridge_map);

// // Create a legend to display information about our map
// var info = L.control({
//   //position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(bridge_map);

//   d3.json(`/api/<state>`, function(response) {
//     //for(var i=0; i < response.length; i++) {
//       //console.log(response.Year_Built);

//       for (var i = 0; i < response.length; i++) {
//         var lat = response[i].Latitude;
//         var long = response[i].Longitdue;
//         var year = response[i].Year_Built;
//         //var status = response[i].service_order_status;
//         console.log("bridge: " + lat);
//         console.log("bridge: " +long);
//        if (lat) {
//         if (long) {
//           L.marker([lat, long]).addTo(bridge_map).bindPopup("Year Built" + year);
//         }
    
//       }
//     }
//   })
// }


// // function spending() {
// //   var spending_map = L.map("spending_map", {
// //     center: [38.9072, -77.0369],
// //     zoom: 13
// //   });
  
// //   // Adding tile layer
// //   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
// //       attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
// //       maxZoom: 18,
// //       id: "mapbox.satellite",
// //       accessToken: ""
// //   }).addTo(spending_map);

// //   // Create a legend to display information about our map
// //   var info = L.control({
// //     position: "bottomright"
// //   });

// //   // When the layer control is added, insert a div with the class of "legend"
// //   info.onAdd = function() {
// //     var div = L.DomUtil.create("div", "legend");
// //     return div;
// //   };
// //   // Add the info legend to the map
// //   info.addTo(spending_map);

// //   d3.json('/api/spending', function(response) {
// //     console.log(response);
// //   })
// // }

// pothole_map();
// //bridge_map();
// //spending();
// state_map();




