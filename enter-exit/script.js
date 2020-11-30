// 01
let myData1 = ["A", "B", "C", "D", "E"];
// .enter identifies any DOM elements that need to be added when the joined array is longer than the selection
function doEnter() {
  d3.select("#content-1").selectAll("div").data(myData1).enter().append("div");
}
// .enter returns an enter selection which basically represents the elements that need to be added
// It’s followed by .append which adds elements to the DOM

// 02
let myData2 = ["A", "B", "C", "D", "E"];
function doEnter2() {
  d3.select("#content-2").selectAll("div").data(myData2).enter().append("div");
}

// 03
let myData3 = ["A"];
function doExit1() {
  d3.select("#content-3").selectAll("div").data(myData3).exit().remove();
}

// 04
// update exiting
let myData4 = ["A", "B", "C", "D", "E"];
function updateExisting() {
  let u = d3.select("#content-4").selectAll("div").data(myData4);
  u.enter().append("div");
  u.text(function (d) {
    return d;
  });
}

// update entering
function updateEntering() {
  let u = d3.select("#content-5").selectAll("div").data(myData4);
  u.enter()
    .append("div")
    .text(function (d) {
      return d;
    });
}

// update both - use merge
function updateBoth() {
  let u = d3.select("#content-6").selectAll("div").data(myData4);
  u.enter()
    .append("div")
    .merge(u)
    .text(function (d) {
      return d;
    });
}

// 07 update general
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function updateGeneral() {
  let rand = Math.floor(Math.random() * 26);
  let myData7 = letters.slice(0, rand).split("");
  update(myData7);
}
function update(data) {
  let u = d3.select("#content-7").selectAll("div").data(data);
  u.enter()
    .append("div")
    .merge(u)
    .text(function (d) {
      return d;
    });
  u.exit().remove();
}
updateGeneral();

// 08
function updateDataColor() {
  let rand = Math.floor(Math.random() * 26);
  let myData8 = letters.slice(0, rand).split("");
  updateColor(myData8);
}
function updateColor(data) {
  let u = d3.select("#content-8").selectAll("div").data(data);
  u.enter()
    .append("div")
    .classed("new", true)
    .text(function (d) {
      return d;
    });

  u.text(function (d) {
    return d;
  }).classed("new", false);

  u.exit().remove();
}
updateDataColor();

// 09
let i = 25;
function insert() {
  if (i < 0) return;
  let myData9 = letters.slice(i).split(" ");
  i--;
  updateInsert(myData9);
}
function updateInsert(data) {
  let u = d3
    .select("#content-9")
    .selectAll("div")
    .data(data, function (d) {
      return d;
    });
  u.enter()
    .append("div")
    .merge(u)
    .transition()
    .style("margin-left", function (d, i) {
      return i * 32 + "px";
    })
    .text(function (d) {
      return d;
    });
}

insert();
