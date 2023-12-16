const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

// DEPTH FIRST TRAVERSALS ///////////////////////////////////////
/////////////////////////////////////////////////////////////////
function depthFirstTraversal(graph, src) {
  let stack = [src];

  while (stack.length > 0) {
    let current = stack.pop();
    console.log(current);

    for (let neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }
}

function depthFirstRecursion(graph, src) {
  console.log(src);

  for (let neighbor of graph[src]) {
    depthFirstRecursion(graph, neighbor);
  }
}

// depthFirstTraversal(graph, "a");
// depthFirstRecursion(graph, "a");

// BREADTH FIRST TRAVERSAL /////////////////////////
////////////////////////////////////////////////////
function breadthFirstTraversal(graph, src) {
  let queue = [src];

  while (queue.length > 0) {
    let current = queue.shift();
    console.log(current);

    for (let neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }
}

// breadthFirstTraversal(graph, "a");

// CONVERT TO GRAPH ///////////////////////////////////////
///////////////////////////////////////////////////////////
let edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"],
];

function convertEdgesToGraph(edges) {
  let graph = {};

  for (let array of edges) {
    const [a, b] = array;

    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];

    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
}

const pathGraph = convertEdgesToGraph(edges);

// HAS PATH PROBLEM ///////////////////////////////////////
///////////////////////////////////////////////////////////
function hasPathDfsRecursion(graph, src, destination, visited = new Set()) {
  if (src === destination) return true;
  if (visited.has(src)) return false;
  visited.add(src);

  for (let neighbor of graph[src]) {
    if (hasPathDfsRecursion(graph, neighbor, destination, visited)) return true;
  }

  return false;
}

function hasPathDfsIterative(graph, src, dst) {
  let visited = new Set();
  let stack = [src];

  while (stack.length > 0) {
    let current = stack.pop();
    if (current === dst) return true;
    visited.add(current);

    for (let neighbor of graph[current]) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
  return false;
}

function hasPathBfs(graph, src, destination) {
  let queue = [src];
  let visited = new Set([src]);

  while (queue.length > 0) {
    let current = queue.shift();
    if (current === destination) return true;

    for (let neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return false;
}

// console.log(hasPathDfsRecursion(pathGraph, "k", "l"));
// console.log(hasPathDfsRecursion(pathGraph, "o", "i"));
// console.log(hasPathDfsIterative(pathGraph, "i", "l"));
// console.log(hasPathBfs(pathGraph, "k", "l"));

// COUNTING COMPONENTS IN GRAPH ///////////////////
///////////////////////////////////////////////////
let componentsGraph = {
  A: ["B"],
  B: ["A", "C", "D"],
  C: ["B"],
  D: ["B"],
  E: ["F"],
  F: ["E"],
  G: ["H"],
  H: ["G", "I"],
  I: ["H"],
  J: [],
};

// counts the num of components, can use traverse or traverse2 helper function
function countingComponents(graph) {
  let visited = new Set();
  let count = 0;

  for (let node in graph) {
    if (traverse(graph, node, visited) === true) count++;
  }
  console.log(visited);
  return count;
}

function traverse(graph, node, visited) {
  if (visited.has(node)) return false;
  visited.add(node);

  for (let neighbor of graph[node]) {
    traverse(graph, String(neighbor), visited);
  }
  return true;
}

function traverse2(graph, node, visited) {
  if (visited.has(node)) return false;
  let stack = [node];

  while (stack.length > 0) {
    let current = stack.pop();

    visited.add(current);

    for (let neighbor of graph[current]) {
      if (!visited.has(String(neighbor))) stack.push(String(neighbor));
    }
  }
  return true;
}

// console.log(countingComponents(componentsGraph));

// LARGEST COMPONENT IN GRAPH /////////////////////
///////////////////////////////////////////////////
function findLargestComponent(graph) {
  let visited = new Set();
  let largest = 0;

  for (let node in graph) {
    let size = helperLargestComponent(graph, node, visited);

    if (size > largest) {
      largest = size;
    }
  }

  return largest;
}

function helperLargestComponent(graph, node, visited) {
  if (visited.has(node)) return 0;
  visited.add(node);

  let count = 1;
  for (let neighbor of graph[node]) {
    count += helperLargestComponent(graph, String(neighbor), visited);
  }

  return count;
}

// console.log(findLargestComponent(componentsGraph));

// SHORTEST PATH //////////////////////////////////
///////////////////////////////////////////////////
let edges2 = [
  ["w", "x"],
  ["x", "y"],
  ["z", "y"],
  ["z", "v"],
  ["w", "v"],
];

let shortestPathGraph = convertEdgesToGraph(edges2);

function shortestPath(graph, src, dst) {
  let visited = new Set([src]);
  let queue = [[src, 0]];

  while (queue.length > 0) {
    const [current, count] = queue.shift();
    if (current === dst) return count;

    for (let neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, count + 1]);
      }
    }
  }
  return undefined;
}

// console.log(shortestPath(shortestPathGraph, "w", "z"));

// NUMBER OF ISLANDS ////////////////////////////////////
/////////////////////////////////////////////////////////

let grid = [
  ["l", "l", "w", "l"],
  ["l", "l", "w", "l"],
  ["w", "w", "w", "l"],
  ["l", "w", "w", "l"],
  ["l", "w", "l", "l"],
];

function numberOfIslands(grid) {
  // count of islands
  let count = 0;
  // keep track of which coords have been seet
  let visited = new Set();

  // loop over each square in the grid
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (exploreIsland(grid, r, c, visited) === true) count++;
    }
  }
  return count;
}

