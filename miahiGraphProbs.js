// node class to use with problems
class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

// function to traverse nodes so I can check answers
function explore(node, visited = new Set()) {
  if (!node || visited.has(node)) return;

  console.log(node.val);
  visited.add(node);

  for (let neighbor of node.neighbors) {
    explore(neighbor, visited);
  }
}

// CLONE GRAPH
// graph to use in problem
let node4 = new Node(4);
let node3 = new Node(3);
let node2 = new Node(2);
let node1 = new Node(1, [node2, node4]);

node2.neighbors.push(node1, node3);
node3.neighbors.push(node2, node4);
node4.neighbors.push(node1, node3);
// explore(node1);

// my attempt that didn't work
function cloneGraph1(node, visited = new Set()) {
  if (!node || visited.has(node)) return;
  visited.set(node);

  // console.log(node.val);
  let newNode = new Node(node.val);

  for (let neighbor of node.neighbors) {
    newNode.neighbors.push(cloneGraph(neighbor, visited));
  }

  return newNode;
}

// after consulting the AI overlord, detroyer of careers
function cloneGraph2(node, visited = new Map()) {
  if (!node) return;
  // look at first node
  // if it is visited, just return the node without making a new one
  if (visited.has(node)) return visited.get(node);
  // if node is not visited, make new node and add to visited
  let newNode = new Node(node.val);
  visited.set(node, newNode);
  // --loop over neighbors to push into new neighbors and repeat function
  for (let neighbor of node.neighbors) {
    newNode.neighbors.push(cloneGraph2(neighbor, visited));
  }
  return newNode;
}
let cloned = cloneGraph2(node1);
// explore(cloned);

// CYCLE DETECTOR
// first attempt that doesn't work
function cycleDetector1(node, visited = new Set()) {
  // look at current node
  // if we've seen it, there's a cycle
  if (visited.has(node)) {
    return true;
  } else {
    // if not, it's new
    // --add the new node to visited
    visited.add(node);
    console.log(node);
  }
  // repeat on neighbors
  for (let neighbor of node.neighbors) {
    cycleDetector(neighbor, visited);
  }
}

// chatGPT explained that going between two nodes dousn't count as a cycle. Who knew! So,
// nodeA <> nodeB <> nodeA... (doesn not count)
// nodeA <> nodeB <> nodeC <> nodeA... (does count)

// still doesn't work
function cycleDetector2(node, visited = new Set(), prev = null) {
  if (!node) return;

  // if visited, but also not the previous node, BUSTED
  if (visited.has(node) && prev !== node) {
    // --return true
    return true;
  }

  // look at first node
  // if not in visited, add to visited list
  visited.add(node);

  // look at next node
  for (let neighbor of node.neighbors) {
    cycleDetector2(neighbor, visited, node);
  }
  // if traversal completes
  // --return false
  return false;
}

// with chatGPT help
function cycleDetector3(node, visited = new Set(), prev = null) {
  // can't be a cycle if the chain ends
  if (!node) return false;

  // if we've seen it, it's a cycle
  if (visited.has(node)) return true;
  visited.add(node);

  // look through the neighbors
  for (let neighbor of node.neighbors) {
    // this is the part I couldn't figure out (lines 124 - 125)
    if (neighbor !== prev) {
      if (cycleDetector3(neighbor, visited, node)) return true;
    }
  }

  return false;
}
// console.log(cycleDetector3(node1));

// BREADTH FIRST PRINT OF ALL ELEMENTS
function bfsPrint(node) {
  // initialize queue and visited set
  let queue = [node];
  let visited = new Set();
  // while queue is not empty
  while (queue.length > 0) {
    let current = queue.shift();

    console.log(current.val);
    visited.add(current);
    // --push neighbors to queue
    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) queue.push(neighbor);
    }
  }
}
// had some prior training, but got it mostly first try. I accidentally typed node instead of current 🤷
// bfsPrint(node1);

// SHORTEST PATH
// init minCount to Infinity
// do bfs, incrementing new count on each iteration by 1
// at the end of bfs, if counter < minCount, replace it
// repeat
// doesn't work
function findShortestPath(node, target) {
  let queue = [node];
  let visited = new Set();
  let minCount = Infinity;

  while (queue.length > 0) {
    let count = 0;
    let current = queue.shift();

    if (current !== target) visited.add(current);

    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        count++;
        console.log(neighbor.val, count);
        if (count < minCount && neighbor === target) minCount = count;
      }
    }
  }

  return minCount;
}

let nodeA = new Node("A");
let nodeB = new Node("B");
let nodeC = new Node("C");
let nodeD = new Node("D");
let nodeE = new Node("E");

nodeA.neighbors.push(nodeB, nodeE);
nodeB.neighbors.push(nodeA, nodeC);
nodeC.neighbors.push(nodeB, nodeD);
nodeD.neighbors.push(nodeC, nodeE);
nodeE.neighbors.push(nodeA, nodeD);

// current thought: in bfs, if the first time the target is encountered should always be the shortes path

function findShortestPath2(node, target) {
  let queue = [node];
  let visited = new Set();
  let count = 0;

  while (queue.length > 0) {
    let current = queue.shift();
    visited.add(current);

    for (let neighbor of current.neighbors) {
      if (neighbor === target) return count;

      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        count++;
      }
    }
  }
}

// had to go back and reference the work I did from the video
function findShortestPath3(node, target) {
  let queue = [[node, 0]];
  let visited = new Set([node]);

  while (queue.length > 0) {
    let [current, count] = queue.shift();
    if (current === target) return count;

    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, count + 1]);
      }
    }
  }
}

// answer should be 1
// console.log(findShortestPath3(node1, node4));
// answer should be
// console.log(findShortestPath3(nodeA, nodeD));

function twoColors(node) {
  let queue = [[node, "red"]];
  let visited = new Map([[node, "red"]]);

  while (queue.length > 0) {
    const [current, color] = queue.shift();

    for (let neighbor of current.neighbors) {
      if (visited.has(neighbor)) {
        if (visited.get(neighbor) === color) return false;
      } else if (!visited.has(neighbor)) {
        let neighborColor = color === "red" ? "blue" : "red";
        queue.push([neighbor, neighborColor]);
        visited.set(neighbor, neighborColor);
      }
    }
  }
  return true;
}

let nodeX = new Node("X");
let nodeY = new Node("Y");
let nodeZ = new Node("Z");

nodeX.neighbors.push(nodeY, nodeZ);
nodeY.neighbors.push(nodeX, nodeZ);
nodeZ.neighbors.push(nodeX, nodeY);

// node1 ----- node2
//  |            |
// node3 ----- node4
// should be true/possible
// console.log(twoColors(node1));

// nodeX ---- nodeY
//    \       /
//      nodeZ
// should be false/impossible
// console.log(twoColors(nodeX));
