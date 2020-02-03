// dictionary of states and abbreviations
var state_dictionary = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'District of Columbia': 'DC',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
  // 'American Samoa': 'AS',
  // 'Guam': 'GU',
  // 'Marshall Islands': 'MH',
  // 'Micronesia': 'FM',
  // 'Northern Marianas': 'MP',
  // 'Palau': 'PW',
  // 'Puerto Rico': 'PR',
  // 'Virgin Islands': 'VI'
}



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
  }

  data = [trace1, trace2, trace3]

  var layout = {
    title: "Yearly State Spending on Highway Infrastructure",
    xaxis: {
      title: "Year",
      showgrid: false,
    },
    yaxis: {
      title: "Highway Infrastructure Spending ($)"
    }
  };

  Plotly.newPlot("state_charts", data, layout);
};



// STATE STATS SUMMARY FUNCTION
// define function for state statistics summary
function state_data(stats){

  //  select div for state statistics
  var state_stats = d3.select("#state_stats");

  // append <ul> tag to html
  var ul = state_stats.append("ul")
      .attr("style","padding: 0; list-style-type:none;")

  // bind key-value pair data to list tags and append to html
  ul.selectAll("li")
      .data(stats)
      .enter()
      .append("li")
      .text(d => d);
}



// STATE DROP DOWN
// assign keys and values of state dictionary to arrays
var state_names = Object.keys(state_dictionary);
var state_abbr = Object.values(state_dictionary);
console.log(state_names);
console.log(state_abbr);

// populate state dropdown
var select = d3.select("#selState");
for (var i=0; i < state_names.length; i++ ){
    select.append("option")
        .attr("value", state_abbr[i])
        // .text(`${state_names[i]} - ${state_abbr[i]}`);
        .text(state_names[i]);
};



// DEFAULT DASHBOARD SETTINGS
// dynamically determine default state
var state = d3.select("#selState").property("value");
console.log(state);

// define datasource
var datasource = `/api/${state}`;

// retrieve data and populate dashboard
d3.json(datasource).then((dataset) => {
  
  // delete previous tables
  d3.select("#state_stats").html("");

  // assign data to variables
  var bridges = dataset.Bridge_data;
  var bridges_poor = dataset.Bridges_in_Poor_Condition;
  var tunnels = dataset.Tunnel_Data;
  var spending = dataset.Spending;

  // array for state statistics
  deficient_bridges = [
    `Count : ${bridges_poor.Count}`,
    `Total Area: ${bridges_poor.Area}`,
    `Cost to Replace: $${bridges_poor.Area}`,
    `Cost to Rehab to Good Condition: $${bridges_poor.Area}`,
  ]

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

  state_data(deficient_bridges);
  state_chart(hwy_year, hwy_total, hwy_capital, hwy_om, hwy_year);
});



// UPDATE DASHBOARD BASED ON USER INPUT
function stateChanged(state) {

  // delete previous tables
  // d3.select("ul").html("");
  d3.select("#state_stats").html("");

  // define datasource
  var datasource = `/api/${state}`;

  d3.json(datasource).then((dataset) => {
  
    // assign data to variables
    var bridges = dataset.Bridge_data;
    var bridges_poor = dataset.Bridges_in_Poor_Condition;
    var tunnels = dataset.Tunnel_Data;
    var spending = dataset.Spending;
  
    deficient_bridges = [
      `Count : ${bridges_poor.Count}`,
      `Total Area: ${bridges_poor.Area}`,
      `Cost to Replace: ${bridges_poor.Area}`,
      `Cost to Rehab to Good Condition: ${bridges_poor.Area}`,
    ]
  
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
  
    state_data(deficient_bridges);
    state_chart(hwy_year, hwy_total, hwy_capital, hwy_om, hwy_year);
  });
};
