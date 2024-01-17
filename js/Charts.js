//Create variables to (1) Refer to the data within the json file and (2) hold a list of the states in the database
let data;
let States = [];

//Refer to the dropdown menu from the index.html file
var select = d3.select("#selDataset");

//Connect to the JSON file
d3.json("../Project_3_Museums_2.json").then(jsonData => {
    data = jsonData;
    //For each object in the JSON file, 
    for (let i = 0; i < data.length; i++) {
      
      let current = data[i];
      //if the state is not already in the States list, then add the state
      if (!States.includes(current.State)) {
        States.push(current.State);
      }

    }
    
    //Sort the states by ascending alphabetical order 
    States.sort();

    //Add each state in the list to the dropdown menu
    States.forEach((state) => {
        select.append("option")
        .text(state)
        .property("value", state);
    });

    //RUn function that will accept the selected state from the dropdown menu
    //and build and display the respective charts on the dashboard
    optionChanged(States[0]);
});

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
          if(data.hasOwnProperty(data[i].Revenue)){
                
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
    let top10Names = top10.map(entry => entry[0]);
    console.log(top10);
    
    let count = [];
    let categories = [];
    for (let key in typeCount) {
        categories.push(key);
        count.push(typeCount[key]/typeCount.length);
    }
    console.log(typeCount.length);
    //Runs the BarChart function, which displays a new plot for each new selection on the dropdown menu
    refreshBarChart(top10Revenues, top10Names);
}

function refreshBarChart(top10Revenues, top10Names)
{
    var data = [{
        y: top10Revenues, 
          x: top10Names,
          text: top10Names,
          type: 'bar',
          orientation: 'v',
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
        showlegend: false};

    //Displays the Bar Chart 
    Plotly.newPlot('bar', data, layout, {displayModeBar: true});
}

function refreshPieChart(count, categories)
{
    var data = [{
        values: count,
        labels: categories,
        type: 'pie'
      }];
      
      var layout = {
        title: 'Filler'
        //height: 400,
        //width: 500
      };
      Plotly.newPlot('pie', data, layout);

}
  