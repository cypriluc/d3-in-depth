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
