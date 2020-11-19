// 01
// data is and array, can contain any type/objects
var scores = [
  {
    name: "Andy",
    score: 25,
  },
  {
    name: "Beth",
    score: 39,
  },
  {
    name: "Craig",
    score: 42,
  },
  {
    name: "Diane",
    score: 35,
  },
  {
    name: "Evelyn",
    score: 48,
  },
];

let circles1 = d3.select(".data1").selectAll("circle");
// select elements and join data to it
circles1.data(scores);
// manipulate circles according joined data subsequently
circles1.attr("r", function (d) {
  return d.score;
});

// 02
let myData = [10, 40, 20, 30, 50];
let s = d3.select(".data2").selectAll("circle");
s.data(myData);
s.attr("r", function (d) {
  return d;
});
s.attr("cx", function (d, i) {
  return i * 120;
});
s.classed("high", function (d) {
  return d >= 40; // returns true or false
});

// 03
let cities = [
  { name: "London", population: 8674000 },
  { name: "New York", population: 8406000 },
  { name: "Sydney", population: 4293000 },
  { name: "Paris", population: 2244000 },
  { name: "Beijing", population: 11510000 },
];

let s3 = d3.select(".data3").selectAll("circle");
s3.data(cities);
s3.attr("r", function (d) {
  var scaleFactor = 0.000005;
  return d.population * scaleFactor;
}).attr("cx", function (d, i) {
  return i * 120;
});

// 04
d3.select(".data4")
  .selectAll("rect")
  .data(cities)
  .attr("height", 19)
  .attr("width", function (d) {
    var scaleFactor = 0.00004;
    return d.population * scaleFactor;
  })
  .attr("y", function (d, i) {
    return i * 20;
  });

// Join cities to text elements and modify content and position
d3.select(".data4")
  .selectAll("text")
  .data(cities)
  .attr("y", function (d, i) {
    return i * 20 + 13;
  })
  .attr("x", -5)
  .text(function (d) {
    return d.name;
  });
