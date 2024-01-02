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

exploreDfs(node1);
// exploreBfs(node1);

// console.log("/////");
// let clonedGraphRec = cloneRecursion(node1);
// exploreDfs(clonedGraphRec);

console.log("/////");
let clonedGraphIterative = cloneIterative(node1);
exploreDfs(clonedGraphIterative);
