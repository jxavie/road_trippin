var inflation_ratio = 361/337.5;  //conversion from 2012 to 2017
var maintain_inv = 89.9 * inflation_ratio;  //investment required to maintain current conditions
var improve_inv = 142.5 * inflation_ratio;  //investment required to improve current conditions

console.log(inflation_ratio);
console.log(maintain_inv);
console.log(improve_inv);



// define datasource
var datasource = "/api/spending";



// FED-STATE COMPARISON CHART FUNCTION - DOLLARS
// define function for state vs. federal spending plot
function dollars_chart(x,y1,y2,y3,x1,y4,y5) {
  var trace1 = {
    x: x,
    y: y1,
    // text: labels,
    mode: "lines",
    name: "Total"
  };

  var trace2 = {
    x: x,
    y: y2,
    // text: labels,
    mode: "lines",
    name: "Federal"
  };

  var trace3 = {
    x: x,
    y: y3,
    // text: labels,
    mode: "lines",
    name: "State"
  };

  var trace4 = {
    x: x1,
    y: y4,
    // text: labels,
    mode: "lines",
    name: "Cost to Maintain"
  };

  var trace5 = {
    x: x1,
    y: y5,
    // text: labels,
    mode: "lines",
    name: "Cost to Improve"
  };

  data = [trace1, trace2, trace3, trace4, trace5]

  var layout = {
    title: "Yearly Spending on Highway Infrastructure",
    xaxis: {
      title: "Year",
      showgrid: false
    },
    yaxis: {
      title: "Billions of Dollars",
      automargin: true
    }
  };

  Plotly.newPlot("gross_spending", data, layout);
};



// FED-STATE COMPARISON CHART FUNCTION - GDP
// define function for state vs. federal spending plot
function gdp_chart(x,y1,y2,y3) {
  var trace1 = {
    x: x,
    y: y1,
    // text: labels,
    mode: "lines",
    name: "Total"
  };

  var trace2 = {
    x: x,
    y: y2,
    // text: labels,
    mode: "lines",
    name: "Federal"
  };

  var trace3 = {
    x: x,
    y: y3,
    // text: labels,
    mode: "lines",
    name: "State"
  };

  data = [trace1, trace2, trace3]

  var layout = {
    title: "Yearly Spending on Highway Infrastructure",
    xaxis: {
      title: "Year",
      showgrid: false,
      automargin: true
    },
    yaxis: {
      title: "Percentage of GDP",
      automargin: true
    }
  };

  Plotly.newPlot("gross_spending", data, layout);
};



// // GLOBAL COMPARISON CHART FUNCTION - INVESTMENT & OM
// // define function for global spending plot
// function global_chart(x1,x2,y1,y2) {
//   var trace1 = {
//     x: y1,
//     y: x1,
//     // text: labels,
//     type: "bar",
//     name: "Investment",
//     orientation: "h"
//   };

//   var trace2 = {
//     x: y2,
//     y: x2,
//     // text: labels,
//     type: "bar",
//     name: "Maintenance",
//     orientation: "h"
//   };

//   data = [trace1, trace2]

//   var layout = {
//     title: `Road Infrastructure Spending by Country for ${selected_year}`,
//     xaxis: {
//       title: "Investment per Capita (Euros)",
//       showgrid: false,
//     },
//     yaxis: {
//       title: "Country"
//     },
//     barmode: 'stack'
//   };

//   Plotly.newPlot("global_spending", data, layout);
// };



// GLOBAL COMPARISON CHART FUNCTION
// define function for global spending plot
function global_chart(x,y,year) {
  var trace = {
    x: y,
    y: x,
    type: "bar",
    name: "Total Investment",
    orientation: "h"
  };

  data = [trace]

  var layout = {
    title: `Road Infrastructure Spending by Country for ${year}`,
    xaxis: {
      title: "Investment per Capita (Euros)",
      showgrid: false
    },
    yaxis: {
      title: "Country",
      categoryorder: "array",
      categoryarray: x
    },
  };

  Plotly.newPlot("global_spending", data, layout);
};



