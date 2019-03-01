 
  var changedSelection = document.getElementById('selGraph');

  changedSelection.addEventListener("change", function() {
    // console.log(this.selectedIndex.text);
    switch(changedSelection.value) {
        case "clusteredHeatMap":
        console.log("chose clusteredHeatMap");


        var map = L.map("map", {
            center: [37.8272, -122.2913],
            zoom: 6
            // maxZoom: 50
          });

        L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
            maxZoom: 10,
            id: "mapbox.streets",
            accessToken: map_api
          }).addTo(map);

        d3.json("data/Geoschooldata.json").then(function(response) {
            // console.log(response);
            var schools = response.features;
            var markers = L.markerClusterGroup();
            console.log("went into the json function");
            for (var i = 0; i < schools.length; i++) {
                console.log("went into the loop");
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

  















