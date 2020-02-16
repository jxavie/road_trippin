var inflation_ratio = 361/337.5;  //conversion from 2012 to 2017
var maintain_inv = 89.9 * inflation_ratio;  //investment required to maintain current conditions
var improve_inv = 142.5 * inflation_ratio;  //investment required to improve current conditions

console.log(inflation_ratio);
console.log(maintain_inv);
console.log(improve_inv);



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
    name: "Cost to <br>Maintain"
  };

  var trace5 = {
    x: x1,
    y: y5,
    // text: labels,
    mode: "lines",
    name: "Cost to <br>Improve"
  };

  data = [trace1, trace2, trace3, trace4, trace5]

  var layout = {
    title: "Yearly Spending on Highway Infrastructure",
    xaxis: {
      title: "Year",
      showgrid: false,
      automargin: true
    },
    yaxis: {
      title: {
        text: "Billions of Dollars (2017 $)",
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
      title: {
        text: "Percentage of GDP",
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
function global_chart(x , y, year, colors) {
  var trace = {
    x: x,
    y: y,
    type: "bar",
    name: "Total Investment",
    orientation: "h",
    marker: {
      color: colors
    }
  };

  data = [trace]

  var layout = {
    title: `Road Infrastructure Spending by Country for ${year}`,
    xaxis: {
      title: "Investment per Capita (Euros)",
      // showgrid: false,
      automargin: true
    },
    yaxis: {
      title: {
        text: "Country",
        standoff: 20
      },
      automargin: true
    },
    margin: {
      // t: 20, //top margin
      l: 15, //left margin
      r: 15, //right margin
      // b: 20 //bottom margin
    }
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
d3.json("/api/spending").then((dataset) => {
  
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

  // populate global investment dropdowns
  var dropdownGlobal_year = d3.select("#selGlobalYear");
  var dropdownGlobal_type = d3.select("#selGlobalType");

  for (var i=0; i < unique_years.length; i++ ){
    dropdownGlobal_year.append("option")
      .attr("value", unique_years[i])
      .text(unique_years[i]);
  };

  var invType = ["Total Investment", "Capital Outlay", "O&M"];
  var invValue = [
    "Total road spending",
    "Road infrastructure investment",
    "Road infrastructure maintenance"
  ];

  for (var i=0; i < invType.length; i++ ) {
    dropdownGlobal_type.append("option")
      .attr("value", invValue[i])
      .text(invType[i]);
  };

  // determine latest year for full US records
  var recordsUS = [];

  global_spending.forEach(function(data) {
    if(data.Country == "United States") {
      recordsUS.push([data.Year, data.Investment_Type, data.Country])
    };
  });

  var counts = [];

  for (var i = 0; i < unique_years.length; i++) {
    var count = 0;

    recordsUS.forEach(function(record) {
      if (unique_years[i] == record[0]) {
        count += 1;
      }
    })

    counts.push([unique_years[i], count]);
  };

  // console.log(counts);

  var recordsUS_full = [];

  counts.forEach(function(data) {
    if (data[1] == 3) {
      recordsUS_full.push(data[0]);
    };
  });

  selected_year = Math.max(...recordsUS_full)
  console.log(selected_year);

  // set dropdown selection to latest year with full US records
  document.getElementById("selGlobalYear").value = selected_year;

  var totals = [];
  var total_country = [];
  var total_perCapita = [];

  global_spending.forEach((data) => {
    if(data.Year == selected_year) {
      if(data.Investment_Type == "Total road spending") {
        totals.push([data.Spending_perCapita, data.Country]);
      };
    };
  });

  totals = totals.sort(function(a,b) {return a[0] - b[0];});
  // console.log(totals);

  totals.forEach((record) => {
    total_country.push(record[1]);
    total_perCapita.push(record[0]);
  });
  // console.log(total_perCapita);

  // set bar colors
  var colors_total = [];
  
  for (var i = 0; i < total_country.length; i++) {
    if (total_country[i] == "United States") {
      colors_total.push("#ff7f0e")
    }
    else {
      colors_total.push("#696969");
    }
  };

  global_chart(total_perCapita, total_country, selected_year, colors_total);

});



// UPDATE FED-STATE CHART BASED ON USER INPUT
function domesticChanged(selection) {
  // retrieve data and populate dashboard
  d3.json("/api/spending").then((dataset) => {
    
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



// UPDATE GLOBAL CHART BASED ON USER INPUT - YEAR
function globalChangedYear(selection) {
  // retrieve data and populate dashboard
  d3.json("/api/spending").then((dataset) => {
    // process data for global infrastructure investment
    var global_spending = dataset.Global;
  
    var inv_totals = [];
    var inv_country = [];
    var inv_perCapita = [];
    var om_totals = [];
    var om_country = [];
    var om_perCapita = [];
    var totals = [];
    var total_country = [];
    var total_perCapita = [];

    global_spending.forEach((data) => {
      if(data.Year == selection) {
        if(data.Investment_Type == "Road infrastructure investment") {
          inv_totals.push([data.Spending_perCapita, data.Country]);
        }
        else if (data.Investment_Type == "Road infrastructure maintenance") {
          om_totals.push([data.Spending_perCapita, data.Country]);
        }
        else {
          totals.push([data.Spending_perCapita, data.Country]);
        }
      };
    });

    inv_totals = inv_totals.sort(function(a,b) {return a[0] - b[0];});
    // console.log(totals);
    om_totals = om_totals.sort(function(a,b) {return a[0] - b[0];});
    // console.log(totals);
    totals = totals.sort(function(a,b) {return a[0] - b[0];});
    // console.log(totals);

    inv_totals.forEach((record) => {
      inv_country.push(record[1]);
      inv_perCapita.push(record[0]);
    });
    // console.log(inv_perCapita);

    om_totals.forEach((record) => {
      om_country.push(record[1]);
      om_perCapita.push(record[0]);
    });
    // console.log(om_perCapita);

    totals.forEach((record) => {
      total_country.push(record[1]);
      total_perCapita.push(record[0]);
    });
    // console.log(total_perCapita);

    // set bar colors
    var colors_inv = [];
    var colors_om = [];
    var colors_total = [];

    for (var i = 0; i < inv_country.length; i++) {
      if (inv_country[i] == "United States") {
        colors_inv.push("#ff7f0e")
      }
      else {
        colors_inv.push("#696969");
      }
    };

    for (var i = 0; i < om_country.length; i++) {
      if (om_country[i] == "United States") {
        colors_om.push("#ff7f0e")
      }
      else {
        colors_om.push("#696969");
      }
    };
    
    for (var i = 0; i < total_country.length; i++) {
      if (total_country[i] == "United States") {
        colors_total.push("#ff7f0e")
      }
      else {
        colors_total.push("#696969");
      }
    };

    var selectedType = d3.select("#selGlobalType").property("value");

    if(selectedType == "Road infrastructure investment") {
      global_chart(inv_perCapita, inv_country, selection, colors_inv);
    }
    else if (selectedType == "Road infrastructure maintenance") {
      global_chart(om_perCapita, om_country, selection, colors_om);
    }
    else {
      global_chart(total_perCapita, total_country, selection, colors_total);
    };
  
  });
};



// UPDATE GLOBAL CHART BASED ON USER INPUT - TYPE
function globalChangedType(selection) {
  // retrieve data and populate dashboard
  d3.json("/api/spending").then((dataset) => {
    // process data for global infrastructure investment
    var global_spending = dataset.Global;

    var selectedYear = d3.select("#selGlobalYear").property("value");
  
    var inv_totals = [];
    var inv_country = [];
    var inv_perCapita = [];
    var om_totals = [];
    var om_country = [];
    var om_perCapita = [];
    var totals = [];
    var total_country = [];
    var total_perCapita = [];

    global_spending.forEach((data) => {
      if(data.Year == selectedYear) {
        if(data.Investment_Type == "Road infrastructure investment") {
          inv_totals.push([data.Spending_perCapita, data.Country]);
        }
        else if (data.Investment_Type == "Road infrastructure maintenance") {
          om_totals.push([data.Spending_perCapita, data.Country]);
        }
        else {
          totals.push([data.Spending_perCapita, data.Country]);
        }
      };
    });

    inv_totals = inv_totals.sort(function(a,b) {return a[0] - b[0];});
    // console.log(totals);
    om_totals = om_totals.sort(function(a,b) {return a[0] - b[0];});
    // console.log(totals);
    totals = totals.sort(function(a,b) {return a[0] - b[0];});
    // console.log(totals);

    inv_totals.forEach((record) => {
      inv_country.push(record[1]);
      inv_perCapita.push(record[0]);
    });
    // console.log(inv_perCapita);

    om_totals.forEach((record) => {
      om_country.push(record[1]);
      om_perCapita.push(record[0]);
    });
    // console.log(om_perCapita);

    totals.forEach((record) => {
      total_country.push(record[1]);
      total_perCapita.push(record[0]);
    });
    // console.log(total_perCapita);

    // set bar colors
    var colors_inv = [];
    var colors_om = [];
    var colors_total = [];

    for (var i = 0; i < inv_country.length; i++) {
      if (inv_country[i] == "United States") {
        colors_inv.push("#ff7f0e")
      }
      else {
        colors_inv.push("#696969");
      }
    };

    for (var i = 0; i < om_country.length; i++) {
      if (om_country[i] == "United States") {
        colors_om.push("#ff7f0e")
      }
      else {
        colors_om.push("#696969");
      }
    };
    
    for (var i = 0; i < total_country.length; i++) {
      if (total_country[i] == "United States") {
        colors_total.push("#ff7f0e")
      }
      else {
        colors_total.push("#696969");
      }
    };

    if(selection == "Road infrastructure investment") {
      global_chart(inv_perCapita, inv_country, selectedYear, colors_inv);
    }
    else if (selection == "Road infrastructure maintenance") {
      global_chart(om_perCapita, om_country, selectedYear, colors_om);
    }
    else {
      global_chart(total_perCapita, total_country, selectedYear, colors_total);
    };
  
  });
};