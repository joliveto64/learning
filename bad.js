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

function shortestPathBfs(node, target) {
  let path = [];
  let visited = new Set();
  let queue = [node];

  while (queue.length > 0) {
    let current = queue.shift();

    path.push(current.val);
    visited.add(current);
    console.log(current.val, target.val);

    if (current === target) {
      return path;
    }

    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return undefined;
}

function colorsRecursive(node, visited = new Map(), color = "red") {
  if (!node) return;

  visited.set(node, color);
  console.log(node.val, color);

  for (let neighbor of node.neighbors) {
    if (visited.get(neighbor) === color) return false;

    if (!visited.has(neighbor)) {
      if (color === "red") {
        return colorsRecursive(neighbor, visited, "blue");
      } else {
        return colorsRecursive(neighbor, visited, "red");
      }
    }
  }
  return true;
}
