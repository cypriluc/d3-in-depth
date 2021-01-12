const data = {
  children: [
    {
      children: [{}, {}, {}],
    },
    {
      children: [
        {
          children: [{}, {}, {}],
        },
        {},
      ],
    },
  ],
};

const data2 = {
  name: "A1",
  children: [
    {
      name: "B1",
      children: [
        {
          name: "C1",
          value: 100,
        },
        {
          name: "C2",
          value: 200,
        },
        {
          name: "C3",
          value: 300,
        },
      ],
    },
    {
      name: "B2",
      value: 100,
      name: "B3",
      children: [
        {
          name: "D3",
          children: [
            {
              name: "X1",
              value: 60,
            },
            {
              name: "X2",
              value: 30,
            },
            {
              name: "X3",
              value: 90,
            },
          ],
        },
        {
          name: "D4",
          value: 300,
        },
      ],
    },
  ],
};

const root = d3.hierarchy(data);
const treeLayout = d3.tree().size([400, 200]);
treeLayout(root);

// Nodes
d3.select("#tree1 g.nodes")
  .selectAll("circle.node")
  .data(root.descendants())
  .enter()
  .append("circle")
  .classed("node", true)
  .attr("cx", function (d) {
    return d.x;
  })
  .attr("cy", function (d) {
    return d.y;
  })
  .attr("r", 4);

// Links
d3.select("#tree1 g.links")
  .selectAll("line.link")
  .data(root.links())
  .enter()
  .append("line")
  .classed("link", true)
  .attr("x1", function (d) {
    return d.source.x;
  })
  .attr("y1", function (d) {
    return d.source.y;
  })
  .attr("x2", function (d) {
    return d.target.x;
  })
  .attr("y2", function (d) {
    return d.target.y;
  });

// 02 Cluster Layout
const clusterLayout = d3.cluster().size([400, 200]);
const root2 = d3.hierarchy(data);
clusterLayout(root2);

// Nodes
d3.select("#cluster1 g.nodes")
  .selectAll("circle.node")
  .data(root2.descendants())
  .enter()
  .append("circle")
  .classed("node", true)
  .attr("cx", function (d) {
    return d.x;
  })
  .attr("cy", function (d) {
    return d.y;
  })
  .attr("r", 4);

// Links
d3.select("#cluster1 g.links")
  .selectAll("line.link")
  .data(root2.links())
  .enter()
  .append("line")
  .classed("link", true)
  .attr("x1", function (d) {
    return d.source.x;
  })
  .attr("y1", function (d) {
    return d.source.y;
  })
  .attr("x2", function (d) {
    return d.target.x;
  })
  .attr("y2", function (d) {
    return d.target.y;
  });

// Tree Map
const treeMapLayout = d3.treemap().size([400, 200]).paddingOuter(10);
const rootNode = d3.hierarchy(data2);
/* Before applying this layout to our hierarchy we must run .sum() on the hierarchy. 
This traverses the tree and sets .value on each node to the sum of its children: */
rootNode.sum(function (d) {
  return d.value;
});
treeMapLayout(rootNode);

const nodes = d3
  .select("#treemap g")
  .selectAll("g")
  .data(rootNode.descendants())
  .enter()
  .append("g")
  .attr("transform", function (d) {
    return "translate(" + [d.x0, d.y0] + ")";
  });

nodes
  .append("rect")
  .attr("width", function (d) {
    return d.x1 - d.x0;
  })
  .attr("height", function (d) {
    return d.y1 - d.y0;
  });

nodes
  .append("text")
  .attr("dx", 4)
  .attr("dy", 14)
  .text(function (d) {
    return d.data.name;
  });
