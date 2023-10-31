// leetcode merge two sorted lists (#21) you already seen this, here for reference

function mergeTwoLists(list1, list2) {
  let head = new ListNode();
  let current = head;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  current.next = list1 ? list1 : list2;

  return head.next;
}

// leetcode #2 add two numbers: You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// note: this solution worked for 1565 / 1568 test cases. The solution breaks down according to chatGPT with very large numbers (javascript thing). It said the only work around was a completely different solution which was mathy and I didn't bother.

class singlyLinkedNode {
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}

node3 = new singlyLinkedNode(3);
node2 = new singlyLinkedNode(2, node3);
node1 = new singlyLinkedNode(1, node2);

node6 = new singlyLinkedNode(6);
node5 = new singlyLinkedNode(5, node6);
node4 = new singlyLinkedNode(4, node5);

function addTwoNumbers(list1, list2) {
  let arr1 = [];
  let arr2 = [];
  // traverse both lists to get numbers
  while (list1 || list2) {
    if (list1) {
      arr1.unshift(list1.val);
      list1 = list1.next;
    }

    if (list2) {
      arr2.unshift(list2.val);
      list2 = list2.next;
    }
  }
  // create helper function to add numbers/return final number
  let reversedSumArray = addAndReverseNumbers(arr1, arr2);

  // create a new list by looping over number/creating nodes
  let head = new singlyLinkedNode(reversedSumArray[0]);
  let dummy = head;

  for (let i = 1; i < reversedSumArray.length; i++) {
    dummy.next = new singlyLinkedNode(reversedSumArray[i]);
    dummy = head.next;
  }

  //   return head of new list
  console.log(head, head.next, head.next.next);
  return head;
}

function addAndReverseNumbers(arr1, arr2) {
  let num1 = arr1.join("");
  let num2 = arr2.join("");

  let sum = parseInt(num1) + parseInt(num2);

  return sum.toString().split("").reverse().map(Number);
}

addTwoNumbers(node1, node4);
