// function createMap(schools) {

//     // Create the tile layer that will be the background of our map
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.light",
//       accessToken: map_api
//     });
  
//     // Create a baseMaps object to hold the lightmap layer
//     var baseMaps = {
//       "Light Map": lightmap
//     };
  
//     // Create an overlayMaps object to hold the bikeStations layer
//     var overlayMaps = {
//       "Schools": schools
//     };
  
//     // Create the map object with options
//     var map = L.map("map", {
//       center: [37.8272, -122.2913],
//       zoom: 12,
//       layers: [lightmap, schools]
//     });
  
//     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);
//   }
  
//   function createMarkers(response) {
  
//     // Pull the "stations" property off of response.data
//     var schools = response.schools;

//     // Initialize an array to hold bike markers
//     var schoolMarkers = [];
  
//     // Loop through the stations array
//     for (var index = 0; index < schools.length; index++) {
//       var school = schools[index];
  
//       // For each station, create a marker and bind a popup with the station's name
//       var schoolMarker = L.marker([school.lat, school.lon])
//         .bindPopup("<h3>" + school.name + "<h3><h3>Type: " + school.type + "<h3>" + "<h3><h3>Parent Rating: " + school.parentRating);
  
//       // Add the marker to the bikeMarkers array
//       schoolMarkers.push(schoolMarker);
//     }
  
//     // Create a layer group made from the bike markers array, pass it into the createMap function
//     createMap(L.layerGroup(schoolMarkers));
//   }
  
//   function optionChanged(value) {
//     switch(value) {
//         case "clusteredHeatMap":
//         d3.xml("https://api.greatschools.org/schools/nearby?key=98d1830833800c9133ce4854f15ba749&state=CA&lat=37.8272&lon=-122.2913&radius=20&limit=100", createMarkers);
//           break;
//         //case y:
//           // code block
//           //break;
//         default:
//           // code block
//        }
//   }
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.xml("https://api.greatschools.org/schools/nearby?key=98d1830833800c9133ce4854f15ba749&state=CA&lat=37.8272&lon=-122.2913&radius=20&limit=100", function(data) {
      console.log(data)
  });
  