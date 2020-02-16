var API_KEY = d3.select("#cred").property("text").split(";")[0];
console.log(API_KEY);

// function to create a map
function stateMap(dataset) {
    
    var tunnelIcon = L.icon({
        iconUrl: "static/images/tunnel_icon.png",
        iconSize: [20, 20], // size of the icon
    });
      
    var bridgeIcon = L.icon({
        iconUrl: "static/images/bridge_icon.png",
        iconSize: [30, 30], // size of the icon
    });

    var location = dataset.Location;
    var bridges = dataset.Bridge_Data;
    var tunnels = dataset.Tunnel_Data;

    // state centerpoint coordinates
    var cp_latitude = location.Latitude;
    var cp_longitude = location.Longitude;

    // var bridgeMarkers = [];
    var bridgeLayer = L.markerClusterGroup();

    bridges.forEach(function(bridge) {
        var facility = bridge.Facility_Carried;
        var feature = bridge.Feature_Intersected;
        var latitude = bridge.Latitude;
        var longitude = 0 - bridge.Longitude;
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

        bridgeLayer.addLayer(bridgeMarker)
    });

    var tunnelMarkers = [];

    tunnels.forEach(function(tunnel) {
        
        var latitude = tunnel.Latitude;
        
        if(latitude) {
            var tunnelName = tunnel.Tunnel_Name;
            // var latitude = tunnel.Latitude;
            latitude = tunnel.Latitude;
            var longitude = tunnel.Longitude;
            var length = tunnel.Length;
            var yearBuilt = tunnel.Year_Built;
            var condition = tunnel.Condition;
    
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

    // define map object
    var map = L.map("state_map",{
        center: [cp_latitude, cp_longitude],
        zoom: 6,
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
    legend.addTo(map);

    L.control.layers(mapLayers, overlayMaps, {
        collapse: false
    }).addTo(map);
};



// DEFAULT DASHBOARD SETTINGS
// dynamically determine default state
var state = d3.select("#selState").property("value");
console.log(state);

// state data
var datasource = `/api/${state}`;

// create map based on selected state
d3.json(datasource).then((dataset) => stateMap(dataset));



// function to update map based on user input
function updateStateMap(dataset) {
    document.getElementById("state_map").remove();
    
    var parent_div = document.getElementById("state_map_parent")
    var div = document.createElement("div");
    div.setAttribute("id", "state_map");
    div.setAttribute("class", "card");
    div.setAttribute("style","padding:0; margin:0;");
    // as an example add it to the body
    parent_div.append(div);
    
    stateMap(dataset);
};