// populate fed-state dropdown
var dropdown_domestic = d3.select("#selNational");

var options_domestic = ["Dollars","Percent GDP"];

for (var i=0; i < options_domestic.length; i++ ){
  dropdown_domestic.append("option")
    .attr("value", options_domestic[i])
    .text(options_domestic[i]);
};



// DEFAULT DASHBOARD SETTINGS
// dynamically determine default fed-state chart
var selected_view = d3.select("#selNational").property("value");
console.log(selected_view);



// DASHBOARD
// retrieve data and populate dashboard
d3.json(datasource).then((dataset) => {
  
  // process fed and state spending data
  var gross_spending = dataset.National_Spending_percentGDP;
  
  var exp_year = [];
  var exp_fed = [];
  var exp_state = [];
  var exp_gross = [];
  var gdp_fed = [];
  var gdp_state =[];
  var gdp_gross =[];

  gross_spending.forEach((data) => {
    exp_year.push(data.Year);
    exp_fed.push(data.Federal_BillionsOf2017Dollars);
    exp_state.push(data.StateLocal_BillionsOf2017Dollars);
    exp_gross.push(data.Federal_BillionsOf2017Dollars + data.StateLocal_BillionsOf2017Dollars);
    gdp_fed.push(data.Federal_percentGDP);
    gdp_state.push(data.StateLocal_percentGDP);
    gdp_gross.push(data.Federal_percentGDP + data.StateLocal_percentGDP);
  });

  // create year array for needed investment (2012 - current year)
  var year_estimates = [];

  var current_year = Math.max(...exp_year);
  console.log(current_year);

  for(i=2012; i<(current_year+1); i++) {
    year_estimates.push(i);
  };

  console.log(year_estimates);

  var cost_maintain = [];
  var cost_improve = [];

  for (i=0; i<exp_year.length; i++) {
    cost_maintain.push(maintain_inv);
    cost_improve.push(improve_inv);
  };

  // determine default fed-state chart to display
  if(selected_view=="Dollars") {
    dollars_chart(exp_year, exp_gross, exp_fed, exp_state, year_estimates, cost_maintain, cost_improve);
  }
  else {
    gdp_chart(exp_year, gdp_gross, gdp_fed, gdp_state);
  };

  // process data for global infrastructure investment
  var global_spending = dataset.Global;

  var all_years = []
  
  global_spending.forEach((data) => {
    all_years.push(data.Year);
  });

  var unique_years = [...new Set(all_years)].sort((a,b) => b-a);
  console.log(unique_years)

  // populate fed-state dropdown
  var dropdown_global = d3.select("#selGlobal");

  for (var i=0; i < unique_years.length; i++ ){
    dropdown_global.append("option")
      .attr("value", unique_years[i])
      .text(unique_years[i]);
  };
  
  // // dynamically determine default global chart
  // var selected_year = d3.select("#selGlobal").property("value");
  // console.log(selected_global);

  selected_year = Math.max(...unique_years)

  // var inv_country = [];
  // var inv_amount = [];
  // var inv_year = [];
  // var inv_perCapita = [];
  // var om_country = [];
  // var om_amount = [];
  // var om_year = [];
  // var om_perCapita = [];
  // var total_country = [];
  // var total_amount = [];
  // var total_year = [];
  // var total_perCapita = [];

  // global_spending.forEach((data) => {
  //   if(data.Year == selected_year) {
  //     if(data.Investment_Type == "Road infrastructure investment") {
  //       inv_country.push(data.Country);
  //       inv_amount.push(data.Investment_Amount);
  //       inv_year.push(data.Year);
  //       inv_perCapita.push(data.Spending_perCapita);
  //     }
  //     else if (data.Investment_Type == "Road infrastructure maintenance") {
  //       om_country.push(data.Country);
  //       om_amount.push(data.Investment_Amount);
  //       om_year.push(data.Year);
  //       om_perCapita.push(data.Spending_perCapita);
  //     }
  //     else {
  //       total_country.push(data.Country);
  //       total_amount.push(data.Investment_Amount);
  //       total_year.push(data.Year);
  //       total_perCapita.push(data.Spending_perCapita);
  //     }
  //   }
  // });

  var total_country = [];
  var total_perCapita = [];

  global_spending.forEach((data) => {
    if(data.Year == selected_year) {
      total_country.push(data.Country);
      total_perCapita.push(data.Spending_perCapita);
    }
  });

  global_chart(total_country,total_perCapita, selected_year);

});



