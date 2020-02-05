var datasource;
// select div for displaying US map
var us_map = L.map('us_map').setView([41.320961, -104.052476], 4);

// Mapbox tile layer
var mapbox = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery Â© <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 16,
    id: "mapbox.dark",
    accessToken: "pk.eyJ1IjoianhhdmllIiwiYSI6ImNrNjdvem1zZzFmMXYzbm5yeW51aHpycDMifQ.i5budp-6LFnJvFzl-nKhrw"
}).addTo(us_map);

// Load data using jquery geojson
$.getJSON('../static/data/infrastructure_condition_2018.json', function (data) {
    datasource = data;
    createUsMap(datasource);
});

// Bridge layer
var us_geojson;

// Tunnel layer
var tunnel_layer;

// Function to 
function createUsMap(data) {
    // Initialize a choropleth map
    us_geojson = L.choropleth(data, {
        // Property to visualize
        valueProperty: "bridge_count_good",
        // Color scheme
        scale: ['white', 'blue'],
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
            var popupString = `<div class="card">
                <div class="card-header"><h3>${feature.properties.NAME}</h3></div>
                <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                    <p>Total Bridges</p><p>Good</p><p>Fair</p> <p>Poor</p>
                    </div>
                    <div class="col-md-6">
                    <p>${feature.properties.bridge_count_all}</p>
                    <p>${feature.properties.bridge_percentage_good}</p>
                    <p>${feature.properties.bridge_percentage_fair}</p>
                    <p>${feature.properties.bridge_percentage_poor}</p>
                </div>
                </div>
                </div>
            </div>`;

            // Add a popup to the layer
            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                layer.setStyle({ 'color': 'green' });
                layer.openPopup();

            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                layer.setStyle({ 'color': '#fff' });
            });

        }
    });

    // Tunnel layer
    tunnel_layer = L.choropleth(data, {
        // Property to visualize
        valueProperty: "tunnel_condition_good",
        // Color scheme
        scale: ['#e5f5e0', '#31a354'],
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
            var popupString = `<div class="card">
                <div class="card-header"><h3>${feature.properties.NAME} Tunnel Condition</h3></div>
                <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                    <p>Total Tunnels: </p><p>Good</p><p>Fair</p> <p>Poor</p><p>Severe</p>
                    </div>
                    <div class="col-md-6">
                    <p>${feature.properties.total_tunnel_elements}</p>
                    <p>${feature.properties.condition_percentage_good}</p>
                    <p>${feature.properties.condition_percentage_fair}</p>
                    <p>${feature.properties.condition_percentage_poor}</p>
                    <p>${feature.properties.condition_percentage_severe}</p>
                </div>
                </div>
                </div>
            </div>`;
            layer.bindPopup(popupString);
            
            layer.on('mouseover', function(e){
            //    us_map.fitBounds(layer.getBounds());
               layer.setStyle({'color':'red'});
               layer.openPopup();
               
            });

            layer.on('mouseout',function(e){
                layer.closePopup();
                layer.setStyle({'color':'#fff'});
            });

        }
    }).addTo(us_map);

    // Create map legends 
    var bridgeLegend = L.control({ position: 'bottomright' });
    bridgeLegend.onAdd = function(map){
        this._div = L.DomUtil.create('div','info legend');
        var colors = us_geojson.options.colors;
        var limits = us_geojson.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<h3>Total Good Bridge Count</h3>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
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
    var tunnel_legend = L.control({ position: 'bottomleft'});

    tunnel_legend.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'info legend');
        var colors = tunnel_layer.options.colors;
        var limits = tunnel_layer.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<h3>Total Good Tunnel Count</h3>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    }

    tunnel_legend.addTo(us_map);
       
    // Overlays object
    var overlays = {
        'Bridges Condition': us_geojson,
        'Tunnel Condition': tunnel_layer
    };

    // Baselayers object
    var baselayers = {
        'Map Box Street':mapbox
    };

    // Add the overlay control to the map
    L.control.layers(baselayers,overlays).addTo(us_map);

    // Map events to add and remove the legends
    us_map.on('overlayadd', function (layer, name) {
        // console.log(name, layer);

        if (layer.name == "Tunnel Condition") {
            us_map.addControl(tunnel_legend);

            us_map.removeLayer(us_geojson);
            us_map.removeControl(bridgeLegend);

        }
        else {
            us_map.addControl(bridgeLegend);

            us_map.removeLayer(tunnel_layer);
            us_map.removeControl(tunnel_legend);
        }

    });
}


