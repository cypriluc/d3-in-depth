// 01
d3.select(".select1")
  .selectAll("circle")
  .style("fill", "orange")
  .attr("r", function () {
    return 10 + Math.random() * 40;
  });

// 02
d3.select(".select2").select("circle").classed("purple", true);
d3.select(".select2").select("circle:nth-child(3)").classed("selected", true);
d3.select(".select2").select(".checkbox").property("checked", true);
d3.select(".select2")
  .select("h2")
  .text("Select/Add class/Update property/Update text");

// 03
function move() {
  d3.select(".select3")
    .selectAll("circle")
    // "d" is the joined data, "i" is the element index within the selection, we can use anonymus or named function
    .attr("cx", positionCircles);
}
function positionCircles(d, i) {
  return i * 80;
}

// 04
d3.select(".select4")
  .selectAll("circle")
  .on("click", function (d, i) {
    // (d, i) in event handlers available in version 4.2.2
    d3.select(".status").text("You clicked on circle " + i);
    d3.select(this).style("fill", "orange");
  });

// 05
d3.select(".select5")
  .selectAll("g.item")
  // or use .insert("text", "circle") to specify the position where the element should be placed
  .append("text")
  .text(function (d, i) {
    return i + 1;
  })
  .style("fill", "#ddd")
  .style("font-size", "50px")
  .style("text-anchor", "middle")
  .style("font-weight", "bold");
d3.select(".select5").selectAll("circle").style("fill", "orange");

function remove() {
  d3.select(".select5").selectAll("circle").remove();
}

// 06
function addNumberedCircle(d, i) {
  d3.select(this).append("circle").attr("r", 20);
  d3.select(this)
    .append("text")
    .text(i + 1)
    .attr("y", 50)
    .attr("x", 30);
}

d3.select(".select6").selectAll("g.item").each(addNumberedCircle);

d3.select(".select6")
  .selectAll("circle")
  .each(function (d, i) {
    var odd = i % 2 === 1;
    d3.select(this)
      .style("fill", odd ? "orange" : "#ddd")
      .attr("r", odd ? 40 : 20);
  });

// 07
function addNumberedCircleCall(selection) {
  selection.append("circle").attr("r", 20);

  selection
    .append("text")
    .text(function (d, i) {
      return i + 1;
    })
    .attr("y", 50)
    .attr("x", 30);
}
d3.select(".select7").selectAll("g.item").call(addNumberedCircleCall);

// 08
d3.select(".select8")
  .selectAll("circle")
  // .filter returns true if the element should be included
  .filter(function (d, i) {
    return i % 2 === 0;
  })
  .style("fill", "orange");

// 09
let myData = [
  {
    name: "Andy",
    score: 37,
  },
  {
    name: "Beth",
    score: 39,
  },
  {
    name: "Craig",
    score: 31,
  },
  {
    name: "Diane",
    score: 35,
  },
  {
    name: "Evelyn",
    score: 38,
  },
];

var barWidth = 400;
var barScale = d3.scaleLinear().domain([0, 100]).range([0, barWidth]);

var u = d3.select("#wrapper").selectAll(".person").data(myData);

var entering = u.enter().append("div").classed("person", true);

entering
  .append("div")
  .classed("label", true)
  .text(function (d) {
    return d.name;
  });

entering
  .append("div")
  .classed("bar", true)
  .style("width", function (d) {
    return barScale(d.score) + "px";
  });

function sort() {
  d3.selectAll(".person").sort(function (a, b) {
    return b.score - a.score;
  });
}
