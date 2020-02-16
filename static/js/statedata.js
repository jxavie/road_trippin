// PLOT FUNCTION
// define function for plot
function state_chart(x,y1,y2,y3,labels) {
  var trace1 = {
    x: x,
    y: y1,
    text: labels,
    mode: "lines+markers",
    name: "Total"
  };

  var trace2 = {
    x: x,
    y: y2,
    text: labels,
    mode: "lines+markers",
    name: "Capital Outlay"
  };

  var trace3 = {
    x: x,
    y: y3,
    text: labels,
    mode: "lines+markers",
    name: "O&M"
  };

  data = [trace1, trace2, trace3]

  var layout = {
    title: "Yearly State Spending on Highway Infrastructure",
    xaxis: {
      title: "Year",
      showgrid: false,
      automargin: true
    },
    yaxis: {
      title: {
        text: "Highway Infrastructure Spending (2017 $)",
        standoff: 20
      },
      automargin: true
    },
    showlegend: true,
    legend: {
      x: 0.45,
      xanchor: "center",
      y: 1.1,
      orientation: "h"
    },
    margin: {
      // t: 20, //top margin
      l: 15, //left margin
      r: 15, //right margin
      // b: 20 //bottom margin
    } 
  };

  Plotly.newPlot("state_charts", data, layout);
};



// STATE STATS SUMMARY FUNCTION
// define function for state statistics summary
function state_data(bridge_stats, road_stats, tunnel_stats){

  //  select div for state statistics
  var state_bridges = d3.select("#state_bridges");
  var state_roads = d3.select("#state_roads");
  var state_tunnels = d3.select("#state_tunnels");

  // append <ul> tag to html
  var ul_bridge = state_bridges.append("ul")
      .attr("style","padding-left: 15px; list-style-type:none; font-size:small;")

  // bind key-value pair data to list tags and append to html
  ul_bridge.selectAll("li")
    .data(bridge_stats)
    .enter()
    .append("li")
    .text(d => d);

  var ul_road = state_roads.append("ul")
    .attr("style","padding-left: 15px; list-style-type:none; font-size:small;")

  // bind key-value pair data to list tags and append to html
  ul_road.selectAll("li")
    .data(road_stats)
    .enter()
    .append("li")
    .text(d => d);

  var ul_tunnels = state_tunnels.append("ul")
    .attr("style","padding-left: 15px; list-style-type:none; font-size:small;")

  // bind key-value pair data to list tags and append to html
  ul_tunnels.selectAll("li")
    .data(tunnel_stats)
    .enter()
    .append("li")
    .text(d => d);
};



// format number (1000s) with commas
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};



// DEFAULT DASHBOARD SETTINGS
// define datasource
var datasource = `/api/${state}`;

// retrieve data and populate dashboard
d3.json(datasource).then((dataset) => {
  
  // delete previous tables
  d3.select("#state_bridges").html("");
  d3.select("#state_roads").html("");
  d3.select("#state_tunnels").html("");

  // assign data to variables
  var bridges = dataset.Bridge_data;
  var bridge_summary = dataset.Bridge_Summary;
  var bridges_poor = dataset.Bridges_in_Poor_Condition;
  var road_summary = dataset.Road_Summary;
  var tunnels = dataset.Tunnel_Data;
  var tunnel_summary = dataset.Tunnel_Summary;
  var spending = dataset.Spending;

  // arrays for state statistics
  // var deficient_bridges = [
  //   `Count: ${formatNumber(bridges_poor.Count)}`,
  //   `Total Area: ${formatNumber(bridges_poor.Area)}`,
  //   `Cost to Replace: ${bridges_poor.Area.formatMoney()}`,
  //   `Cost to Rehab: ${bridges_poor.Area.formatMoney()}`,
  // ]

  var bridge_percentages = [
    `Total Count:   ${formatNumber(bridge_summary.Count_All)}`,
    `Percent Good:   ${parseFloat((bridge_summary.Count_Good/bridge_summary.Count_All)*100).toFixed(2)+"%"}`,
    `Percent Fair:   ${parseFloat((bridge_summary.Count_Fair/bridge_summary.Count_All)*100).toFixed(2)+"%"}`,
    `Percent Poor:   ${parseFloat((bridge_summary.Count_Poor/bridge_summary.Count_All)*100).toFixed(2)+"%"}`,
    `Count Deficient Bridges:   ${formatNumber(bridges_poor.Count)}`,
    `Cost to Replace:   $${formatNumber(bridges_poor.Replacement_Cost)}`,
    `Cost to Rehab:   $${formatNumber(bridges_poor.Rehab_Cost)}`
  ];

  var road_percentages = [
    `Total Count:   ${formatNumber(road_summary.Total)}`,
    `Percent Good:   ${parseFloat(road_summary.Good_Percentage).toFixed(2)+"%"}`,
    `Percent Fair:   ${parseFloat(road_summary.Fair_Percentage).toFixed(2)+"%"}`,
    `Percent Poor:   ${parseFloat(road_summary.Poor_Percentage).toFixed(2)+"%"}`,
  ];

  var tunnel_percentages = [
    `Total Count:  ${formatNumber(tunnel_summary.Total)}`,
    `Percent Condition 1:   ${parseFloat(tunnel_summary.Condition_State_1_Percentage).toFixed(2)+"%"}`,
    `Percent Condition 2:   ${parseFloat(tunnel_summary.Condition_State_2_Percentage).toFixed(2)+"%"}`,
    `Percent Condition 3:   ${parseFloat(tunnel_summary.Codition_State_3_Percentage).toFixed(2)+"%"}`,
    `Percent Condition 4:   ${parseFloat(tunnel_summary.Condition_State_4_Percentage).toFixed(2)+"%"}`,
  ];

  // initialize arrays for state spending data
  var hwy_total = [];
  var hwy_capital = [];
  var hwy_om = [];
  var hwy_year = [];

  // process data for spending chart
  spending.forEach((year_stat) => {
    hwy_total.push(year_stat.Total_Hwy_DirExp);
    hwy_capital.push(year_stat.Total_Hwy_CapOut);
    hwy_om.push(year_stat.Total_Hwy_CurOp);
    hwy_year.push(year_stat.Year)
  });

  console.log(hwy_total)

  state_data(bridge_percentages, road_percentages, tunnel_percentages );
  state_chart(hwy_year, hwy_total, hwy_capital, hwy_om, hwy_year);
});



