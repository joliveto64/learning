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

// depthFirstGraph(graph, "a");

function depthFirstGraphRecursion(graph, source) {
  console.log(source);

  for (let neighbor of graph[source]) {
    depthFirstGraphRecursion(graph, neighbor);
  }
}

// depthFirstGraphRecursion(graph, "a");

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

// breadthFirstPrint(graph, "a");

const graph2 = {
  f: ["g", "i"],
  g: ["h"],
  h: [],
  i: ["g", "k"],
  j: ["i"],
  k: [],
};

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

console.log(hasPath(graph2, "f", "k"));

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

console.log(hasPath2(graph2, "f", "k"));
