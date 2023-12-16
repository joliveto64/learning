// You don't need to import vis here, as it's included from the CDN in the global scope

// DOM element where the Network will be attached
const container = document.getElementById("mynetwork");

// Data for the network
const data = {
  nodes: new vis.DataSet([
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
  ]),
  edges: new vis.DataSet([{ from: 1, to: 2 }]),
};

// Options for the network
const options = {};

// Initialize the network
const network = new vis.Network(container, data, options);
