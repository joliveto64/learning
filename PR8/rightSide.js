import { rightViewNode5 } from "../utils.js";

// 1. listen
// 2. clarify. This one seems conceptually very simple. Looking at a binary tree from the right side, starting at the top, make a list of the nodes you can see, assuming that the right-most nodes obscure the nodes behind them. Essentially, what is the right-most node at each level?

// example:
//        5
//      /  \
//     3    7
//    /\    /
//   2  4  6
//  /
// 1
// answer = [5,7,6,1]

// non-code steps
// 1. look at the highest level of the tree
// 2. write down the number furthest to the right
// 3. move down one level
// 4. repeat steps 2-3 until you've written the number at the bottom of the tree

// 3. function signature
// function rightSide(node){
// operations
// return array of node values
// }

// 4. brute force.
function rightSide(node, map, array, count = 1) {
  if (!node) return undefined;

  count++;
  array.push(node.val);
  map.set(count, true);

  if (!node.right && node.left) {
    return rightSide(node.left, map, array, count);
  } else {
    return rightSide(node.right, map, array, count);
  }
}

function leftSide(node, map, array, count = 1) {
  if (!node) return undefined;

  count++;
  if (!map.has(count)) {
    array.push(node.val);
  }

  if (!map.has(count + 1) && node.right) {
    array.push(node.right.val);
    map.set(count + 1);
  }

  if (!node.left && node.right) {
    return leftSide(node.right, map, array, count);
  } else {
    return leftSide(node.left, map, array, count);
  }
}

function rightSideView(node) {
  if (!node) return undefined;
  let levelMap = new Map();
  levelMap.set(1, true);
  // print root val
  let valuesToReturn = [node.val];
  // print all right values, but left if the last is left
  rightSide(node.right, levelMap, valuesToReturn);
  // print all left values, but right is the lasft is right
  // skip values for levels already done
  leftSide(node.left, levelMap, valuesToReturn);

  return valuesToReturn;
}

// test tree:
//           5
//         /  \
//        3    7
//       /\    /
//      2  4  6
//     /
//    1
//   /\
// .5  1.5

console.log(rightSideView(rightViewNode5));
// prints [5, 7, 6, 1, 1.5]
