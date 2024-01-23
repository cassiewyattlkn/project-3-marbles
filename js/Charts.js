//Create variables to (1) Refer to the data within the json file and (2) hold a list of the states in the database
let data;
let States = [];

//Connect to the JSON file
d3.json("../Project_3_Museums_2.json").then(jsonData => {
    data = jsonData;
    //For each object in the JSON file, 
    for (let i = 0; i < data.length; i++) {
      
      let current = data[i];

      //Flatten the "Revenue" property if it contans a nested "$numberLong"
      //to ease access in later functions
      if (current.hasOwnProperty('Revenue') && current.Revenue.hasOwnProperty('$numberLong')) {
        current.Revenue = current.Revenue.$numberLong;
        delete current.Revenue.$numberLong;
      }
      //if the state is not already in the States list, then add the state
      if (!States.includes(current.State)) {
        States.push(current.State);
      }

    }
    
    //Run function that will add each state in the list to the dropdown menu in
    //ascending order
    loadDropdown();

    //Run function that will accept the selected state from the dropdown menu
    //and build and display the respective charts on the dashboard
    optionChanged(States[0]);
});

function loadDropdown()
{
    //Sort the states by ascending alphabetical order
    States.sort();
    //Refer to the dropdown menu from the index.html file
    var select = d3.select("#selDataset");
    //Add each state in the list to the dropdown menu
    States.forEach((state) => {
        select.append("option")
        .text(state)
        .property("value", state);
    });

}

function optionChanged(selectedState)
{
    //Create dictionary to hold the names and revenues of the institutions in each state
    let Revenues = {};
    let typeCount = {};

    //For each selected state, loop through the JSON file
    for( let i=0; i < data.length; i++){

        if(selectedState == data[i].State)
        {
          //If there is a value in the revenue property, append that value
          //to the dictionary with the key being the "Museum Name"
          if(data[i].hasOwnProperty('Revenue')){
                
            Revenues[data[i].Museum_Name] = data[i].Revenue;

            }

            if(!typeCount.hasOwnProperty(data[i].Museum_Type)){
                typeCount[data[i].Museum_Type] = 1;
             }
            else{
                typeCount[data[i].Museum_Type] += 1;
             }
        }
    }
    
     // Sourced from a Stack Overflow board to sort the dictionary by the key (revenue) values 
     var revSort = Object.keys(Revenues).map(function(key) {
        return [key, Revenues[key]];
      });
      
    // Sort the resulting array in descending order
    revSort.sort((a,b) => b[1]-a[1]);

    //Create variables to, respectively, get the top 10 revenue-generating places
    //and split the dictionary into two different arrays
    let top10 = revSort.slice(0,10);
    let top10Revenues = top10.map(entry => entry[1]);
    var top10Names = top10.map(entry => entry[0]);
    
    let count = [];
    let categories = [];
    for (let key in typeCount) {
        categories.push(key);
        count.push(typeCount[key]);
    }

    //Runs the BarChart function, which displays a new plot for each new selection on the dropdown menu
    refreshBarChart(top10Revenues, top10Names);
    //Runs the PieChart function, which displays a new plot for each new selection on the dropdown menu
    refreshPieChart(count, categories);

}

function BarColor(top10Names)
{
  //Create variables to get the NCES Locale Codes and the store the colors that correlate with each state's Top10
  let NCES;
  let colors =[];

  //Loop through the array of Top10 Museum Names and the JSON file to find the Locale Code for each item in the array
  for(var i=0; i<top10Names.length; i++)
  {
    for(let j=0; j<data.length; j++)
    {
      if(top10Names[i] == data[j].Museum_Name)
      {
        NCES = data[j].Locale_Code;
      }
    }

  //Assign a specific color to each item based on the Locale Code
  if(NCES == 1)
  {
    colors.push('rgb(75,0,130)');
  } 
  else if(NCES == 2)
  {
    colors.push('rgb(0,0,255)');
  }
  else if(NCES==3)
  {
    colors.push('rgb(8,143,143)');
  }
  else
  {
    colors.push('rgb(0,255,0)');
  }
}

return colors;

}


function refreshBarChart(top10Revenues, top10Names)
{
  //Stores the BarColor function, which dynamically applies colors to individual bars on the chart based on Locale
  var colour = BarColor(top10Names);
    var data = [{
        y: top10Revenues, 
          x: top10Names,
          text: top10Names,
          type: 'bar',
          marker: {
          color: colour
          },
          //The snippet of code falling under "transforms", which orders the bar chart in ascending order, 
          //was sourced from community.plotly.com
          transforms: [{
            type: 'sort',
            target: 'x',
            order: 'ascending'
          }]
        }];

    var layout = {
        title: 'Visitors Top 10',
        plot_bgcolor: 'rgb(173,216,230)',
        paper_bgcolor: 'rgb(173,216,230)'
      };
    
    //Refreshes the animation to prepare for a new chart
    d3.select('#bar').classed('animate__animated', false).classed('animate__tada', false);


    //Displays the Bar Chart 
    Plotly.newPlot('bar', data, layout, {displayModeBar: true});

    //Calls the nimation on the newly displayed chart 
    d3.select('#bar').classed('animate__animated', true).classed('animate__tada', true);
  }

//The code below was sourced from the PLotly documentation for Pie charts.
function refreshPieChart(count, categories)
{
    var data = [{
        values: count,
        labels: categories,
        type: 'pie'
      }];
      
      var layout = {
        title: 'Museum Type Breakdown',
        paper_bgcolor: 'rgb(173,216,230)',

      };
      //Refreshes the animation to prepare for a new chart
      d3.select('#pie').classed('animate__animated', false).classed('animate__tada', false);
      
      //Displays the pie chart 
      Plotly.newPlot('pie', data, layout, {displayModeBar: true});
      
      //Calls the animation on the newly displayed chart 
      d3.select('#pie').classed('animate__animated', true).classed('animate__tada', true);
}
  
     


  