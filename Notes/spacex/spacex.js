// const url = "https://api.spacexdata.com/v2/launchpads";

// d3.json(url).then(receivedData => console.log(receivedData));

// ---------------Vandenberg Air Force Base only---------------
// d3.json(url).then(spaceXResults => console.log(spaceXResults[0].full_name));

// ---------------Skill Drill---------------
// d3.json(url).then(spaceXResults => spaceXResults.map(launchpad => console.log(launchpad.location.latitude,x=launchpad.location.longitude)));

// Explanation: spaceXResults[launchpad] <- this is iterated through via .map()

// --------------- Notes on d3.JSON ---------------

// const url = "https://api.spacexdata.com/v2/launchpads";
// d3.json(url).then();

// Here, the URL string is received by d3.json() as an argument. 
// The d3.json() method then retrieves the data from the address specified 
// by the URL. After the data is fully retrieved, the function inside the 
// then()method is executed.


// ---------------important---------------
// When reading an external data file such as a CSV or JSON file into a script, 
// you must run a server. You cannot directly open index.html with your browser.

// cd to dir, enter:
// python -m http.server

const url = "https://api.spacexdata.com/v2/launchpads";
d3.json(url).then();

// d3.json("samples.json").then(function(data){
//     console.log(data);
// });

// Print all meta for 1st person
d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});