// UPDATE FED-STATE CHART BASED ON USER INPUT
function domesticChanged(selection) {
  // retrieve data and populate dashboard
  d3.json(datasource).then((dataset) => {
    
    gross_spending = dataset.National_Spending_percentGDP;
    
    var exp_year = [];
    var exp_fed = [];
    var exp_state = [];
    var exp_gross = [];
    var gdp_fed = [];
    var gdp_state =[];
    var gdp_gross =[];

    gross_spending.forEach((data) => {
      exp_year.push(data.Year);
      exp_fed.push(data.Federal_BillionsOf2017Dollars);
      exp_state.push(data.StateLocal_BillionsOf2017Dollars);
      exp_gross.push(data.Federal_BillionsOf2017Dollars + data.StateLocal_BillionsOf2017Dollars);
      gdp_fed.push(data.Federal_percentGDP);
      gdp_state.push(data.StateLocal_percentGDP);
      gdp_gross.push(data.Federal_percentGDP + data.StateLocal_percentGDP);
    });

    year_estimates = [];

    current_year = Math.max(...exp_year);
    console.log(current_year);

    for(i=2012; i<(current_year+1); i++) {
      year_estimates.push(i);
    };

    console.log(year_estimates);

    var cost_maintain = [];
    var cost_improve = [];

    for (i=0; i<exp_year.length; i++) {
      cost_maintain.push(maintain_inv);
      cost_improve.push(improve_inv);
    };
    
    if(selection=="Dollars") {
      dollars_chart(exp_year, exp_gross, exp_fed, exp_state, year_estimates, cost_maintain, cost_improve);
    }
    else {
      gdp_chart(exp_year, gdp_gross, gdp_fed, gdp_state);
    };
  });
};



// UPDATE GLOBAL CHART BASED ON USER INPUT
function globalChanged(selection) {
  // retrieve data and populate dashboard
  d3.json(datasource).then((dataset) => {
    // process data for global infrastructure investment
    var global_spending = dataset.Global;
  
    // var inv_country = [];
    // var inv_amount = [];
    // var inv_year = [];
    // var inv_perCapita = [];
    // var om_country = [];
    // var om_amount = [];
    // var om_year = [];
    // var om_perCapita = [];

    // global_spending.forEach((data) => {
    //   if(data.Year == selection) {
    //     if(data.Investment_Type == "Road infrastructure investment") {
    //       inv_country.push(data.Country);
    //       inv_amount.push(data.Investment_Amount);
    //       inv_year.push(data.Year);
    //       inv_perCapita.push(data.Spending_perCapita);
    //     }
    //     else if (data.Investment_Type == "Road infrastructure maintenance") {
    //       om_country.push(data.Country);
    //       om_amount.push(data.Investment_Amount);
    //       om_year.push(data.Year);
    //       om_perCapita.push(data.Spending_perCapita);
    //     }
    //     else {
    //       total_country.push(data.Country);
    //       total_amount.push(data.Investment_Amount);
    //       total_year.push(data.Year);
    //       total_perCapita.push(data.Spending_perCapita);
    //     }
    //   }
    // });
  
    var total_country = [];
    var total_perCapita = [];
  
    global_spending.forEach((data) => {
      if(data.Year == selection) {
        total_country.push(data.Country);
        total_perCapita.push(data.Spending_perCapita);
      }
    });
  
    global_chart(total_country,total_perCapita, selection);
  
  });
};