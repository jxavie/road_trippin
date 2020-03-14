var API_KEY = d3.select("#cred").property("text").split(";")[0];

// format number (1000s) with commas
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,');
  };

// Mapbox tile layer
var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery Â© <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 16,
    id: "mapbox.dark",
    accessToken: API_KEY
});

// add tile layer
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 16,
    id: "mapbox.light",
    accessToken: API_KEY
});

// Bridge layer
var bridge_layer;

// Tunnel layer
var tunnel_layer;

// Road layer
var road_layer;

// Function to 
function createUsMap(data) {
    // Initialize a choropleth map
    bridge_layer = L.choropleth(data, {
        // Property to visualize
        valueProperty: "Bridge_Count_Good",
        // Color scheme
        // scale: ['white', 'blue'],
        scale: ['#ffffff', '#4dd2ff'],
        // Number of classes
        steps: 5,
        // How to create the classes
        mode: 'q',
        // Feature styling
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        // Feature popup
        onEachFeature: function (feature, layer) {
            // var popupString = `<div class="card">
            //     <div class="card-header"><h3>${feature.properties.NAME}</h3></div>
            //     <div class="card-body">
            //     <div class="row">
            //         <div class="col-md-6">
            //         <p>Total Bridges</p><p>Good</p><p>Fair</p> <p>Poor</p>
            //         </div>
            //         <div class="col-md-6">
            //         <p>${feature.properties.bridge_count_all}</p>
            //         <p>${feature.properties.bridge_percentage_good}</p>
            //         <p>${feature.properties.bridge_percentage_fair}</p>
            //         <p>${feature.properties.bridge_percentage_poor}</p>
            //     </div>
            //     </div>
            //     </div>
            // </div>`;
            var popupString = "<div class='card' style='margin:0; padding:0; text-align:center; border:none;'>" + 
                "<strong style='font-size:12px'>" + feature.properties.NAME + " - Bridge Condition</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "</div>" + 
            "<div class='card' style='margin:0; padding:0; border:none;'>" +
                "<div class='row' style='border:none; margin:0; padding:0;'>" + 
                    "<div class='col-7' style='font-size:12px; margin:0; padding:0; text-align:left;'>" +
                        "Bridge Count: <br>" +
                        "Good: <br>" +
                        "Fair: <br>" +
                        "Poor: " +
                    "</div>" +
                    "<div class='col-5' style='font-size:12px; margin:0; padding:0; text-align:right;'>" +
                        formatNumber(feature.properties.Bridge_Count_All) + "<br>" +
                        feature.properties.Bridge_Count_Percent_Good.toFixed(2)+"%" + "<br>" +
                        feature.properties.Bridge_Count_Percent_Fair.toFixed(2)+"%" + "<br>" +
                        feature.properties.Bridge_Count_Percent_Poor.toFixed(2)+"%" +
                    "</div>" +
                "</div>" +
            "</div>"

            // Add a popup to the layer
            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                layer.setStyle({ 'color': 'green' });
                layer.openPopup();

            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                layer.setStyle({ 'color': 'black' });
            });
        }
    });

    // Tunnel layer
    tunnel_layer = L.choropleth(data, {
        // Property to visualize
        valueProperty: "Tunnel_Element_Count_Good",
        // Color scheme
        // scale: ['#e5f5e0', '#31a354'],
        scale: ["ffffff", '#d633ff'],
        steps: 5,
        // How to divide the values
        mode: 'q',
        // styling
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        // On each feature
        onEachFeature: function (feature, layer) {
            // var popupString = `<div class="card">
            //     <div class="card-header"><h3>${feature.properties.NAME} Tunnel Condition</h3></div>
            //     <div class="card-body">
            //     <div class="row">
            //         <div class="col-md-6">
            //         <p>Total Tunnels: </p><p>Good</p><p>Fair</p> <p>Poor</p><p>Severe</p>
            //         </div>
            //         <div class="col-md-6">
            //         <p>${feature.properties.total_tunnel_elements}</p>
            //         <p>${feature.properties.condition_percentage_good}</p>
            //         <p>${feature.properties.condition_percentage_fair}</p>
            //         <p>${feature.properties.condition_percentage_poor}</p>
            //         <p>${feature.properties.condition_percentage_severe}</p>
            //     </div>
            //     </div>
            //     </div>
            // </div>`;
            var popupString = "<div class='card' style='margin:0; padding:0; text-align:center; border:none;'>" + 
            "<strong style='font-size:12px'>" + feature.properties.NAME + " - Tunnel Condition</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "</div>" + 
            "<div class='card' style='margin:0; padding:0; border:none;'>" +
                "<div class='row' style='border:none; margin:0; padding:0;'>" + 
                    "<div class='col-7' style='font-size:12px; margin:0; padding:0; text-align:left;'>" +
                        "Element Count: <br>" +
                        "Good: <br>" +
                        "Fair: <br>" +
                        "Poor: <br>" +
                        "Severe: " +
                    "</div>" +
                    "<div class='col-5' style='font-size:12px; margin:0; padding:0; text-align:right;'>" +
                        formatNumber(feature.properties.Tunnel_Element_Count_All) + "<br>" +
                        feature.properties.Tunnel_Element_Percent_Good.toFixed(2)+"%" + "<br>" +
                        feature.properties.Tunnel_Element_Percent_Fair.toFixed(2)+"%" + "<br>" +
                        feature.properties.Tunnel_Element_Percent_Poor.toFixed(2)+"%" + "<br>" +
                        feature.properties.Tunnel_Element_Percent_Severe.toFixed(2)+"%" +
                    "</div>" +
                "</div>" +
            "</div>"

            layer.bindPopup(popupString);
            
            layer.on('mouseover', function(e){
            //    us_map.fitBounds(layer.getBounds());
               layer.setStyle({'color':'red'});
               layer.openPopup();
               
            });

            layer.on('mouseout',function(e){
                layer.closePopup();
                layer.setStyle({'color':'black'});
            });

        }
    });

    // Initialize a choropleth map
    road_layer = L.choropleth(data, {
        // Property to visualize
        valueProperty: "Road_Miles_Good_below95",
        // Color scheme
        // scale: ['white', 'blue'],
        scale: ['#ffffff', '#ffa31a'],
        // Number of classes
        steps: 5,
        // How to create the classes
        mode: 'q',
        // Feature styling
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        // Feature popup
        onEachFeature: function (feature, layer) {
            // var popupString = `<div class="card">
            //     <div class="card-header"><h3>${feature.properties.NAME}</h3></div>
            //     <div class="card-body">
            //     <div class="row">
            //         <div class="col-md-6">
            //         <p>Total Bridges</p><p>Good</p><p>Fair</p> <p>Poor</p>
            //         </div>
            //         <div class="col-md-6">
            //         <p>${feature.properties.bridge_count_all}</p>
            //         <p>${feature.properties.bridge_percentage_good}</p>
            //         <p>${feature.properties.bridge_percentage_fair}</p>
            //         <p>${feature.properties.bridge_percentage_poor}</p>
            //     </div>
            //     </div>
            //     </div>
            // </div>`;
            var popupString = "<div class='card' style='margin:0; padding:0; text-align:center; border:none;'>" + 
                "<strong style='font-size:12px'>" + feature.properties.NAME + " - Road Condition</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "</div>" + 
            "<div class='card' style='margin:0; padding:0; border:none;'>" +
                "<div class='row' style='border:none; margin:0; padding:0;'>" + 
                    "<div class='col-8' style='font-size:12px; margin:0; padding:0; text-align:left;'>" +
                        "Total Miles: <br>" +
                        "Good: <br>" +
                        "Fair: <br>" +
                        "Poor: <br>" +
                        "Not Reported: " +
                    "</div>" +
                    "<div class='col-4' style='font-size:12px; margin:0; padding:0; text-align:right;'>" +
                        formatNumber(feature.properties.Road_Miles_Total.toFixed(0)) + "<br>" +
                        feature.properties.Road_Percent_Good.toFixed(2)+"%" + "<br>" +
                        feature.properties.Road_Percent_Fair.toFixed(2)+"%" + "<br>" +
                        feature.properties.Road_Percent_Poor.toFixed(2)+"%" + "<br>" +
                        feature.properties.Road_Percent_NotReported.toFixed(2)+"%" +
                    "</div>" +
                "</div>" +
            "</div>"

            // Add a popup to the layer
            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                layer.setStyle({ 'color': 'orange' });
                layer.openPopup();

            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                layer.setStyle({ 'color': 'black' });
            });

        }
    });

    // define map object
    // var us_map = L.map('us_map').setView([41.320961, -104.052476], 4); 
    var us_map = L.map('us_map',{
        // center: [41.320961, -104.052476],
        center: [38.25, -97],
        zoom: 5,
        layers: [darkmap, tunnel_layer],
        fullscreenControl: true
    });

    // Create map legends 
    var bridgeLegend = L.control({ position: 'bottomleft' });
    bridgeLegend.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_us');
        var colors = bridge_layer.options.colors;
        var limits = bridge_layer.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Total Good Bridge Count</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + formatNumber(limits[limits.length - 1]) + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    }

    // bridgeLegend.addTo(us_map);

    // Tunnel legend
    var tunnelLegend = L.control({ position: 'bottomleft'});

    tunnelLegend.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'legend_us');
        var colors = tunnel_layer.options.colors;
        var limits = tunnel_layer.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Total Good Tunnel Count</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + formatNumber(limits[limits.length - 1]) + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    }

    tunnelLegend.addTo(us_map);

    // Create map legends 
    var roadLegend = L.control({ position: 'bottomleft' });
    roadLegend.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_us');
        var colors = road_layer.options.colors;
        var limits = road_layer.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Total Good Road Miles</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0].toFixed(0) + "</div>" +
            "<div class=\"max\">" + formatNumber(limits[limits.length - 1].toFixed(0)) + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    }
       
    // Overlays object
    var overlays = {
        'Tunnel Condition': tunnel_layer,
        'Bridge Condition': bridge_layer,
        'Road Condition': road_layer
    };

    // Baselayers object
    var baselayers = {
        'Dark':darkmap,
        'Light': lightmap
    };

    // Add the overlay control to the map
    L.control.layers(baselayers,overlays).addTo(us_map);

    // Map events to add and remove the legends
    us_map.on('overlayadd', function (layer, name) {
        // console.log(name, layer);

        if (layer.name == "Tunnel Condition") {
            us_map.addControl(tunnelLegend);
            us_map.removeLayer(bridge_layer);
            us_map.removeLayer(road_layer);
            us_map.removeControl(bridgeLegend);
            us_map.removeControl(roadLegend);
        }
        else if (layer.name == "Road Condition") {
            us_map.addControl(roadLegend);
            us_map.removeLayer(bridge_layer);
            us_map.removeLayer(tunnel_layer);
            us_map.removeControl(bridgeLegend);
            us_map.removeControl(tunnelLegend);
        }
        else {
            us_map.addControl(bridgeLegend);
            us_map.removeLayer(tunnel_layer);
            us_map.removeLayer(road_layer);
            us_map.removeControl(tunnelLegend);
            us_map.removeControl(roadLegend);
        }

    });
};

// Load data using jquery geojson
$.getJSON('../static/data/infrastructure_condition_2018.json', function (data) {
    // datasource = data;
    // features = data.features;
    // console.log(features[0].properties.Bridge_Count_All);
    createUsMap(data);
});