// UPDATE DASHBOARD BASED ON USER INPUT
// function stateChanged(state) {
function stateChanged(state) {

  // delete previous tables
  d3.select("#state_bridges").html("");
  d3.select("#state_roads").html("");
  d3.select("#state_tunnels").html("");

  // define datasource
  var datasource = `/api/${state}`;

  d3.json(datasource).then((dataset) => {
  
    // assign data to variables
    var bridges = dataset.Bridge_data;
    var bridge_summary = dataset.Bridge_Summary;
    var bridges_poor = dataset.Bridges_in_Poor_Condition;
    var road_summary = dataset.Road_Summary;
    var tunnels = dataset.Tunnel_Data;
    var tunnel_summary = dataset.Tunnel_Summary;
    var spending = dataset.Spending;

    // arrays for state statistics
    // var deficient_bridges = [
    //   `Count: ${formatNumber(bridges_poor.Count)}`,
    //   `Total Area: ${formatNumber(bridges_poor.Area)}`,
    //   `Cost to Replace: ${bridges_poor.Area.formatMoney()}`,
    //   `Cost to Rehab: ${bridges_poor.Area.formatMoney()}`,
    // ]

    var bridge_percentages = [
      `Total Count:   ${formatNumber(bridge_summary.Count_All)}`,
      `Percent Good:   ${parseFloat((bridge_summary.Count_Good/bridge_summary.Count_All)*100).toFixed(2)+"%"}`,
      `Percent Fair:   ${parseFloat((bridge_summary.Count_Fair/bridge_summary.Count_All)*100).toFixed(2)+"%"}`,
      `Percent Poor:   ${parseFloat((bridge_summary.Count_Poor/bridge_summary.Count_All)*100).toFixed(2)+"%"}`,
      `Count Deficient Bridges:   ${formatNumber(bridges_poor.Count)}`,
      `Cost to Replace:   $${formatNumber(bridges_poor.Replacement_Cost)}`,
      `Cost to Rehab:   $${formatNumber(bridges_poor.Rehab_Cost)}`
    ];
  
    var road_percentages = [
      `Total Count:   ${formatNumber(road_summary.Total)}`,
      `Percent Good:   ${parseFloat(road_summary.Good_Percentage).toFixed(2)+"%"}`,
      `Percent Fair:   ${parseFloat(road_summary.Fair_Percentage).toFixed(2)+"%"}`,
      `Percent Poor:   ${parseFloat(road_summary.Poor_Percentage).toFixed(2)+"%"}`,
    ];
  
    var tunnel_percentages = [
      `Total Count:   ${formatNumber(tunnel_summary.Total)}`,
      `Percent Condition 1:   ${parseFloat(tunnel_summary.Condition_State_1_Percentage).toFixed(2)+"%"}`,
      `Percent Condition 2:   ${parseFloat(tunnel_summary.Condition_State_2_Percentage).toFixed(2)+"%"}`,
      `Percent Condition 3:   ${parseFloat(tunnel_summary.Codition_State_3_Percentage).toFixed(2)+"%"}`,
      `Percent Condition 4:   ${parseFloat(tunnel_summary.Condition_State_4_Percentage).toFixed(2)+"%"}`,
    ];
  
    // initialize arrays for state spending data
    var hwy_total = [];
    var hwy_capital = [];
    var hwy_om = [];
    var hwy_year = [];
  
    // process data for spending chart
    spending.forEach((year_stat) => {
      hwy_total.push(year_stat.Total_Hwy_DirExp);
      hwy_capital.push(year_stat.Total_Hwy_CapOut);
      hwy_om.push(year_stat.Total_Hwy_CurOp);
      hwy_year.push(year_stat.Year)
    });
  
    console.log(hwy_total)
  
    state_data(bridge_percentages, road_percentages, tunnel_percentages );
    state_chart(hwy_year, hwy_total, hwy_capital, hwy_om, hwy_year);
  
    // update state map
    // updateStateMap(state);
    updateStateMap(dataset);

  });
};