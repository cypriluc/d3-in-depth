const width = 960,
  height = 500,
  resolution = 20,
  r = 15;

const svg = d3.select("svg").attr("width", width).attr("height", height);

let points = d3.range(10).map(function () {
  let randomX = Math.random() * width,
    randomY = Math.random() * height;
  return {
    x: round(Math.max(r, Math.min(width - r, randomX)), resolution),
    y: round(Math.max(r, Math.min(height - r, randomY)), resolution),
  };
});

const dragHandler = d3.drag();
dragHandler.on("drag", dragged);

svg
  .selectAll(".vertical")
  .data(d3.range(1, width / resolution))
  .enter()
  .append("line")
  .classed("vertical", true)
  .attr("x1", function (d) {
    return d * resolution;
  })
  .attr("y1", 0)
  .attr("x2", function (d) {
    return d * resolution;
  })
  .attr("y2", height);

svg
  .selectAll(".horizontal")
  .data(d3.range(1, height / resolution))
  .enter()
  .append("line")
  .classed("horizontal", true)
  .attr("x1", 0)
  .attr("y1", function (d) {
    return d * resolution;
  })
  .attr("x2", width)
  .attr("y2", function (d) {
    return d * resolution;
  });

let circles = svg
  .selectAll("circle")
  .data(points)
  .enter()
  .append("circle")
  .attr("cx", function (d) {
    return d.x;
  })
  .attr("cy", function (d) {
    return d.y;
  })
  .attr("r", r);

dragHandler(circles);

function dragged(d) {
  let x = d.x,
    y = d.y,
    gridX = round(Math.max(r, Math.min(width - r, x)), resolution),
    gridY = round(Math.max(r, Math.min(height - r, y)), resolution);
  d3.select(this).attr("cx", gridX).attr("cy", gridY);
}

function round(position, resolution) {
  return position % resolution < resolution / 2
    ? position - (position % resolution)
    : position + resolution - (position % resolution);
}
