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

node2.neighbors.push(node1, node3);
node3.neighbors.push(node2, node4);
node4.neighbors.push(node1, node3);
node4.neighbors.push(node1, node3);

// 1 <> 2 <> 3 <> 4 <> 1

// TRAVERSALS
function exploreDfs(node, visited = new Set()) {
  if (!node || visited.has(node)) return;

  console.log(node.val);
  visited.add(node);

  for (let neighbor of node.neighbors) {
    exploreDfs(neighbor, visited);
  }
}

function exploreBfs(node) {
  let queue = [node];
  let visited = new Set([node]);

  while (queue.length > 0) {
    let current = queue.shift();
    console.log(current.val);

    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// CLONE GRAPH
function cloneRecursion(oldNode, visited = new Map()) {
  if (!oldNode) return;

  if (visited.has(oldNode)) return visited.get(oldNode);

  let newNode = new Node(oldNode.val);
  visited.set(oldNode, newNode);

  for (let oldNeighbor of oldNode.neighbors) {
    newNode.neighbors.push(cloneRecursion(oldNeighbor, visited));
  }

  return newNode;
}

// 1 > 2 > 3 > 4...1
function cloneIterative(node) {
  let newNode = new Node(node.val);
  let stack = [node];

  let visited = new Map();
  visited.set(node, newNode);

  while (stack.length > 0) {
    let current = stack.pop();

    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        let newNeighbor = new Node(neighbor.val);

        stack.push(neighbor);
        visited.set(neighbor, newNeighbor);
      }
      visited.get(current).neighbors.push(visited.get(neighbor));
    }
  }
  return newNode;
}

// exploreDfs(node1);
// exploreBfs(node1);

// console.log("/////");
// let clonedGraphRec = cloneRecursion(node1);
// exploreDfs(clonedGraphRec);

// console.log("/////");
// let clonedGraphIterative = cloneIterative(node1);
// exploreDfs(clonedGraphIterative);

// CYCLE DETECTOR
function cycleDetectRecursion(node, visited = new Set(), prev = null) {
  if (!node) return false;
  // look at first node
  // --if visited && !prev node, cycle
  if (visited.has(node) && node !== prev) {
    return true;
  }
  visited.add(node);

  for (let neighbor of node.neighbors) {
    if (neighbor !== prev) {
      // hard to understand why I need to say if (recursive call) return true, but I think I get it
      if (cycleDetectRecursion(neighbor, visited, node)) return true;
    }
  }
}

function cycleDetectIterative(node) {
  let visited = new Set();
  let stack = [[node, null]];

  while (stack.length > 0) {
    const [current, prev] = stack.pop();
    console.log(current, prev);

    if (visited.has(current)) return true;
    visited.add(current);

    for (let neighbor of current.neighbors) {
      if (neighbor !== prev) {
        stack.push([neighbor, current]);
      }
    }
  }

  return false;
}
// console.log(cycleDetectRecursion(node1));
// console.log(cycleDetectIterative(node1));

// not the shortest path because it's dfs, but still wanted to try to return the actual path recursively
function findPathRecursion(node, target, visited = new Set(), path = []) {
  if (!node) return;

  path.push(node.val);
  visited.add(node);
  console.log(node.val, target.val);

  if (node === target) {
    return path;
  }

  for (let neighbor of node.neighbors) {
    if (!visited.has(neighbor)) {
      return findPathRecursion(neighbor, target, visited, path);
    }
  }
}

// console.log(findPathRecursion(node1, node4));

function shortestPathBfs(node, target) {
  let queue = [[node]];
  let visited = new Set([node]);

  while (queue.length > 0) {
    let currentPath = queue.shift();
    let currentNode = currentPath[currentPath.length - 1];

    if (currentNode === target) {
      return currentPath;
    }

    for (let neighbor of currentNode.neighbors) {
      if (!visited.has(neighbor)) {
        let newPath = currentPath.concat([neighbor]);
        visited.add(neighbor);
        queue.push(newPath);
      }
    }
  }

  return null;
}

console.log(shortestPathBfs(node1, node4));

let node12 = new Node(12);
let node11 = new Node(11);
let node10 = new Node(10, [node11, node12]);

node11.neighbors = [node10, node12];
node12.neighbors = [node11, node10];
// 1 <> 2 <> 3 ... 1
function colorsRecursive(node, visited = new Map(), color = "red") {
  if (!node) return;

  visited.set(node, color);
  console.log(node.val, color);

  for (let neighbor of node.neighbors) {
    if (visited.get(neighbor) === color) return false;

    if (!visited.has(neighbor)) {
      if (color === "red") {
        colorsRecursive(neighbor, visited, "blue");
      } else {
        colorsRecursive(neighbor, visited, "red");
      }
    }
  }
  return true;
}

console.log(colorsRecursive(node10));
