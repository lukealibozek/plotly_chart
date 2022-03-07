// var topFiveCityNames = cityGrowths.map(city => city.City);
// var topFiveCityGrowths = cityGrowths.map(city => parseInt(city.Increase_from_2016));

// var trace = {
//   x: topFiveCityNames,
//   y: topFiveCityGrowths,
//   type: "bar"
// };
// var data = [trace];
// var layout = {
//   title: "Most Rapidly Growing Cities",
//   xaxis: {title: "City" },
//   yaxis: {title: "Population Growth, 2016-2017"}
// };
// Plotly.newPlot("bar-plot", data, layout);

// ------------Skill Drill------------
var sortedCityPop = cityGrowths.sort((a,b) => b.population - a.population);
var sevenLargestNames = sortedCityPop.map(x => x.City).slice(0,7);
console.log(sevenLargestNames)
var sevenLargestPops = sortedCityPop.map(x => parseInt(x.population)).slice(0,7);
console.log(sevenLargestPops)


var trace = {
  x: sevenLargestNames,
  y: sevenLargestPops,
  type: "bar"
};
var data = [trace];
var layout = {
  title: "seven largest cities by population",
  xaxis: {title: "City" },
  yaxis: {title: "Population"}
};
Plotly.newPlot("bar-plot", data, layout);