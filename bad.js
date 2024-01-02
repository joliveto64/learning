function cloneIterative(node) {
  let queue = [node];
  let visited = new Map();

  while (queue.length > 0) {
    let current = queue.shift();

    let newNode = new Node(current.val);
    visited.set(current, newNode);
    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        newNode.neighbors.push(neighbor);
        queue.push(neighbor);
      }
    }
    return newNode;
  }
}
