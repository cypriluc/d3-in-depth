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
context.strokeStyle = " rgb(51, 117, 13)";
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
