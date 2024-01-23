// save data source into a variable
let museumData = "../Project_3_Museums_2.json"


d3.json(museumData).then(
    data => {
        
        // console log of the data
        console.log(data);

        // save the data into a variable
        let museums = data; 
                                         
        
        
        // create the tile layers
        let tile1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                });

        let tile2 = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        });

        let tile3 = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
        

        


        // make the array to hold the markers for the stations
        let museumMarkers = L.markerClusterGroup();

        

        //loop through the list of museums
        for (var i = 0; i < data.length; i++)
        {
            // set the current museum
            let currentMuseum = museums[i];

            // function that will determine the locale based on the locale code
            function localeCode()
            {

                if (currentMuseum.Locale_Code == 1.0)
                    return "City"
                else if (currentMuseum.Locale_Code == 2.0)
                    return "Suburban"
                else if (currentMuseum.Locale_Code == 3.0)
                    return "Town"
                else if (currentMuseum.Locale_Code == 4.0)
                    return "Rural"
            
            }

            // create a marker for the current museum and bind a popup to display the relevant information
            let museumMarker = L.marker([currentMuseum.Latitude, currentMuseum.Longitude])
            .bindPopup("<b>Museum Name: </b>" + currentMuseum.Museum_Name + "<br>" +
            "<b>Museum Type: </b>" + currentMuseum.Museum_Type + "<br>" +
            "<b>Locale: </b>" + localeCode() + "<br>" +
            "<b>Revenue: </b>$" + currentMuseum.Revenue);

            // add the marker to the cluster marker group
            museumMarkers.addLayer(museumMarker);

        
        }
        
            // make an object with the tile layers
            let baseMaps = {
                "View 01": tile1,
                "View 02": tile2,
                "View 03": tile3
            };
    
            // make an object for marker layers
            let overlayMaps = {
                "Museums": museumMarkers
            };
            
            // make a map object
            let myMap = L.map("map", {
                center: [41.4925, -99.9018],
                zoom: 4,
                layers: [tile1, museumMarkers]
            });
    
            // make the layer control
            L.control.layers(baseMaps, overlayMaps, {
                collapsed: false
            }).addTo(myMap);
        
    }
)
