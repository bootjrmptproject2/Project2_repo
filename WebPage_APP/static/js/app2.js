// Define the parameters for the chart's space
var width = 800;
var height = width - width / 4;
var margin = 20;

// Padding for the axes and their labels
var axisPadding = 120;
var xTextPadding = 40;
var yTextPadding = 40;

// Create the canvas for the chart
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

// Setting the radius of the circle markers
var circleRadius = 5;

// Setting up the x-axis
svg.append("g").attr("class", "xText");

var xText = d3.select(".xText");

// Creating a function to replace the x-axis labels bottom-center whenever the labels are clicked on
function xTextRefresh() {
  xText.attr(
    "transform",
    "translate(" + ((width - axisPadding) / 2 + axisPadding) + ", " + (height - margin - xTextPadding) + ")"
  );
}

xTextRefresh();

// Appending the x-axis labels to the chart
xText
  .append("text")
  .attr("y", -25)
  .attr("data-name", "gsRating")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("Great Schools Rating");

xText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "parentRating")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Parent Rating");

// Setting up the y-axis
var yTextPosition = margin + yTextPadding;
var yTextHeight = (height + axisPadding) / 2 - axisPadding;

svg.append("g").attr("class", "yText");

var yText = d3.select(".yText");

// Creating a function to replace the y-axis label(s) center-left whenever the label(s) are clicked on
function yTextRefresh() {
  yText.attr(
    "transform",
    "translate(" + yTextPosition + ", " + yTextHeight + ")rotate(-90)"
  );
}

yTextRefresh();

// Appending the y-axis label to the chart
yText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "income")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Household Income");

  yText
  .append("text")
  .attr("y", 25)
  .attr("data-name", "price")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Housing Price");

// Import the data from the CSV file
d3.csv("../templates/data/data2.csv",function(data) {
  visualize(data);
});

// Create the visualization function to modify the chart based on the imported data
function visualize(theData) {
  // Define the default selected label for each axis
  var xTextActive = "gsRating";
  var yTextActive = "income";

  // Create a function to set up the tooltip that appears when a marker is hovered over
  var tooltip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([40, -60])
    .html(function(d) {
      console.log(d)
      var schoolName = "<div>" + d.name + "</div>";
      var xInformation = "<div>" + xTextActive + ": " + d[xTextActive] + "</div>";
      var yInformation = "<div>" + yTextActive + ": $" + parseFloat(d[yTextActive]).toLocaleString("en") + "</div>";
      
      // Display the concatenated information in the tooltip
      return schoolName + xInformation + yInformation;
    });

  svg.call(tooltip);

  // Create a function to get the min and max values for the selected label, to be used in setting up the x-axis limits
  var xMin;
  var xMax;

  function xLimitRefresh() {
    xMin = d3.min(theData, function(d) {
      return parseFloat(d[xTextActive]) * 0.90;
    });

    xMax = d3.max(theData, function(d) {
      return parseFloat(d[xTextActive]) * 1.10;
    });
  }

  // Create a function to get the min and max values for any given column, to be used in setting up the y-axis limits
  var yMin;
  var yMax;
  
  function yLimitRefresh() {
    yMin = d3.min(theData, function(d) {
      return parseFloat(d[yTextActive]) * 0.90;
    });

    yMax = d3.max(theData, function(d) {
      return parseFloat(d[yTextActive]) * 1.10;
    });
  }

  // Create a function to update the class and formatting of a label when it is selected
  function updateText(axis, clickedText) {
    // Set the currently active label to inactive
    d3
      .selectAll(".aText")
      .filter("." + axis)
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);

    // Set the selected label to active
    clickedText.classed("inactive", false).classed("active", true);
  }

  // Place the data on the chart
  // Determine the axes limits
  xLimitRefresh();
  yLimitRefresh();

  // Use the min and max limits to create the scale for each axis
  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + axisPadding, width - margin]);

  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - axisPadding, margin]);

  // Use the scale to create each axis
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  // Define the number of ticks on each axis
  xAxis.ticks(10);
  yAxis.ticks(10);

  // Append the axes to the chart
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - axisPadding) + ")");

  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + axisPadding) + ", 0)");

  // Create a group for the circle markers
  var markerGroup = svg.selectAll("g markerGroup").data(theData).enter();

  // Append the circle marker for each row of data
  markerGroup
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d[xTextActive]);
    })
    .attr("cy", function(d) {
      return yScale(d[yTextActive]);
    })
    .attr("r", circleRadius)
    .attr("opacity", 0.5)
    // Set the color of the circle marker based on the county
    .style("fill", function(d) {
      if (d.county == "Alameda") {
        return "lightblue"
      } else if (d.county == "Contra Costa") {
        return "darkblue"
      } else if (d.county == "San Francisco") {
        return "lightyellow"
      } else if (d.county == "San Mateo") {
        return "blue"
      } else if (d.county == "Santa Clara") {
        return "lightred"
      } else {
        return "yellow"
      };
    })
    .style("stroke", "#e3e3e3")
    // While hovering over a circle marker, highlight the circle and show the tooltip
    .on("mouseover", function(d) {
      tooltip.show(d, this);
      d3.select(this).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      tooltip.hide(d);
      d3.select(this).style("stroke", "#e3e3e3");
    });

  // Set up the dynamic elements of the chart
  // Select the axes labels, then create an on-click function to set the clicked label to active and update the chart accordingly
  d3.selectAll(".aText").on("click", function() {
    var self = d3.select(this);

    // Check if the clicked label is currently inactive
    if (self.classed("inactive")) {
      var axis = self.attr("data-axis");
      var name = self.attr("data-name");

      // Updating the chart if an x-axis label is clicked
      if (axis === "x") {
        // Set the selected label to the clicked on label
        xTextActive = name;

        // Check the new label's min and max values
        xLimitRefresh();

        // Use the new min and max values to update the x-axis's scale
        xScale.domain([xMin, xMax]);
        svg.select(".xAxis").transition().duration(300).call(xAxis);

        // Update the location of the circle markers
        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cx", function(d) {
              return xScale(d[xTextActive]);
            })
            .duration(300);
        });

        // Update the formatting of the labels
        updateText(axis, self);
      }
      // Updating the chart if an y-axis label is clicked
      else {
        // Set the selected label to the clicked on label
        yTextActive = name;

        // Check the new label's min and max values
        yLimitRefresh();

        // Use the new min and max values to update the y-axis's scale
        yScale.domain([yMin, yMax]);
        svg.select(".yAxis").transition().duration(300).call(yAxis);

        // Update the location of the circle markers
        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cy", function(d) {
              return yScale(d[yTextActive]);
            })
            .duration(300);
        });

        // Update the formatting of the labels
        updateText(axis, self);
      }
    }
  });
}