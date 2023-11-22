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
// EXPLANATION: main function and two helper functions. I'm traversing the right side, then the left side and pushing right-most values into an array. I keep track of which levels of the tree I pushed values from already while traversing the right (with a map and counter), then when I do the left I only push a value if that level is not present in the map.

let valuesMap = new Map();
function rightSideView(node, map, count = 0) {
  if (!node) return;

  count++;
  if (!map.has(count)) {
    map.set(count, node.val);
  }

  rightSideView(node.right, map, count);
  rightSideView(node.left, map, count);

  return valuesMap.values();
}

// 5. improve solution. I had a couple previous versions that didn't work. This function was already mush worse, but I realized some things that were stupid before I finished it...so it's slightly refined already. Anyway, using the map and incrementing the counter are both O(n). Traversing all nodes is O(n). So, this function is O(n) plus map.values() is O(k) where k is the length of the map. The length of the map is the number of right-most values, so the height of the tree which varies depending on the type of tree. So overall the time complexity should be O(n + k), or O(n). Space is length of the map plus the input size. I don't think this can be done without seeing every node, but I'm not 100% sure of that. I can push items to an array and return the array to prevent the O(n) operation of map.values() which would slighly speed it up at the cost of some additional space.

// 6. implement improvement
let levelMap2 = new Map();
let rightValuesArray = [];
function rightSideView2(node, map, count = 0) {
  if (!node) return;

  count++;
  if (!map.has(count)) {
    map.set(count, node.val);
    rightValuesArray.push(node.val);
  }

  rightSideView(node.right, map, count);
  rightSideView(node.left, map, count);

  return rightValuesArray;
}
// this only returns the first value, not sure why yet

// 7. test!

// test tree:
//           5
//         /  \
//        3    7
//       /\    /
//     2  4   6
//    /    \
//   1    4.5
//  /\
//.5  1.5

console.log(rightSideView(rightViewNode5, valuesMap));
console.log(rightSideView2(rightViewNode5, levelMap2));
