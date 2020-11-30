// 01 example
let data1 = [0, 2, 3, 5, 7.5, 9, 10];

let myScale1 = d3.scaleLinear().domain([0, 10]).range([0, 600]);

d3.select("svg .inner")
  .selectAll("circle")
  .data(data1)
  .enter()
  .append("circle")
  .attr("r", 3)
  .attr("cx", function (d) {
    return myScale1(d);
  });

d3.select("svg .inner")
  .selectAll("text")
  .data(data1)
  .enter()
  .append("text")
  .attr("x", function (d) {
    return myScale1(d);
  })
  .attr("y", -8)
  .text(function (d) {
    return d;
  });

// 02 linear scale color
let myScale2 = d3.scaleLinear().domain([0, 10]).range(["orange", "purple"]);
d3.select("svg .inner2")
  .selectAll("circle")
  .data(data1)
  .enter()
  .append("circle")
  .attr("r", 40)
  .attr("cx", function (d, i) {
    return i * 90;
  })
  .attr("fill", function (d) {
    return myScale2(d);
  });

// 03 Squared scale - used for circles to represent area
let sqrtScale1 = d3.scaleSqrt().domain([0, 101]).range([0, 30]);
let linearScale3 = d3.scaleLinear().domain([0, 100]).range([0, 700]);
let data3 = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 101];
d3.select("svg .inner3")
  .selectAll("circle")
  .data(data3)
  .enter()
  .append("circle")
  .attr("r", function (d) {
    return sqrtScale1(d);
  })
  .attr("cx", function (d) {
    return linearScale3(d);
  });

// 04 scaleLog
let data4 = [10, 100, 1000, 10000, 100000];
let logScale4 = d3.scaleLog().domain([10, 100000]).range([0, 600]);
d3.select("svg .inner4")
  .selectAll("text")
  .data(data4)
  .enter()
  .append("text")
  .text(function (d) {
    return d;
  })
  .attr("x", function (d) {
    return logScale4(d);
  });

// 05 time
let data5 = [
  new Date(2016, 0, 1),
  new Date(2016, 3, 1),
  new Date(2016, 6, 1),
  new Date(2017, 0, 1),
];
let timeScale5 = d3
  .scaleTime()
  .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
  .range([0, 700]);
d3.select("svg .inner5")
  .selectAll("circle")
  .data(data5)
  .enter()
  .append("circle")
  .attr("r", 3)
  .attr("cx", function (d) {
    return timeScale5(d);
  });
d3.select("svg .inner5")
  .selectAll("text")
  .data(data5)
  .enter()
  .append("text")
  .text(function (d) {
    return d.toDateString();
  })
  .attr("x", function (d) {
    return timeScale5(d);
  })
  .attr("y", -8);

// 06 rainbow
let data6 = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
var sequentialScale6 = d3
  .scaleSequential()
  .domain([0, 100])
  .interpolator(d3.interpolateRainbow);
d3.select("svg .inner6")
  .selectAll("circle")
  .data(data6)
  .enter()
  .append("circle")
  .attr("r", 15)
  .attr("cx", function (d, i) {
    return i * 50;
  })
  .attr("fill", function (d) {
    return sequentialScale6(d);
  });

// 07
var linearScale7 = d3.scaleLinear().domain([0, 100]).range([0, 600]);

var sequentialScale7 = d3.scaleSequential().domain([0, 100]);

var interpolators = [
  "interpolateViridis",
  "interpolateInferno",
  "interpolateMagma",
  "interpolatePlasma",
  "interpolateWarm",
  "interpolateCool",
  "interpolateRainbow",
  "interpolateCubehelixDefault",
];

var data7 = d3.range(0, 100, 2);

function dots(d) {
  sequentialScale7.interpolator(d3[d]);

  d3.select(this).append("text").attr("y", -10).attr("x", 40).text(d);

  d3.select(this)
    .selectAll("rect")
    .data(data7)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return linearScale7(d);
    })
    .attr("width", 11)
    .attr("height", 30)
    .style("fill", function (d) {
      return sequentialScale7(d);
    });
}

d3.select(".inner7")
  .selectAll("g.interpolator")
  .data(interpolators)
  .enter()
  .append("g")
  .classed("interpolator", true)
  .attr("transform", function (d, i) {
    return "translate(0, " + i * 70 + ")";
  })
  .each(dots);
