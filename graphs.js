import { rightViewNode5 } from "./utils.js";
// depth first for graphs is a stack order for traversal
// breadth first is a queue

const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

// DEPTH FIRST TRAVERSALS

function depthFirstGraph(graph, source) {
  let stack = [source];

  while (stack.length > 0) {
    let current = stack.pop();
    console.log(current);

    for (let neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }
}

function depthFirstGraphRecursion(graph, source) {
  console.log(source);

  for (let neighbor of graph[source]) {
    depthFirstGraphRecursion(graph, neighbor);
  }
}

// depthFirstGraph(graph, "a");
// console.log("*****");
// depthFirstGraphRecursion(graph, "a");

// BREADTH FIRST TRAVERSALS

function breadthFirstPrint(graph, source) {
  let queue = [source];

  while (queue.length > 0) {
    let current = queue.shift();
    console.log(current);

    for (let neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }
}

// console.log("*****");
// breadthFirstPrint(graph, "a");

const graph2 = {
  f: ["g", "i"],
  g: ["h"],
  h: [],
  i: ["g", "k"],
  j: ["i"],
  k: [],
};

// HAS PATH
// path finder with recursion, depth first
function hasPath(graph, source, destination) {
  if (source === destination) return true;

  for (let neighbor of graph[source]) {
    if (hasPath(graph, neighbor, destination) === true) {
      return true;
    }
  }
  return false;
}

// console.log(hasPath(graph2, "f", "k"));

// path finder without recursion, breadth first
function hasPath2(graph, source, destination) {
  let queue = [source];

  while (queue.length > 0) {
    let current = queue.shift();
    if (current === destination) return true;

    for (let neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }
  return false;
}

// console.log(hasPath2(graph2, "f", "k"));

// undirected hasPath problem

let edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"],
];

function convertToGraph(edges) {
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

function hasPath3(graph, src, dst, visited = new Set()) {
  if (src === dst) return true;
  visited.add(src);

  for (let neighbor of graph[src]) {
    if (hasPath3(graph, neighbor, dst, visited)) return true;
  }

  return false;
}

// console.log(hasPath3(convertToGraph(edges), "j", "o"));

// BONUS: wanted to implement a binary tree BFS to see if this is making sense
function breadthFirstBst(root) {
  if (!root) return;

  let queue = [root];
  while (queue.length > 0) {
    let current = queue.shift();
    console.log(current.val);

    if (current.left) {
      queue.push(current.left);
    }

    if (current.right) {
      queue.push(current.right);
    }
  }
}

// breadthFirstBst(rightViewNode5);

// COUNTING COMPONENTS IN GRAPH
let graph3 = {
  1: [2],
  2: [1],
  3: [],
  4: [6],
  5: [6],
  6: [4, 5, 7, 8],
  7: [6],
  8: [6],
};

function howManyComponents(graph) {
  let visited = new Set();
  let count = 0;

  for (let node in graph) {
    if (explore(graph, node, visited) === true) {
      count += 1;
    }
  }

  return count;
}

function explore(graph, current, visited) {
  if (visited.has(current)) return false;
  visited.add(current);

  for (let neighbor of graph[current]) {
    explore(graph, String(neighbor), visited);
  }

  return true;
}

// console.log(howManyComponents(graph3));

// FINDING SIZE OF LARGEST COMPONENT
// graph has 2 components, length 3 and 4
let sizeGraph = {
  0: ["8", "1", "5"],
  1: ["0"],
  5: ["0", "8"],
  8: ["0", "5"],
  2: ["3", "4"],
  3: ["2", "4"],
  4: ["3", "2"],
};

function largestComponent(graph) {
  let longest = 0;
  let visited = new Set();

  for (let node in graph) {
    let size = exploreSize(graph, node, visited);

    if (size > longest) longest = size;
  }

  return longest;
}

function exploreSize(graph, current, visited) {
  if (visited.has(current)) return 0;
  visited.add(current);

  let size = 1;
  for (let neighbor of graph[current]) {
    size += exploreSize(graph, neighbor, visited);
  }

  return size;
}

// console.log(largestComponent(sizeGraph));
