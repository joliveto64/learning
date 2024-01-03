import { familyTree } from "../utils.js";
// 1. listen
// 2. clarify. I am given two people in a tree, so I am taking that to mean I am given two nodes of a tree. Then I am to determine the total wealth (node.value) of each of the given nodes as well as all of the nodes which directly link them.

// example: y
//         /\
//        x  x   < include this one in total
//       /\  /\
//      x x y  x   < not this one
// totaling this example I would total the value of y and the top, the next right node, then the last y together (3 nodes total)

// 3. function signature
// function familyTrees(node1, node2){
// operations
// return number (total)
// }

// non-coding steps:
// 1. start at lowest target node in tree
// 2. the net-worth of that node is the total
// 3. move up 1 node
// 4. is this the other target node?
// -----if yes, add net worth to total and this is your answer
// -----if no, add net worth and go to step 3.

// 4. brute force
function familyTrees(ancestor, descendant, total = 0) {
  if (!descendant) return undefined;
  // 1. start at descendant node in tree
  // 2. add net worth to total
  if (descendant) total += descendant.val;
  // 4. is this also the ancestor node?
  // -----if yes, add net worth to total and this is your answer
  if (descendant === ancestor) {
    return total;
    // -----if no, add net worth and go to step 3.  total += descendant.val
  }
  // 3. move up 1 node and repeat from step 2
  return familyTrees(ancestor, descendant.parent, total);
}
// alright this was way easier this way and the steps in my head also made sense in code. going bottom to top was 👌👌👌
// here is the tree that's imported for testing. each node is named for its value (2,3,4,5,6,7,8)

// 5. improve solution. this moves in a line, 1 at a time from descendant to ancestor while adding up the $$$ as I go. I have to visit each node to get the value, and I'm not looking at any extra nodes. The space also is good because it only stores the total. I think it's good as it is

// 7. test!

//        5
//      /  \
//     3    7
//    /\    /\
//   2  4  6  8
//  /          \
// 1            9

// console.log(familyTrees(familyTree.node5, familyTree.node5));
// console.log(familyTrees(familyTree.node3, familyTree.node4));
// console.log(familyTrees(familyTree.node7, familyTree.node9));
// console.log(familyTrees(familyTree.node5, familyTree.node1));
