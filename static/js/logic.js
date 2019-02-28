var schoolArray = [] 

function createMap(schools) {

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 10,
      id: "mapbox.light",
      accessToken: map_api
    });

    var baseMaps = {
      "Light Map": lightmap
    };

    // Create an overlayMaps object to hold the schoollayer
    var overlayMaps = {
      "Schools": schools
    };

    var map = L.map("map", {
      center: [37.8272, -122.2913],
      zoom: 6,
      layers: [lightmap, schools]
    });

    
  
    // Create a baseMaps object to hold the lightmap layer
     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
     L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  
    // Create the map object with options
    
    };
  
   


// createMap();

function createMarkers(response) {
    
  //   // Pull the "school" property off of response.schools
    var schools = response.features
    // console.log(schools)

  //   // Initialize an array to hold school markers
    var schoolMarkers = [];
    // var markers = L.markerClusterGroup();
  
  //   // Loop through the school array
    for (var i = 0; i < schools.length; i++) {
      var school = schools[i].properties;
      // console.log([school.lat, school.lon])
      schoolMarkers.push(
        .addLayer(L.marker([school.lat, school.lon])
        .bindPopup("<h3>" + school.name + "<h3><h3>Great Schools Rating: " + school.gsRating + "<h3>" + "<h3><h3>Parent Rating: " + school.parentRating));
  //   // For each school, create a marker and bind a popup with the school's name
        
  
  //   // Add the marker to the schoolMarkers array
      // schoolMarkers.push(schoolMarker);
    };
    var markerLayer = L.layerGroup(schoolMarkers)
  //   // Create a layer group made from the school markers array, pass it into the createMap function
    createMap(markerLayer);
  };
  
  
  var changedSelection = document.getElementById('selDataset');

  changedSelection.addEventListener("change", function() {
    // console.log(this.selectedIndex.text);
    switch(changedSelection.value) {
        case "clusteredHeatMap":
        d3.json("GeoSchoolData.json", createMarkers);
        // console.log('yay');

        break;
        // case y:
          // code block
          // break;
        default:
          // code block
       }  
  });
  
      // Perform an API call to the Great Schools API to get station information. Call createMarkers when complete

  
    
    

//   console.log(schoolArray);
// d3.json("GeoData.json", createMarkers);

  






















  