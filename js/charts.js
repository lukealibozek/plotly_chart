// ----------- BASE CODE -----------

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("data/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("data/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// ----------- DELIVERABLE 1 -----------

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("data/samples.json").then((data) => {

    // 3. Create a variable that holds the samples array. 
    var sampleArrays = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArrayFiltered = sampleArrays.filter(x => x.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var result = sampleArrayFiltered[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var outID = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = outID.slice(0, 10).map(x => "OTU " + x).reverse();
    var outLablesTen = otuLabels.slice(0, 10).reverse();
    var sampleValuesTen = sampleValues.slice(0, 10).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = {
      x: sampleValuesTen,
      y: yticks,
      text: outLablesTen,
      type: "bar",
      orientation: "h", 
      marker: {
        color: 'rgb(102, 204, 255)'
      }
    };

    var trace = [barData];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title:"Top 10 Bacteria Cultures Found",
    
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", trace, barLayout);
    
    // ----------- DELIVERABLE 2 -----------

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: outID,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: outID,
        colorscale:"RdBu",
      }

    }];
    
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title:"OTU ID"},
      hovermode:'closest',
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
    // Create the trace for the gauge chart.
    var metadata= data.metadata;
    

    // ----------- DELIVERABLE 3 -----------

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metaFiltered = metadata.filter(x => x.id == sample);
    
    // 2. Create a variable that holds the first sample in the metadata array.
    metaResults = metaFiltered[0];

    // 3. Create a variable that holds the washing frequency.
    var wfreq_value = metaResults.wfreq;

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      type: "indicator",
      mode: "gauge+number",
      value: wfreq_value,
      title: "Belly Button Washing Frequency <br>--------------------<br> Scrubs Per Week",
      gauge: {
        bar: { color: "black" },
        borderwidth: 2,
        bordercolor: "grey20",
        axis: { 
            range: [0, 10], 
            tickwidth: 2, 
            tickcolor: "grey20",
            nticks: 6
        },
        steps: [
          { range: [0, 2], color: "red"},
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "limegreen" },
          { range: [8, 10], color: "darkgreen" }
        ]
      },
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width:500,
      height:400,
      font: {
        color: "grey20"
      } 
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}