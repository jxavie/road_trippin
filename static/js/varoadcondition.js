var slider = $("#slider")
var handle = $("#custom-handle");
var play = $("#play");

// Define min and max values for slider
$(slider).slider({
    min:2013,
    max: 2029
})

// Set values for slider display
$(slider).slider({
    create: function() {
        handle.text( $( this ).slider( "value" ) );
    },
    slide: function( event, ui ) {
        handle.text( ui.value );
    }
});

// Define default year
// Retrieve user input
$(function() {
    $(slider).slider( "value", 2013 );

    $(slider).on('slide', function(event, ui) {
        var selection = ui.value;
        console.log(selection);
    });
});

// format number (1000s) with commas
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,');
};

// add tile layer
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 16,
    id: "mapbox.light",
    accessToken: API_KEY
});

// add tile layer
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 16,
    id: "mapbox.streets",
    accessToken: API_KEY
});

var layer2013;
var layer2014;
var layer2015;
var layer2016;
var layer2017;
var layer2018;
var layer2019;
var layer2020;
var layer2021;
var layer2022;
var layer2023;
var layer2024;
var layer2025;
var layer2026;
var layer2027;
var layer2028;
var layer2029;

function createMLMap(data) {

    layer2013 = L.choropleth(data, {
        valueProperty: "YR_2013",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {
            // var popupString = "<div class='card' style='margin:0; padding:0; text-align:center; border:none;'>" + 
            // "<strong style='font-size:12px'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            // "</div>" + 
            // "<div class='card' style='margin:0; padding:0; border:none;'>" +
            // "<div class='row' style='border:none; margin:0; padding:0;'>" + 
            //     "<div class='col-7' style='font-size:12px; margin:0; padding:0; text-align:left;'>" +
            //         "2013 IRI: " +
            //     "</div>" +
            //     "<div class='col-5' style='font-size:12px; margin:0; padding:0; text-align:right;'>" +
            //         feature.properties.YR_2013.toFixed(2) +
            //     "</div>" +
            // "</div>" 

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2013 IRI:  " + feature.properties.YR_2013.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2014 = L.choropleth(data, {
        valueProperty: "YR_2014",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {
            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2014 IRI:  " + feature.properties.YR_2014.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2015 = L.choropleth(data, {
        valueProperty: "YR_2015",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2015 IRI:  " + feature.properties.YR_2015.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2016 = L.choropleth(data, {
        valueProperty: "YR_2016",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2016 IRI:  " + feature.properties.YR_2016.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2017 = L.choropleth(data, {
        valueProperty: "YR_2017",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2017 IRI:  " + feature.properties.YR_2017.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2018 = L.choropleth(data, {
        valueProperty: "YR_2018",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2018 IRI:  " + feature.properties.YR_2018.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2019 = L.choropleth(data, {
        valueProperty: "YR_2019",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2019 IRI:  " + feature.properties.YR_2019.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2020 = L.choropleth(data, {
        valueProperty: "YR_2020",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2020 IRI:  " + feature.properties.YR_2020.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2021 = L.choropleth(data, {
        valueProperty: "YR_2021",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2021 IRI:  " + feature.properties.YR_2021.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2022 = L.choropleth(data, {
        valueProperty: "YR_2022",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2022 IRI:  " + feature.properties.YR_2022.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2023 = L.choropleth(data, {
        valueProperty: "YR_2023",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2023 IRI:  " + feature.properties.YR_2023.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2024 = L.choropleth(data, {
        valueProperty: "YR_2024",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2024 IRI:  " + feature.properties.YR_2024.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2025 = L.choropleth(data, {
        valueProperty: "YR_2025",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2025 IRI:  " + feature.properties.YR_2025.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2026 = L.choropleth(data, {
        valueProperty: "YR_2026",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2026 IRI:  " + feature.properties.YR_2026.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2027 = L.choropleth(data, {
        valueProperty: "YR_2027",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2027 IRI:  " + feature.properties.YR_2027.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2028 = L.choropleth(data, {
        valueProperty: "YR_2028",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2028 IRI:  " + feature.properties.YR_2028.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    layer2029 = L.choropleth(data, {
        valueProperty: "YR_2029",
        scale: ['red', 'green'],
        steps: 5,
        mode: "q",
        style: {
            weight: 1,
            color: '#00000070',
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {

            var popupString = "<strong style='font-size:12px;'>" + feature.properties.County + "</strong><hr style='margin-top:5px; margin-bottom:5px;'>" +
            "2029 IRI:  " + feature.properties.YR_2029.toFixed(2)

            layer.bindPopup(popupString);
            layer.on('mouseover', function (e) {
                // layer.setStyle({ 'color': 'white' });
                layer.openPopup();
            });

            layer.on('mouseout', function (e) {
                layer.closePopup();
                // layer.setStyle({ 'color': 'black' });
            });
        }
    });

    var ml_map = L.map('ml_map',{
        center: [37.43, -78.66],
        zoom: 7,
        layers: [lightmap, layer2013],
        fullscreenControl: true
    });
    
    var legend2013 = L.control({ position: 'bottomleft' });
    legend2013.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2013.options.colors;
        var limits = layer2013.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    legend2013.addTo(ml_map);

    var legend2014 = L.control({ position: 'bottomleft' });
    legend2014.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2014.options.colors;
        var limits = layer2014.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2015 = L.control({ position: 'bottomleft' });
    legend2015.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2015.options.colors;
        var limits = layer2015.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2016 = L.control({ position: 'bottomleft' });
    legend2016.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2016.options.colors;
        var limits = layer2016.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2017 = L.control({ position: 'bottomleft' });
    legend2017.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2017.options.colors;
        var limits = layer2017.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2018 = L.control({ position: 'bottomleft' });
    legend2018.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2018.options.colors;
        var limits = layer2018.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2019 = L.control({ position: 'bottomleft' });
    legend2019.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2019.options.colors;
        var limits = layer2019.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2020 = L.control({ position: 'bottomleft' });
    legend2020.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2020.options.colors;
        var limits = layer2020.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2021 = L.control({ position: 'bottomleft' });
    legend2021.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2021.options.colors;
        var limits = layer2021.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2022 = L.control({ position: 'bottomleft' });
    legend2022.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2022.options.colors;
        var limits = layer2022.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2023 = L.control({ position: 'bottomleft' });
    legend2023.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2023.options.colors;
        var limits = layer2023.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2024 = L.control({ position: 'bottomleft' });
    legend2024.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2024.options.colors;
        var limits = layer2024.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2025 = L.control({ position: 'bottomleft' });
    legend2025.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2025.options.colors;
        var limits = layer2025.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2026 = L.control({ position: 'bottomleft' });
    legend2026.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2026.options.colors;
        var limits = layer2026.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2027 = L.control({ position: 'bottomleft' });
    legend2027.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2027.options.colors;
        var limits = layer2027.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2028 = L.control({ position: 'bottomleft' });
    legend2028.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2028.options.colors;
        var limits = layer2028.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var legend2029 = L.control({ position: 'bottomleft' });
    legend2029.onAdd = function(map){
        this._div = L.DomUtil.create('div','legend_ml');
        var colors = layer2029.options.colors;
        var limits = layer2029.options.limits;

        var labels = [];
        // Add min & max
        var legendInfo = "<div style='font-size:16px; margin-bottom:10px; font-weight:bold;'>Road Condition (IRI)</div>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + 0 + "</div>" +
            "<div class=\"max\">" + 200 + "</div>" +
            "</div>";

        this._div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        this._div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return this._div;
    };

    var overlays = {
        '2013 Condition': layer2013,
        '2014 Condition': layer2014,
        '2015 Condition': layer2015,
        '2016 Condition': layer2016,
        '2017 Condition': layer2017,
        '2018 Condition': layer2018,
        '2019 Condition': layer2019,
        '2020 Condition': layer2020,
        '2021 Condition': layer2021,
        '2022 Condition': layer2022,
        '2023 Condition': layer2023,
        '2024 Condition': layer2024,
        '2025 Condition': layer2025,
        '2026 Condition': layer2026,
        '2027 Condition': layer2027,
        '2028 Condition': layer2028,
        '2029 Condition': layer2029
    };

    var baselayers = {
        // 'Street': streetmap,
        'Light': lightmap
        // 'Western': westernmap
    };

    L.control.layers(baselayers, overlays).addTo(ml_map);

    var slider = $("#slider")
    var handle = $("#custom-handle");

    // Define min and max values for slider
    $(slider).slider({
        min:2013,
        max: 2029
    })

    // Set values for slider display
    $(slider).slider({
        create: function() {
            handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handle.text( ui.value );
        }
    });

    // Define default year
    // Retrieve user input
    $(function() {
        $(slider).slider( "value", 2013 );

        $(slider).on('slide', function(event, ui) {
            var selection = ui.value;
            console.log(selection);
            switch (selection) {
                case 2013:
                    ml_map.addLayer(layer2013);
                    ml_map.addControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2014:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.addLayer(layer2014);
                    ml_map.addControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2015:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.addLayer(layer2015);
                    ml_map.addControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2016:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.addLayer(layer2016);
                    ml_map.addControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2017:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.addLayer(layer2017);
                    ml_map.addControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2018:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.addLayer(layer2018);
                    ml_map.addControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2019:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.addLayer(layer2019);
                    ml_map.addControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2020:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.addLayer(layer2020);
                    ml_map.addControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2021:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.addLayer(layer2021);
                    ml_map.addControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2022:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.addLayer(layer2022);
                    ml_map.addControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2023:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.addLayer(layer2023);
                    ml_map.addControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2024:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.addLayer(layer2024);
                    ml_map.addControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2025:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.addLayer(layer2025);
                    ml_map.addControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2026:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.addLayer(layer2026);
                    ml_map.addControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2027:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.addLayer(layer2027);
                    ml_map.addControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2028:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.addLayer(layer2028);
                    ml_map.addControl(legend2028);
                    ml_map.removeLayer(layer2029);
                    ml_map.removeControl(legend2029);
                    break;
                case 2029:
                    ml_map.removeLayer(layer2013);
                    ml_map.removeControl(legend2013);
                    ml_map.removeLayer(layer2014);
                    ml_map.removeControl(legend2014);
                    ml_map.removeLayer(layer2015);
                    ml_map.removeControl(legend2015);
                    ml_map.removeLayer(layer2016);
                    ml_map.removeControl(legend2016);
                    ml_map.removeLayer(layer2017);
                    ml_map.removeControl(legend2017);
                    ml_map.removeLayer(layer2018);
                    ml_map.removeControl(legend2018);
                    ml_map.removeLayer(layer2019);
                    ml_map.removeControl(legend2019);
                    ml_map.removeLayer(layer2020);
                    ml_map.removeControl(legend2020);
                    ml_map.removeLayer(layer2021);
                    ml_map.removeControl(legend2021);
                    ml_map.removeLayer(layer2022);
                    ml_map.removeControl(legend2022);
                    ml_map.removeLayer(layer2023);
                    ml_map.removeControl(legend2023);
                    ml_map.removeLayer(layer2024);
                    ml_map.removeControl(legend2024);
                    ml_map.removeLayer(layer2025);
                    ml_map.removeControl(legend2025);
                    ml_map.removeLayer(layer2026);
                    ml_map.removeControl(legend2026);
                    ml_map.removeLayer(layer2027);
                    ml_map.removeControl(legend2027);
                    ml_map.removeLayer(layer2028);
                    ml_map.removeControl(legend2028);
                    ml_map.addLayer(layer2029);
                    ml_map.addControl(legend2029);
                    break;
            };
        });

        // $(slider).slider({
        //     animate: "3000"
        // })

        //Global values.
        var increment = 1;
        var slideMax = 2029;
        var animationDelay = 1000;
        var sliderVal = 2013;
        var sliderInterval = {};

        $(function() {
            slider.slider({
                animate: "normal",
                max: slideMax
            });
        });

        //Subscribe to the "slidechange" event to keep track of the slider value.
        // $("#play").on("slidechange", function(event, ui) {
        // //If the slider value reaches the max, set the interval to -1 to start animating backwards.
        // if ($("#slider").slider("value") == slideMax) {
        //     increment = -1;
        // } else if ($("#slider").slider("value") == 0) {
        //     increment = 1;
        // }
        // });

        $("#play").on("click", function() {
        //Set the slider value to the current value to start the animation at the correct point.
            var iteration = 0;
            sliderVal = slider.slider("value");
            sliderInterval = setInterval(function() {
                if (iteration == 0) {
                    if (sliderVal < 2029) {
                        sliderVal += increment;
                        slider.slider("value", sliderVal);
                        switch (sliderVal) {
                            case 2013:
                                ml_map.addLayer(layer2013);
                                ml_map.addControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2014:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.addLayer(layer2014);
                                ml_map.addControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2015:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.addLayer(layer2015);
                                ml_map.addControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2016:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.addLayer(layer2016);
                                ml_map.addControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2017:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.addLayer(layer2017);
                                ml_map.addControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2018:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.addLayer(layer2018);
                                ml_map.addControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2019:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.addLayer(layer2019);
                                ml_map.addControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2020:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.addLayer(layer2020);
                                ml_map.addControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2021:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.addLayer(layer2021);
                                ml_map.addControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2022:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.addLayer(layer2022);
                                ml_map.addControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2023:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.addLayer(layer2023);
                                ml_map.addControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2024:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.addLayer(layer2024);
                                ml_map.addControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2025:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.addLayer(layer2025);
                                ml_map.addControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2026:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.addLayer(layer2026);
                                ml_map.addControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2027:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.addLayer(layer2027);
                                ml_map.addControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2028:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.addLayer(layer2028);
                                ml_map.addControl(legend2028);
                                ml_map.removeLayer(layer2029);
                                ml_map.removeControl(legend2029);
                                break;
                            case 2029:
                                ml_map.removeLayer(layer2013);
                                ml_map.removeControl(legend2013);
                                ml_map.removeLayer(layer2014);
                                ml_map.removeControl(legend2014);
                                ml_map.removeLayer(layer2015);
                                ml_map.removeControl(legend2015);
                                ml_map.removeLayer(layer2016);
                                ml_map.removeControl(legend2016);
                                ml_map.removeLayer(layer2017);
                                ml_map.removeControl(legend2017);
                                ml_map.removeLayer(layer2018);
                                ml_map.removeControl(legend2018);
                                ml_map.removeLayer(layer2019);
                                ml_map.removeControl(legend2019);
                                ml_map.removeLayer(layer2020);
                                ml_map.removeControl(legend2020);
                                ml_map.removeLayer(layer2021);
                                ml_map.removeControl(legend2021);
                                ml_map.removeLayer(layer2022);
                                ml_map.removeControl(legend2022);
                                ml_map.removeLayer(layer2023);
                                ml_map.removeControl(legend2023);
                                ml_map.removeLayer(layer2024);
                                ml_map.removeControl(legend2024);
                                ml_map.removeLayer(layer2025);
                                ml_map.removeControl(legend2025);
                                ml_map.removeLayer(layer2026);
                                ml_map.removeControl(legend2026);
                                ml_map.removeLayer(layer2027);
                                ml_map.removeControl(legend2027);
                                ml_map.removeLayer(layer2028);
                                ml_map.removeControl(legend2028);
                                ml_map.addLayer(layer2029);
                                ml_map.addControl(legend2029);
                                break;
                        };
                    }
                    else {
                        sliderVal = 2013;
                        slider.slider("value", sliderVal);
                        iteration = 1;
                    }
                }
            }, animationDelay);
        });

        // $(".btn-stop").on("click", function() {
        //     //Call clearInterval to stop the animation.
        //     clearInterval(sliderInterval);
        // });
    });

};

// Load data using jquery geojson
$.getJSON('../static/data/va_county_roads.geojson', function (data) {
    createMLMap(data);
});