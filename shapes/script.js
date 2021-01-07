// 01 line generator
const lineGenerator = d3.line();
// d3.line() accepts an array of co-ordinates and outputs a path data string
const points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80],
];
const pathData = lineGenerator(points);
d3.select(".line1").attr("d", pathData);

// 02 .x() and .y() accessor functions
const xScale = d3.scaleLinear().domain([0, 6]).range([0, 600]);
const yScale = d3.scaleLinear().domain([0, 80]).range([150, 0]);

const data2 = [
  { value: 10 },
  { value: 50 },
  { value: 30 },
  { value: 40 },
  { value: 20 },
  { value: 70 },
  { value: 50 },
];

const lineGenerator2 = d3
  .line()
  .x(function (d, i) {
    return xScale(i);
  })
  .y(function (d) {
    return yScale(d.value);
  });

const line2 = lineGenerator2(data2);

// Create a path element and set its d attribute
d3.select(".line2").append("path").attr("d", line2);

// 03 .defined()
// configure the behaviour when there’s missing data
const points3 = [[0, 80], [100, 100], null, [300, 50], [400, 40], [500, 80]];

//we can tell our line generator that each co-ordinate is valid only if it’s non-null: - otherwise is returns an error
const lineGenerator3 = d3.line().defined(function (d) {
  return d !== null;
});
const line3 = lineGenerator3(points3);
d3.select(".line3").append("path").attr("d", line3);

// 04 .curve()
const curveGenerator = d3.line().curve(d3.curveCardinal);
const curve = curveGenerator(points);
d3.select(".curve").append("path").attr("d", curve);
// draw pts for reference
d3.select(".curve")
  .selectAll("circle")
  .data(points)
  .enter()
  .append("circle")
  .attr("cx", function (d) {
    return d[0];
  })
  .attr("cy", function (d) {
    return d[1];
  })
  .attr("r", 4);

// 05 canvas
const context = d3.select("canvas").node().getContext("2d");
const lineGenerator5 = d3.line().context(context);
context.strokeStyle = "green";
context.strokeWidth = "2px";
context.beginPath();
lineGenerator5(points);
context.stroke();

// 06 radial line generator
const lineRadialGenerator = d3.lineRadial();

const points6 = [
  [0, 80],
  [Math.PI * 0.25, 80],
  [Math.PI * 0.5, 30],
  [Math.PI * 0.75, 80],
  [Math.PI, 80],
  [Math.PI * 1.25, 80],
  [Math.PI * 1.5, 80],
  [Math.PI * 1.75, 80],
  [Math.PI * 2, 80],
];

const radialLine = lineRadialGenerator(points6);

d3.select(".radial").append("path").attr("d", radialLine);

// 07 .angle() and .radius()
const lineRadialGenerator2 = d3
  .lineRadial()
  .angle(function (d) {
    return d.a;
  })
  .radius(function (d) {
    return d.r;
  });

const points7 = [
  { a: 0, r: 80 },
  { a: Math.PI * 0.25, r: 80 },
  { a: Math.PI * 0.5, r: 30 },
  { a: Math.PI * 0.75, r: 80 },
  { a: Math.PI * 1, r: 30 },
  { a: Math.PI * 1.25, r: 80 },
  { a: Math.PI * 1.5, r: 30 },
  { a: Math.PI * 1.75, r: 80 },
  { a: Math.PI * 2, r: 80 },
];

const radialLine2 = lineRadialGenerator2(points7);

d3.select(".radial2").append("path").attr("d", radialLine2);

// 08 area generator
const areaGenerator = d3.area();
const area = areaGenerator(points);
d3.select(".area").append("path").attr("d", area).style("fill", "green");

// 09 area configure baseline
const areaGenerator2 = d3.area().y0(150);
const area2 = areaGenerator2(points);
d3.select(".area2").append("path").attr("d", area2).style("fill", "green");

// 10 area accessor
const yScale10 = d3.scaleLinear().domain([0, 100]).range([200, 0]);
const areaGenerator3 = d3
  .area()
  .x(function (d) {
    return d.x;
  })
  .y0(function (d) {
    return yScale10(d.low);
  })
  .y1(function (d) {
    return yScale10(d.high);
  });

const points10 = [
  { x: 0, low: 30, high: 80 },
  { x: 100, low: 80, high: 100 },
  { x: 200, low: 20, high: 30 },
  { x: 300, low: 20, high: 50 },
  { x: 400, low: 10, high: 40 },
  { x: 500, low: 50, high: 80 },
];
const area3 = areaGenerator3(points10);
d3.select(".area3").append("path").attr("d", area3).style("fill", "green");

// 11 radial area
const radialAreaGenerator = d3
  .radialArea()
  .angle(function (d) {
    return d.angle;
  })
  .innerRadius(function (d) {
    return d.r0;
  })
  .outerRadius(function (d) {
    return d.r1;
  });

const points11 = [
  { angle: 0, r0: 20, r1: 80 },
  { angle: Math.PI * 0.25, r0: 20, r1: 40 },
  { angle: Math.PI * 0.5, r0: 20, r1: 80 },
  { angle: Math.PI * 0.75, r0: 20, r1: 40 },
  { angle: Math.PI, r0: 20, r1: 80 },
  { angle: Math.PI * 1.25, r0: 20, r1: 40 },
  { angle: Math.PI * 1.5, r0: 20, r1: 80 },
  { angle: Math.PI * 1.75, r0: 20, r1: 40 },
  { angle: Math.PI * 2, r0: 20, r1: 80 },
];

const radialArea = radialAreaGenerator(points11);
d3.select(".area4").append("path").attr("d", radialArea).style("fill", "green");

// 12 stack generator
const colors = ["#FBB65B", "#513551", "#de3163"];
const data12 = [
  { day: "Mon", apricots: 120, blueberries: 180, cherries: 100 },
  { day: "Tue", apricots: 60, blueberries: 185, cherries: 105 },
  { day: "Wed", apricots: 100, blueberries: 215, cherries: 110 },
  { day: "Thu", apricots: 80, blueberries: 230, cherries: 105 },
  { day: "Fri", apricots: 120, blueberries: 240, cherries: 105 },
];

const stack = d3.stack().keys(["apricots", "blueberries", "cherries"]);

const stackedSeries = stack(data12);

// Create a g element for each series
const g = d3
  .select(".stack")
  .selectAll("g.series")
  .data(stackedSeries)
  .enter()
  .append("g")
  .classed("series", true)
  .style("fill", function (d, i) {
    return colors[i];
  });

// For each series create a rect element for each day
g.selectAll("rect")
  .data(function (d) {
    return d;
  })
  .enter()
  .append("rect")
  .attr("width", function (d) {
    return d[1] - d[0];
  })
  .attr("x", function (d) {
    return d[0];
  })
  .attr("y", function (d, i) {
    return i * 20;
  })
  .attr("height", 19);

// 12 stack charts with area generator
const yScale12 = d3.scaleLinear().domain([0, 600]).range([200, 0]);

const areaGenerator12 = d3
  .area()
  .x(function (d, i) {
    return i * 100;
  })
  .y0(function (d) {
    return yScale12(d[0]);
  })
  .y1(function (d) {
    return yScale12(d[1]);
  });
d3.select(".stack2")
  .selectAll("path")
  .data(stackedSeries)
  .enter()
  .append("path")
  .style("fill", function (d, i) {
    return colors[i];
  })
  .style("stroke", "none")
  .attr("d", areaGenerator12);
