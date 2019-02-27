var schoolArray = [] 
 // Changes XML to JSON
// function xmlToJson(xml) {
	
// 	// Create the return object
// 	var obj = {};

// 	if (xml.nodeType == 1) { // element
// 		// do attributes
// 		if (xml.attributes.length > 0) {
// 		obj["@attributes"] = {};
// 			for (var j = 0; j < xml.attributes.length; j++) {
// 				var attribute = xml.attributes.item(j);
// 				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
// 			}
// 		}
// 	} else if (xml.nodeType == 3) { // text
// 		obj = xml.nodeValue;
// 	}

// 	// do children
// 	if (xml.hasChildNodes()) {
// 		for(var i = 0; i < xml.childNodes.length; i++) {
// 			var item = xml.childNodes.item(i);
// 			var nodeName = item.nodeName;
// 			if (typeof(obj[nodeName]) == "undefined") {
// 				obj[nodeName] = xmlToJson(item);
// 			} else {
// 				if (typeof(obj[nodeName].push) == "undefined") {
// 					var old = obj[nodeName];
// 					obj[nodeName] = [];
// 					obj[nodeName].push(old);
// 				}
// 				obj[nodeName].push(xmlToJson(item));
// 			}
// 		}
//   }
//   // console.log(obj)
//   schoolArray.push(obj)
//   console.log(schoolArray)
// 	return obj;
// };



function createMap(schools) {
    // var myMap = L.map("map", {
    //   center: [40.7, -73.95],
    //   zoom: 11
    // });
    // // Create the tile layer that will be the background of our map
    // var baseMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //   maxZoom: 18,
    //   id: "mapbox.streets",
    //   accessToken: map_api
    // })


    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 10,
      id: "mapbox.light",
      accessToken: map_api
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the schoollayer
    var overlayMaps = {
      "Schools": schools
    };
  
    // Create the map object with options
    var map = L.map("map", {
      center: [37.8272, -122.2913],
      zoom: 50,
      layers: [baseMaps, schools]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
}

  function createMarkers(response) {
    
    // Pull the "school" property off of response.schools
    var schools = response.schools.school;
    console.log(schools)

    // Initialize an array to hold school markers
    var schoolMarkers = [];
  
    // Loop through the school array
    for (var index = 0; index < schools.length; index++) {
      var school = schools[index];
  
    // For each school, create a marker and bind a popup with the school's name
      var schoolMarker = L.marker([school.lat, school.lon])
      // var schoolMarker = L.markerClusterGroup();
        .bindPopup("<h3>" + school.name + "<h3><h3>Type: " + school.gsRating + "<h3>" + "<h3><h3>Parent Rating: " + school.parentRating);
  
    // Add the marker to the schoolMarkers array
      schoolMarkers.push(schoolMarker);
    }
  
    // Create a layer group made from the school markers array, pass it into the createMap function
    createMap(L.layerGroup(schoolMarkers));
  }
  
  function optionChanged(value) {
    console.log(value)
    switch(value) {
        case "clusteredHeatMap":
        d3.json("data.json", createMarkers);

        break;
        // case y:
          // code block
          // break;
        default:
          // code block
       }  
  };
  
      // Perform an API call to the Great Schools API to get station information. Call createMarkers when complete
  // for (var index = 0; index < zipcodes.length; index++) {
  //   var zip = zipcodes[index]
  //   var url = "https://cors-anywhere.herokuapp.com/https://api.greatschools.org/schools/nearby?key=" + school_api + "&state=CA&schoolType=public&zip="+ zip + "&limit=100"
  //   d3.xml(url, function(data) {
  //     xmlToJson(data)
  //   });

  
    
    
  // };
  // console.log(schoolArray);
// d3.json("data.json", createMarkers);

  






















  