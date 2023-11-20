import { familyTree } from "../utils.js";

// 1. listen
// 2. clarify. given a family tree, I need to find the youngest common ancestor for two given aliens. so, alien + dad would be dad, alien + cousin would be grandparent, etc.

// example:
//        5
//      /  \
//     3    7
//    /\    /\
//   2  4  6  8
//  /          \
// 1            9

// [2,8] = 5
// [2,4] = 3
// [9,6] = 7

// 3. function signature
// function youngestAncestor(node1, node2){
// operations
// return youngest common ancester node
// }

// non-code steps:
// 1. start by looking at each given node
// 2. remember nodes you've seen as you go along
// 3. are the 2 nodes the same or a node you've seen before?
// -----if yes, that's the answer you're done
// -----if no, look to each parent
// 4. repeat step 3

// 4. brute force?
function youngestAncestor(node1, node2) {
  if (!node1 || !node2) return undefined;
  // remember nodes you've seen as you go along
  let nodesSeen = new Map();
  // start by looking at each given node
  while (node1 || node2) {
    // are the 2 nodes the same or a node you've seen before?
    if (node1 === node2) {
      // -----if yes, that's the answer you're done
      return node1.val;
    } else if (nodesSeen.has(node1)) {
      return node1.val;
    } else if (nodesSeen.has(node2)) {
      return node2.val;
    }

    nodesSeen.set(node1, node1.val);
    nodesSeen.set(node2, node2.val);
    // -----if no, look to each parent
    if (node1.parent) node1 = node1.parent;
    if (node2.parent) node2 = node2.parent;
  }
}

// 5. improve solution. current solution is O(1) to store/access from the map, in the while loop it looks up each node 1 parent at a time. best case scenario is the nodes are the same it's O(1). worst case in the example would be 1 and 9, so if both nodes have to traverse the entire tree. However, they don't visit all the nodes, only one of each children, so it's like the number of levels / 2? idk how to say that in big O terms, so it's like 2 * 1/2 levels. so that's 2 * 4 levels / 2 operations. As far as improvements go, if they're the same that can't be improved it's constant. without knowing where each node is to start I have to go up 1 at a time until they either collide or 1 runs into a node the other has already traversed...I see no way to do it faster because you must look at each node. It is possible in my solution that 1 node has already crossed the common ancestor and keeps going unnecessarily, but you can't know that until the other one hits the ancester too. I don't think the solution is great in space as it needs to store a lot of nodes potentially in the map if the tree is large which could be a problem. The only thing I can think of is if I knew which "level" each node was on, because if I could get them on the same level then I could just compare them to eachother until they're the same which eliminates the issue earlier of remembering the higher nodes "trail". This would make it slower though because I'd have to traverse up from each node first to the top to see how lany levels down I am on each, then if they're different traverse one up until they're the same then just keep going up and comparing until they equal one another, but this would be quite a bit slower

// non-code steps
// 1. if nodes are the same your answer is the node
// 2. look at the first node and starting from 1, count up one level at a time until you reach the top and rememeber that number
// 3. do the same for the second node
// 4. are both counts the same?
// 5. if yes, move both up one node at a time until the paths intersect, this is the answer
// 6. if no, find the deeper node
// 7. starting with the count of this node, go up 1 at a time while counting down 1 at a time until the count matches the other node
// 8. go to step 4

function youngestAncestor2(node1, node2) {
  if (!node1 || !node2) return undefined;
  // 1. if nodes are the same your answer is the node
  if (node1 === node2) return node1.val;

  // 2. look at the first node and starting from 1, count up one level at a time until you reach the top and rememeber that number
  let node1Depth = calcNodeDepth(node1);
  // 3. do the same for the second node
  let node2Depth = calcNodeDepth(node2);

  // 6. if no, find the deeper node
  let deeperNode = node1Depth > node2Depth ? node1 : node2;

  // 7. starting with the count of this node, go up 1 at a time while counting down 1 at a time until the count matches the other node
  if (deeperNode === node1) {
    while (node1Depth > node2Depth) {
      node1 = node1.parent;
      node1Depth--;
    }
  } else {
    while (node2Depth > node1Depth) {
      node2 = node2.parent;
      node1Depth--;
    }
  }

  // 4. are both counts the same?
  // if (node1Depth === node2Depth) {
  // 5. if yes, move both up one node at a time until the paths intersect, this is the answer
  while (node1 !== node2) {
    node1 = node1.parent;
    node2 = node2.parent;
  }
  return node1.val;
}

// calulate the depth of each
function calcNodeDepth(node) {
  let count = 1;
  while (node.parent) {
    count++;
    node = node.parent;
  }
  return count;
}

// 7. test!

//        5
//      /  \
//     3    7
//    /\    /\
//   2  4  6  8
//  /          \
// 1            9

console.log(youngestAncestor(familyTree.node1, familyTree.node4));
console.log(youngestAncestor(familyTree.node1, familyTree.node9));
console.log(youngestAncestor(familyTree.node1, familyTree.node2));
console.log(youngestAncestor(familyTree.node7, familyTree.node7));
console.log(youngestAncestor(familyTree.node5, familyTree.node5));
console.log("~~~~~~~~");
console.log(youngestAncestor2(familyTree.node1, familyTree.node4));
console.log(youngestAncestor2(familyTree.node1, familyTree.node9));
console.log(youngestAncestor2(familyTree.node1, familyTree.node2));
console.log(youngestAncestor2(familyTree.node7, familyTree.node7));
console.log(youngestAncestor(familyTree.node5, familyTree.node5));
