// You don't need to import vis here, as it's included from the CDN in the global scope

// DOM element where the Network will be attached
const container = document.getElementById("mynetwork");

// Data for the network
const data = {
  nodes: new vis.DataSet([
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    // Added more nodes
    { id: 5, label: "Node 5" },
    { id: 6, label: "Node 6" },
    { id: 7, label: "Node 7" },
    { id: 8, label: "Node 8" },
    { id: 9, label: "Node 9" },
    { id: 10, label: "Node 10" },
  ]),
  edges: new vis.DataSet([
    // Existing edges, using one direction for undirected visualization
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 1 },

    // Added more edges to make the graph more complex
    { from: 1, to: 5 },
    { from: 2, to: 6 },
    { from: 3, to: 7 },
    { from: 4, to: 8 },
    { from: 5, to: 9 },
    { from: 6, to: 10 },
    { from: 7, to: 8 },
    { from: 8, to: 9 },
    { from: 9, to: 10 },
    // Connect back to the start to make it more cyclic
    { from: 10, to: 1 },
    // Additional connections for complexity
    { from: 5, to: 2 },
    { from: 6, to: 3 },
    { from: 7, to: 4 },
    { from: 8, to: 5 },
    { from: 9, to: 6 },
    { from: 10, to: 7 },
  ]),
};

// Options for the network
const options = {};
// Initialize the network
const network = new vis.Network(container, data, options);

// Assumes network is your vis.js network instance
let updateInterval = 1000; // Adjust the interval as needed

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animateDfs(network, nodeId, visited = new Set()) {
  // Highlight the current node
  network.body.data.nodes.update({ id: nodeId, color: "red" });

  // Wait for the animation to catch up
  await sleep(updateInterval);

  // Mark this node as visited
  visited.add(nodeId);

  // Get all connected nodes (neighbors)
  let connectedNodes = network.getConnectedNodes(nodeId);

  // Recursively visit each connected node if not visited
  for (const nextNodeId of connectedNodes) {
    if (!visited.has(nextNodeId)) {
      await animateDfs(network, nextNodeId, visited);
    }
  }

  // Wait to backtrack (can skip if you do not want to animate the backtrack)
  await sleep(updateInterval);

  // Optionally, unhighlight the node to indicate it's being backtracked
  network.body.data.nodes.update({ id: nodeId, color: "blue" }); // choose a color to represent backtrack
}

// Start the recursive DFS animation from node #1, for example
// animateDfs(network, 1);
