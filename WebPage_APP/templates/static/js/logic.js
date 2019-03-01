 
  var changedSelection = document.getElementById('selGraph');

  changedSelection.addEventListener("change", function() {
    // console.log(this.selectedIndex.text);
    switch(changedSelection.value) {
        case "clusteredHeatMap":
        console.log("chose clusteredHeatMap");


        var myMap = L.map("map", {
            center: [37.8272, -122.2913],
            zoom: 11
            // maxZoom: 50
          });

        var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: map_api
          }).addTo(myMap);

        d3.json("data/Geoschooldata.json", function(response) {
            // console.log(response);
            var schools = response.features;
            var markers = L.markerClusterGroup();
            var heatArray = [];
            console.log("went into the json function");
            for (var i = 0; i < schools.length; i++) {
                console.log("went into the loop");
                var location = schools[i].geometry;
                var school = schools[i].properties;
                // console.log([school.lat, school.lon])
                if (location) {
                
                    markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
                           .bindPopup("<h3>" + school.name + "<h3><h3>Great Schools Rating: " + school.gsRating + "<h3>" + "<h3><h3>Parent Rating: " + school.parentRating));

                    heatArray.push([location.coordinates[1], location.coordinates[0], parseInt(school.gsRating)/10]);
                    // console.log(parseInt(school.gsRating)/10)
                }
            
            }
            myMap.addLayer(markers);  

            var heatmap = L.heatLayer(heatArray, {
                radius: 25,
                max: 4,
                blur: 15,              
                gradient: {
                    0.0: 'green',
                    0.5: 'yellow',
                    1: 'orange'
                },
                minOpacity: 0.05,
                maxZoom: 12.0
            }).addTo(myMap);

            var baseLayers = {
                "Street Map": streetmap
            };

            var overlayMaps = {
                "Schools": markers,
                "Top Schools Heat Map": heatmap
            };
      
            L.control.layers(baseLayers, overlayMaps, {
              collapsed: false
            }).addTo(myMap);

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

  















