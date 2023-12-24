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

// 1 <> 2 <> 3 <> 4 <> 1

// TRAVERSALS
function explore(node, visited = new Set()) {
  if (!node || visited.has(node)) return;

  console.log(node.val);
  visited.add(node);

  for (let neighbor of node.neighbors) {
    explore(neighbor, visited);
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

// CLONE GRAPH RECURSION
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

// exploreBfs(node1);
// let clonedGraph = cloneRecursion(node1);
// exploreBfs(clonedGraph);

function cloneGraphBfs(node) {
  let queue = [node];
  let visited = new Map();

  while (queue.length > 0) {
    let current = queue.shift();

    let newNode = new Node(current.val);
    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        newNode.neighbors.push(neighbor);
      }
    }
    return newNode;
  }
}

// explore(node1);
let cloned = cloneGraphBfs(node1);
explore(cloned);
