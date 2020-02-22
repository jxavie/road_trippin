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
  // 'District of Columbia': 'DC',
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

// set dropdown selection to VA
document.getElementById("selState").value = "VA";