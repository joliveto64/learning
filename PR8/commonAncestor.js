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

function youngestAncestor(node1, node2) {
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

    nodesSeen.set(node1);
    nodesSeen.set(node2);
    // -----if no, look to each parent
    if (node1.parent) node1 = node1.parent;
    if (node2.parent) node2 = node2.parent;
  }
}

//        5
//      /  \
//     3    7
//    /\    /\
//   2  4  6  8
//  /          \
// 1            9

console.log(youngestAncestor(familyTree.node1, familyTree.node4));
