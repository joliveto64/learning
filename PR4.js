// leetcode merge two sorted lists (#21) you already seen this, here for reference

// function mergeTwoLists(list1, list2) {
//   let head = new ListNode();
//   let current = head;

//   while (list1 && list2) {
//     if (list1.val <= list2.val) {
//       current.next = list1;
//       list1 = list1.next;
//     } else {
//       current.next = list2;
//       list2 = list2.next;
//     }
//     current = current.next;
//   }

//   current.next = list1 ? list1 : list2;

//   return head.next;
// }

// // leetcode #2 add two numbers: You didn't assign this one, I already started it so I wanted to finish.

// // You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// // note: this solution worked for 1565 / 1568 test cases. The solution breaks down according to chatGPT with very large numbers (javascript thing). It said the only work around was a completely different solution which was mathy and I didn't bother.

// class singlyLinkedNode {
//   constructor(val = null, next = null) {
//     this.val = val;
//     this.next = next;
//   }
// }

// node3 = new singlyLinkedNode(3);
// node2 = new singlyLinkedNode(2, node3);
// node1 = new singlyLinkedNode(1, node2);

// node6 = new singlyLinkedNode(6);
// node5 = new singlyLinkedNode(5, node6);
// node4 = new singlyLinkedNode(4, node5);

// function addTwoNumbers(list1, list2) {
//   let arr1 = [];
//   let arr2 = [];
//   // traverse both lists to get numbers
//   while (list1 || list2) {
//     if (list1) {
//       arr1.unshift(list1.val);
//       list1 = list1.next;
//     }

//     if (list2) {
//       arr2.unshift(list2.val);
//       list2 = list2.next;
//     }
//   }
//   // create helper function to add numbers/return final number
//   let reversedSumArray = addAndReverseNumbers(arr1, arr2);

//   // create a new list by looping over number/creating nodes
//   let head = new singlyLinkedNode(reversedSumArray[0]);
//   let dummy = head;

//   for (let i = 1; i < reversedSumArray.length; i++) {
//     dummy.next = new singlyLinkedNode(reversedSumArray[i]);
//     dummy = head.next;
//   }

//   //   return head of new list
//   //      .log(head, head.next, head.next.next);
//   return head;
// }

// // helper function
// function addAndReverseNumbers(arr1, arr2) {
//   let num1 = arr1.join("");
//   let num2 = arr2.join("");

//   let sum = parseInt(num1) + parseInt(num2);

//   return sum.toString().split("").reverse().map(Number);
// }

// addTwoNumbers(node1, node4);

// // leetcode 83. remove duplicates from sorted list

// node10 = new singlyLinkedNode(3);
// node11 = new singlyLinkedNode(2, node10);
// node12 = new singlyLinkedNode(1, node11);
// node13 = new singlyLinkedNode(1, node12);

// function removeDuplicates(root) {
//   let head = root;
//   let current = head;
//   //   keep track of current node as reference
//   let trackedNode = head;
//   // while loop to traverse list
//   while (current) {
//     // if previous current === current, continue
//     // once previous current !== current, adjust pointer
//     if (trackedNode.val !== current.val) {
//       trackedNode.next = current;
//       trackedNode = current;
//     }

//     if (current === null) {
//       trackedNode.next = null;
//     }
//     current = current.next;
//   }
//   // return head of linked list
//   //   console.log(head, head.next, head.next.next);
//   return head;
// }

// // notes for above problem. Too many issues with GPT responses to be fully practical. Worked well for clarifying, example and function signature, hit or miss after that. Solved this problem in 40min with a little trial and error in leet for corner cases which resulted in my adding lines 109-111

// // console.log(removeDuplicates(node13));

// // reverse linked list

// //I had the general idea but I couldn't organize the code properly. Worked about 1:15 before I asked for the answer, kept getting infinite loops. I kept using an if block inside of the while loop which was unecessary, no good reason for it just was a common theme I think from working on this stuff. Couldn't figure out if I needed to track 3 nodes at once or could do it with just 2

// function reverseList(head) {
//   let prev = null;
//   let current = head;
//   // traverse list and adjust pointers at each iteration
//   while (current) {
//     let nextTemp = current.next;
//     current.next = prev;
//     prev = current;
//     current = nextTemp;
//   }

//   // return head of reversed list
//   return prev;
// }

// reverseList(node13);

// //are the trees the same problem. this is my solution which chatGPT suggested I add the strigify because I didn't know the equality operator was by reference to object not by directly comparing the values. The rest should look familiar. This passes most but not all tests (having a null node one one tree but not the other failed it)

// var isSameTree = function (p, q) {
//   return JSON.stringify(flatten(p)) == JSON.stringify(flatten(q));
// };

// function flatten(root) {
//   if (root === null) return [];

//   return [...flatten(root.left), root.val, ...flatten(root.right)];
// }

// // this is chatGPT solution that passes all tests

// var isSameTree = function (p, q) {
//   if (p === null && q === null) return true;
//   if (p === null || q === null) return false;
//   if (p.val !== q.val) return false;

//   return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
// };

// // leetcode 112 Path Sum
// // knew I had to do recursive calls, beyond that I had no chance on this one. Original thought was to add as I went but that wasn't gonna work

// function hasPathSum(root, targetSum) {
//   return dfSearch(root, targetSum);
// }

// function dfSearch(node, targetSum, total = 0) {
//   if (!node && total === targetSum) {
//   }

//   total += node.val;
//   // console.log(total);

//   dfSearch(root.left);
//   dfSearch(root.left);
// }

// // chat gpt solution which works
// // function hasPathSum(root, targetSum) {
// //   if (root === null) {
// //     return false;
// //   }

// //   if (root.left === null && root.right === null) {
// //     return targetSum === root.val;
// //   }

// //   return (
// //     hasPathSum(root.left, targetSum - root.val) ||
// //     hasPathSum(root.right, targetSum - root.val)
// //   );
// // }

// //
