import { familyTreeRightSide } from "../utils.js";

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
// 1.
