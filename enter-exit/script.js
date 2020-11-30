// 01
let myData1 = ["A", "B", "C", "D", "E"];
// .enter identifies any DOM elements that need to be added when the joined array is longer than the selection
function doEnter() {
  d3.select("#01").selectAll("div").data(myData1).enter().append("div");
}
// .enter returns an enter selection which basically represents the elements that need to be added
// It’s followed by .append which adds elements to the DOM

// 02
let myData2 = ["A", "B", "C", "D", "E"];
function doEnter2() {
  d3.select("#02").selectAll("div").data(myData2).enter().append("div");
}
