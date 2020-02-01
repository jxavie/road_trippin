var datasource = "../data/gz_2010_us_040_00_5m.json";

// select div for displaying US map
var us_map = d3.select("#map");

d3.json(datasource).then((dataset) => {

    // assign features data to variable
    var features = dataset.features;

    // initialize array to store state names
    var state_names = []

    // store state names to array
    features.forEach((state) => {
        state_names.push(state.properties.NAME)
    });
    console.log(state_names);



});