function exploreIsland(grid, r, c, visited) {
  // check to see if the current square exists
  const rowExists = r >= 0 && r < grid.length;
  const colExists = c >= 0 && c < grid[0].length;

  // if not, false
  if (!rowExists || !colExists) return false;
  // if water, false
  if (grid[r][c] === "w") return false;

  // make a string for the visited set
  const position = r + "," + c;
  // if we've already been here, false
  if (visited.has(position)) return false;
  // if not, let's add it
  visited.add(position);

  // recursilvely call on all surrounding squares
  // once these have finished, we've explored a whoel island
  exploreIsland(grid, r - 1, c, visited);
  exploreIsland(grid, r + 1, c, visited);
  exploreIsland(grid, r, c - 1, visited);
  exploreIsland(grid, r, c + 1, visited);

  // end of an island
  return true;
}

// console.log(numberOfIslands(grid));

// SMALLEST ISLAND ////////////////////////////////////
/////////////////////////////////////////////////////////

function smallestIsland(grid) {
  let visited = new Set();
  let smallest = Infinity;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let size = findSize(grid, r, c, visited);
      if (size > 0 && size < smallest) smallest = size;
    }
  }
  return smallest;
}

function findSize(grid, r, c, visited) {
  const rowExists = r >= 0 && r < grid.length;
  const colExists = c >= 0 && c < grid[0].length;
  if (!rowExists || !colExists) return 0;

  if (grid[r][c] === "w") return 0;

  const position = r + "," + c;
  if (visited.has(position)) return 0;
  visited.add(position);

  let count = 1;
  count += exploreIsland(grid, r - 1, c, visited);
  count += exploreIsland(grid, r + 1, c, visited);
  count += exploreIsland(grid, r, c - 1, visited);
  count += exploreIsland(grid, r, c + 1, visited);

  return count;
}

// console.log(smallestIsland(grid));

// clone graph

class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

let node4 = new Node(4);
let node3 = new Node(3);
let node2 = new Node(2);
let node1 = new Node(1, [node2, node4]);

node2.neighbors = [node1, node3];
node3.neighbors = [node2, node4];
node4.neighbors = [node1, node3];

let node6 = new Node(6);
let node5 = new Node(5, [node6]);
node6.neighbors = [node5];

// utility function to check if clone is the same
function explore(node, visited = new Set()) {
  if (!node || visited.has(node)) return;

  console.log(node.val, node.neighbors);
  visited.add(node);

  for (let neighbor of node.neighbors) {
    explore(neighbor, visited);
  }
}

// old version with problems
function cloneGraph(node, visited = new Set()) {
  if (!node || visited.has(node)) return;
  visited.set(node);

  // console.log(node.val);
  let newNode = new Node(node.val);

  for (let neighbor of node.neighbors) {
    newNode.neighbors.push(cloneGraph(neighbor, visited));
  }

  return newNode;
}

// 1<>2<>3<>4
// ^---------

function cloneGraph2(node, visited = new Map()) {
  // if no node, return
  if (!node) return;
  // if we've seen this node, return before cloning
  // return the clone to add to neighbors arr
  if (visited.has(node)) return visited.get(node);

  // if we make it this far, it's a new node. Clone it
  let newNode = new Node(node.val);
  // add it's key and newNode to the visited map
  visited.set(node, newNode);

  // look through neighbors
  for (let neighbor of node.neighbors) {
    // for each neighbor, call the function again
    newNode.neighbors.push(cloneGraph2(neighbor, visited));
  }

  return newNode;
}

// let cloned = cloneGraph2(node1);
// explore(cloned);

// cycle detector. returns true if cycle, false if no cycle
// 1<>2
// ^--

// this is retarded why doesn't this work!!!!!!!!!
// function cycleDetector(node, visited = new Set()) {
//   // look at current node
//   // if we've seen it, there's a cycle
//   if (visited.has(node)) {
//     return true;
//   } else {
//     // if not, it's new
//     // --add the new node to visited
//     visited.add(node);
//     console.log(node);
//   }
//   // repeat on neighbors
//   for (let neighbor of node.neighbors) {
//     cycleDetector(neighbor, visited);
//   }

function cycleDetector(node) {
  let stack = [node];
  let visited = new Set();

  while (stack.length > 0) {
    let current = stack.pop();
    if (visited.has(current)) return true;
    visited.add(current);

    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
  return false;
}

// console.log(cycleDetector(node1));
// console.log(cycleDetector(node5));

// chatGPT says that a cycle in an undirected graph means 1 > 2 > 3 > 1 in a 1<>2<>3<>1 graph, not 1<>2 repeatedly. Did not know that...it also spoiled the real solution when explaining this.

function cycleDetector2(node, visited = new Set(), prev = null) {
  if (visited.has(node)) return true;
  visited.add(node);

  for (let neighbor of node.neighbors) {
    if (neighbor !== prev) {
      // putting this inside an if statement with return true I didn't know to do
      if (cycleDetector2(neighbor, visited, node)) return true;
    }
  }
  return false;
}

// console.log(cycleDetector2(node1));
// console.log(cycleDetector2(node5));
