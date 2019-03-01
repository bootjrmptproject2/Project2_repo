

var map = L.map("map", {
    center: [37.8272, -122.2913],
    zoom: 6
  });

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.light",
    accessToken: map_api
  });


  
  var changedSelection = document.getElementById('selGraph');

  changedSelection.addEventListener("change", function() {
    // console.log(this.selectedIndex.text);
    switch(changedSelection.value) {
        case "clusteredHeatMap":
        console.log("chose clusteredHeatMap");
        d3.json("Geoschooldata.json", function(response) {
            var schools = response.features;
            var markers = L.markerClusterGroup();
            console.log("went into the json function");
            for (var i = 0; i < schools.length; i++) {
                var location = schools[i].geometry;
                var school = schools[i].properties;
                // console.log([school.lat, school.lon])
                if (location) {
                
                markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
                       .bindPopup("<h3>" + school.name + "<h3><h3>Great Schools Rating: " + school.gsRating + "<h3>" + "<h3><h3>Parent Rating: " + school.parentRating));

                }
            
          
        
            }
             map.addLayer(markers);
        });
        // console.log('yay');

        break;
        // case y:
          // code block
          // break;
        default:
          // code block
       }  
  });

  















