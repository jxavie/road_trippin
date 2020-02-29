// var API_KEY = d3.select("#cred").property("text").split(";")[0];

// function to create a map
function stateMap(dataset, state) {
    
    var tunnelIcon = L.icon({
        iconUrl: "static/images/tunnel_icon.png",
        iconSize: [20, 20], // size of the icon
    });
      
    var bridgeIcon = L.icon({
        iconUrl: "static/images/bridge_icon.png",
        iconSize: [30, 30], // size of the icon
    });

    var location = dataset.Location;
    var bounds = dataset.State_Bounds;
    var bridges = dataset.Bridge_Data;
    var tunnels = dataset.Tunnel_Data;

    // state centerpoint coordinates
    var cp_latitude = location.Latitude;
    var cp_longitude = location.Longitude;

    // extreme state latitude and longitude
    var northernExtreme = bounds.NorthBoundary;
    var southernExtreme = bounds.SouthBoundary;
    var westernExtreme = bounds.WestBoundary;
    var easternExtreme = bounds.EastBoundary;
    console.log(northernExtreme);
    console.log(southernExtreme);
    console.log(westernExtreme);
    console.log(easternExtreme);

    // var bridgeMarkers = [];
    var bridgeLayer = L.markerClusterGroup();

    var bridge_lat = [];
    var bridge_long = [];

    bridges.forEach(function(bridge) {
        
        var latitude = bridge.Latitude;
        var longitude = 0 - bridge.Longitude;

        bridge_lat.push(latitude);
        bridge_long.push(longitude);


        if (latitude) {
            if (longitude) {
                // format latitude to reflect correct sign
                if (latitude < 0 ) {
                    latitude = latitude * -1;
                }
                else {
                    latitude;
                };

                // format longitude to reflect correct sign
                if (longitude < 0) {
                    longitude;
                }
                else {
                    longitude = longitude * -1;
                };

                if (latitude <= northernExtreme && latitude >= southernExtreme) {
                    if (longitude >= westernExtreme && longitude <= easternExtreme) {
                        var facility = bridge.Facility_Carried;
                        var feature = bridge.Feature_Intersected;
                        // var latitude = bridge.Latitude;
                        // var longitude = 0 - bridge.Longitude;
                        // var condition = bridge.Score.split(" ")[0];
                        var condition = bridge.Score;
                        var strType = bridge.Structure_Kind;
                        var yearBuilt = bridge.Year_Built;
                
                        var bridgeMarker = L.marker([latitude, longitude], {icon: bridgeIcon})
                        // .bindPopup("<strong style='font-size:12px;'>" + facility + " over " + feature + "</strong><hr 'style=padding-bottom:0;'>" +
                        .bindPopup("<strong style='font-size:12px;'>" + facility + " over " + feature + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
                            "Latitude:  " + latitude + "<br>" +
                            "Longitude:  " + longitude + "<br>" +
                            "Structure Type:  " + strType + "<br>" +
                            "Year Built:  " + yearBuilt + "<br>" +
                            "Condition:  " + condition + "<br>"
                        );
                
                        bridgeLayer.addLayer(bridgeMarker);
                    };
                };
            };
        };

        // if (latitude < 0) {
        //     latitude = latitude * -1;
        // }
        // else {
        //     latitude;
        // };

        // if (longitude < 0) {
        //     longitude;
        // }
        // else {
        //     longitude = longitude * -1;
        // };

        // if (latitude) {
        //     if (longitude) {
        //         var facility = bridge.Facility_Carried;
        //         var feature = bridge.Feature_Intersected;
        //         // var latitude = bridge.Latitude;
        //         // var longitude = 0 - bridge.Longitude;
        //         // var condition = bridge.Score.split(" ")[0];
        //         var condition = bridge.Score;
        //         var strType = bridge.Structure_Kind;
        //         var yearBuilt = bridge.Year_Built;
        
        //         var bridgeMarker = L.marker([latitude, longitude], {icon: bridgeIcon})
        //         // .bindPopup("<strong style='font-size:12px;'>" + facility + " over " + feature + "</strong><hr 'style=padding-bottom:0;'>" +
        //         .bindPopup("<strong style='font-size:12px;'>" + facility + " over " + feature + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
        //             "Latitude:  " + latitude + "<br>" +
        //             "Longitude:  " + longitude + "<br>" +
        //             "Structure Type:  " + strType + "<br>" +
        //             "Year Built:  " + yearBuilt + "<br>" +
        //             "Condition:  " + condition + "<br>"
        //         );
        
        //         bridgeLayer.addLayer(bridgeMarker)
        //     };
        // };
    });

    console.log(bridge_lat);
    console.log(bridge_long);

    var tunnelMarkers = [];

    tunnels.forEach(function(tunnel) {
        
        var latitude = tunnel.Latitude;
        
        if(latitude) {
            var tunnelName = tunnel.Tunnel_Name;
            // var latitude = tunnel.Latitude;
            // latitude = tunnel.Latitude;
            var longitude = tunnel.Longitude;
            var length = tunnel.Length;
            var yearBuilt = tunnel.Year_Built;
            var condition = tunnel.Condition;

            if (latitude < 0) {
                latitude = latitude * -1;
            }
            else {
                latitude;
            };

            if (longitude < 0) {
                longitude;
            }
            else {
                longitude = longitude * -1;
            };
    
            var tunnelMarker = L.marker([latitude, longitude], {icon: tunnelIcon})
            // .bindPopup("<strong style='font-size:12px;'>" + tunnelName + "</strong><hr 'style=padding-bottom:0;'>" +
            .bindPopup("<strong style='font-size:12px;'>" + tunnelName + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
                "Latitude:  " + latitude + "<br>" +
                "Longitude:  " + longitude + "<br>" +
                "Length:  " + length + "<br>" +
                "Year Built:  " + yearBuilt + "<br>" +
                "Condition:  " + condition + "<br>" 
            );
    
            tunnelMarkers.push(tunnelMarker);
        };

    });

    var tunnelLayer = L.layerGroup(tunnelMarkers);

    // add tile layer
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    // add tile layer
    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    })

    // add tile layer
    var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
    })

    // add tile layer
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    })

    var mapLayers = {
        "Dark": darkmap,
        "Light": lightmap,
        "Outdoors": outdoormap,
        "Satellite": satellitemap
    };

    var overlayMaps = {
        "Tunnels": tunnelLayer,
        "Bridges" : bridgeLayer
    };

    // map zoom
    // var mapZoom = 6;
    var mapZoom = state_zoom[state];

    // if (state_maxDim[state] < 100) {
    //     mapZoom = 9;
    // }
    // else if (state_maxDim[state] < 250) {
    //     mapZoom = 8;
    // }
    // else if (state_maxDim[state] < 500) {
    //     mapZoom = 7;
    // }
    // else if (state_maxDim[state] < 750) {
    //     mapZoom = 6;
    // }
    // else if (state_maxDim[state] < 1000) {
    //     mapZoom = 5;
    // }
    // else {
    //     mapZoom = 4;
    // };
    console.log(state);
    // console.log(state_maxDim[state]);
    console.log(mapZoom);

    // define map object
    var statemap = L.map("state_map",{
        center: [cp_latitude, cp_longitude],
        zoom: mapZoom,
        layers: [darkmap, tunnelLayer]
    });

    // create legend
    var legend = L.control({position: "bottomright"});

    // insert div with class of legend when layer control is added
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend_state");
        var structure = ["Tunnel", "Bridge"];
        var labels = ["static/images/tunnel_icon.png","static/images/bridge_icon.png"];

        for (var i = 0; i < structure.length; i++) {
            div.innerHTML += ("<img src=" + labels[i] + " class='state_icon'>") + structure[i] + "<br>";
        }

        return div;
    };

    // add legend to map
    legend.addTo(statemap);

    L.control.layers(mapLayers, overlayMaps, {
        collapse: false
    }).addTo(statemap);

};



// DEFAULT DASHBOARD SETTINGS
// dynamically determine dropdown selection
var state = d3.select("#selState").property("value");
console.log(state);

// state data
var datasource = `/api/${state}`;

// create map based on selected state
d3.json(datasource).then((dataset) => stateMap(dataset, state));



// function to update map based on user input
function updateStateMap(dataset, state) {
    document.getElementById("state_map").remove();
    
    var parent_div = document.getElementById("state_map_parent")
    var div = document.createElement("div");
    div.setAttribute("id", "state_map");
    div.setAttribute("class", "card");
    div.setAttribute("style","padding:0; margin:0;");
    // as an example add it to the body
    parent_div.append(div);
    
    stateMap(dataset, state);
};