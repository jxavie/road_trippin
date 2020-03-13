// PLOT FUNCTION
// define function for plot
function potholes_chart(x,y1,y2) {
  var trace1 = {
    x: x,
    y: y1,
    // text: labels,
    type: 'bar',
    name: "Closed"
  };

  var trace2 = {
    x: x,
    y: y2,
    // text: labels,
    type: 'bar',
    name: "Open"
  };

  data = [trace1, trace2]

  var layout = {
    title: "Potholes in DC (Month-to-Date)",
    xaxis: {
      title: "DC Wards",
      // showgrid: false,
      automargin: true
    },
    yaxis: {
      title: {
        text: "Number of Reported Potholes",
        standoff: 20
      },
      automargin: true
    },
    barmode: 'stack',
    showlegend: true,
    legend: {
      x: 0.45,
      xanchor: "center",
      y: 1.25,
      orientation: "h"
    },
    margin: {
      // t: 20, //top margin
      l: 15, //left margin
      r: 15, //right margin
      // b: 20 //bottom margin
    },
    font: {
      color: 'white'
    },
    paper_bgcolor:'rgba(0, 0, 0, 0)',
    plot_bgcolor: 'rgba(0, 0, 0, 0)'
  };

  var layout_overlay = {
    title: "Potholes in DC (Month-to-Date)",
    xaxis: {
      title: "DC Wards",
      // showgrid: false,
      automargin: true
    },
    yaxis: {
      title: {
        text: "Number of Reported Potholes",
        standoff: 20
      },
      automargin: true
    },
    barmode: 'stack',
    showlegend: true,
    legend: {
      x: 0.45,
      xanchor: "center",
      y: 1.25,
      orientation: "h"
    },
    margin: {
      // t: 20, //top margin
      l: 15, //left margin
      r: 15, //right margin
      // b: 20 //bottom margin
    },
    font: {
      color: 'white'
    },
    paper_bgcolor: 'rgb(15,15,15)',
    plot_bgcolor: 'rgb(15,15,15)'
  };

  Plotly.newPlot("pothole_chart", data, layout);
  Plotly.newPlot("overlayChart_potholes", data, layout_overlay);
};


// Open Data DC API
var url = "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/SR_30days_Open/MapServer/10/query?where=1%3D1&outFields=*&outSR=4326&f=json"

d3.json(url).then((response) => {

  var features = response.features;

  var ward1_closed = 0;
  var ward1_open = 0;
  var ward2_closed = 0;
  var ward2_open = 0;
  var ward3_closed = 0;
  var ward3_open = 0;
  var ward4_closed = 0;
  var ward4_open = 0;
  var ward5_closed = 0;
  var ward5_open = 0;
  var ward6_closed = 0;
  var ward6_open = 0;
  var ward7_closed = 0;
  var ward7_open = 0;
  var ward8_closed = 0;
  var ward8_open = 0;

  var ids = [];
  var wards_table = [];
  var addresses = [];
  var latitudes = [];
  var longitudes = [];
  var add_dates = [];
  var close_dates = [];
  var statuses = [];
  var resolveTime = [];

  var potholeCount = 0;

  features.forEach((feature) => {
    var id = feature.attributes.OBJECTID;
    var addDate = parseInt(feature.attributes.ADDDATE);
    var addDate_str = new Date(addDate).toDateString();
    var status = feature.attributes.SERVICEORDERSTATUS;
    var address = feature.attributes.STREETADDRESS;
    var latitude = feature.attributes.LATITUDE;
    var longitude = feature.attributes.LONGITUDE;
    var ward = parseInt(feature.attributes.WARD);

    var date_components_add = addDate_str.split(" ");
    var date_add = date_components_add[1] + " " + date_components_add[2] + ", " + date_components_add[3];

    var date_close = "";

    if (status == "Closed") {
      var closeDate = parseInt(feature.attributes.RESOLUTIONDATE);
      var closeDate_str = new Date(closeDate).toDateString();
      var date_components_close = closeDate_str.split(" ");
      date_close = date_components_close[1] + " " + date_components_close[2] + ", " + date_components_close[3];

      resolveTime.push((closeDate - addDate) / 1000 / 60 / 60 / 24);
    }
    else {
      var date_close = "-";
      potholeCount += 1;
    };
    
    ids.push(id);
    wards_table.push(ward);
    addresses.push(address);
    latitudes.push(latitude);
    longitudes.push(longitude);
    add_dates.push(date_add);
    close_dates.push(date_close);
    statuses.push(status);

    switch (ward) {
      case 1:
        if (status == "Closed") {
          ward1_closed += 1;
        }
        else {
          ward1_open += 1;
        };
        break;
      case 2:
        if (status == "Closed") {
          ward2_closed += 1;
        }
        else {
          ward2_open += 1;
        };
        break;
      case 3:
        if (status == "Closed") {
          ward3_closed += 1;
        }
        else {
          ward3_open += 1;
        };
        break;
      case 4:
        if (status == "Closed") {
          ward4_closed += 1;
        }
        else {
          ward4_open += 1;
        };
        break;
      case 5:
        if (status == "Closed") {
          ward5_closed += 1;
        }
        else {
          ward5_open += 1;
        };
        break;
      case 6:
        if (status == "Closed") {
          ward6_closed += 1;
        }
        else {
          ward6_open += 1;
        };
        break;
      case 7:
        if (status == "Closed") {
          ward7_closed += 1;
        }
        else {
          ward7_open += 1;
        };
        break;
      case 8:
        if (status == "Closed") {
          ward8_closed += 1;
        }
        else {
          ward8_open += 1;
        };
        break;
    };
  });

  var wards = [
    "Ward 1",
    "Ward 2",
    "Ward 3",
    "Ward 4",
    "Ward 5",
    "Ward 6",
    "Ward 7",
    "Ward 8"
  ];

  var totalClosed = [
    ward1_closed,
    ward2_closed,
    ward3_closed,
    ward4_closed,
    ward5_closed,
    ward6_closed,
    ward7_closed,
    ward8_closed
  ];

  var totalOpen = [
    ward1_open,
    ward2_open,
    ward3_open,
    ward4_open,
    ward5_open,
    ward6_open,
    ward7_open,
    ward8_open
  ];

  potholes_chart(wards,totalClosed,totalOpen);

  var headers = [
    "ID",
    "Status",
    "Date_Added     ",
    "Date_Resolved",
    "Ward",
    // "Latitude",
    // "Longtitude",
    "Address"
  ];

  var thead = d3.select("thead");
  var tbody = d3.select("tbody");

  var trow = thead.append("tr");
  headers.forEach(function(header){
      trow.append('th').text(header);
  });

  for (i=0; i<ids.length; i++) {
    trow = tbody.append("tr");
    trow.append("td").text(ids[i]);
      trow.append("td").text(statuses[i]);
      trow.append("td").text(add_dates[i]);
      trow.append("td").text(close_dates[i]);
      trow.append("td").text(wards_table[i]);
      // trow.append("td").text(latitudes[i]);
      // trow.append("td").text(longitudes[i]);
      trow.append("td").text(addresses[i]);
  };
  
  var avgTime = math.ceil(math.mean(resolveTime));
  console.log(avgTime);
  console.log(resolveTime);

  console.log(potholeCount);

  document.getElementById("pothole-count").innerHTML = potholeCount;
  document.getElementById("avg-time").innerHTML = avgTime + " Days";
});






