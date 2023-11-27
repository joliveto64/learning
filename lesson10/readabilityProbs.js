// PR8
function multiplyNumbers(numJ, numI) {
  let stringJ = numJ.split("").reverse();
  let stringI = numI.split("").reverse();
  console.log(stringI);
  let newNumArr = [];
  let carry = 0;

  for (let i = 0; i < stringI.length; i++) {
    let numI = Number(stringI[i]);
    let lineArr = [];

    for (let j = 0; j < stringJ.length; j++) {
      let numJ = Number(stringJ[j]);
      //   total > productPlusCarry, total could mean many things
      let total = numI * numJ + carry;
      let remainder = total % 10;

      carry = (total - remainder) / 10;
      lineArr.push(remainder);
    }

    if (carry > 0) {
      lineArr.push(carry);
    }
    carry = 0;
    addNum(newNumArr, lineArr, i);
  }

  //   in this section I think maybe doing for loops instead of for of loops could be better. for let i of newNumArr and for let j of subArr, then I just don't need two new variables at all which I think would improve readability. Theres like 6 variables in this section currently which is hard to reason about
  let total = 0;
  for (let subArr of newNumArr) {
    let tempStr = "";
    for (let digit of subArr) {
      tempStr += digit;
    }
    total += Number(tempStr);
    tempStr = "";
  }
  return total;
}

// newNumArr > newLineArr so it's clear we're updating lineArr
function addNum(newNumArr, lineArr, iteration) {
  lineArr = lineArr.reverse();
  for (let i = 0; i < iteration; i++) {
    lineArr.push(0);
  }
  newNumArr.push(lineArr);
}

// PR8: this one is comparing two equal things, I could name them ancestor 1 and ancestor 2 to be more explicit. lmk your thoughts. In general I feel like this could be fine as is
function youngestAncestor(node1, node2) {
  if (!node1 || !node2) return undefined;
  let nodesSeen = new Map();

  while (node1 || node2) {
    if (node1 === node2) {
      return node1.val;
    } else if (nodesSeen.has(node1)) {
      return node1.val;
    } else if (nodesSeen.has(node2)) {
      return node2.val;
    }

    nodesSeen.set(node1, node1.val);
    nodesSeen.set(node2, node2.val);

    node1 = node1.parent;
    node2 = node2.parent;
  }
}

// PR7. arr could be tests or studentTests
function cheaters(arr) {
  // map could be answerKeysSeen or testsSeen
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }

  //   newArr could be testsKeeping
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (map.get(arr[i]) < 2) {
      newArr.push(arr[i]);
    }
  }

  return newArr;
}

// PR7: arr could be simpRatingsArr or inputArr or ratingsArr
function simpOlympics2(arr) {
  // arr2 could be bjsArray
  let arr2 = [];

  for (let i = 0; i < arr.length; i++) {
    arr2.push(1);
  }

  let changesMade;
  do {
    changesMade = false;
    for (let i = 0; i < arr.length; i++) {
      let current = arr[i];
      let next = arr[i + 1];
      let prev = arr[i - 1];
      // once the arrays have better names, I can eliminate the variables current, next, prev because they would become self explanatory. Also, don't use variable names for some and not others as you mentioned. So, ratingsArr[i], bjsArray[j]
      if (current > next && arr2[i] <= arr2[i + 1]) {
        arr2[i]++;
        changesMade = true;
      } else if (current > prev && arr2[i] <= arr2[i - 1]) {
        arr2[i]++;
        changesMade = true;
      }
    }
  } while (changesMade);
  return arr2;
}

// PR6: maybe node or node would be better if it's a circle
function recessGame2(head) {
  // startingNode would be more descriptive of the problem
  let firstNode = head;
  // totalNodes would be better I think
  let numNodes = 1;

  head = head.next;
  while (head !== firstNode) {
    head = head.next;
    numNodes++;
  }

  // count could be nodesTraversed
  let count = 0;
  let current = firstNode;

  // would become while nodesTraversed < totalNodes
  while (count <= numNodes) {
    // nodesToAdvance is more descriptive
    let numMoves = current.data;

    for (let i = 0; i < numMoves; i++) {
      current = current.next;
      count++;
    }

    // if nodesTraversed === totalNodes
    if (count === numNodes) return true;
  }

  return false;
}

// PR5. array could be inputArr or numsArr
function reverseStack2(array) {
  if (!array || array.length <= 1) return array;

  // reversedArr. This was accidentally renamed to buckets because I did "change all occurences" on something else lol
  let buckets = [];
  for (let i = array.length - 1; i >= 0; i--) {
    buckets.push(array[i]);
  }
  return buckets;
}

// PR5.
let magazine = ["a", "b", "c", "c", "x", "x"];
let letter = ["a", "x", "c", "c"];
function ransomNote(magazine, letter) {
  if (!magazine || !letter || magazine.length < 1 || letter.length < 1) {
    return undefined;
  }

  // magazineMap would be better
  let map = new Map();
  //   this loop is O(n)
  for (let i = 0; i < magazine.length; i++) {
    if (map.has(magazine[i])) {
      map.set(magazine[i], map.get(magazine[i]) + 1);
    } else {
      map.set(magazine[i], 1);
    }
  }

  //   this loop is also O(n)
  for (let i = 0; i < letter.length; i++) {
    if (!map.get(letter[i]) > 0) {
      return false;
    } else {
      map.set(letter[i], map.get(letter[i]) - 1);
    }
  }

  return true;
}

// PR5. I think arr1 & 2 is okay here because it's an equal comparison
function mergeSortedArrays(arr1, arr2) {
  if ((!arr1 && !arr2) || (arr1.length < 1 && arr2.length < 1)) return [];

  // also got accidentally renamed to buckets 🫠 could be mergedArr
  let buckets = [];
  // index1
  let index = 0;
  let index2 = 0;

  while (arr1[index] || arr2[index2]) {
    // didn't need to do this. could just say if (arr1[index])
    let index1Exists = arr1[index] !== undefined;
    let index2Exists = arr2[index2] !== undefined;

    if (!index1Exists && index2Exists) {
      buckets.push(arr2[index2]);
      index2++;
    }
    if (!index2Exists && index1Exists) {
      buckets.push(arr1[index]);
      index++;
    }

    if (index1Exists && index2Exists) {
      if (arr1[index] > arr2[index2]) {
        buckets.push(arr2[index2]);
        index2++;
      } else if (arr2[index2] > arr1[index]) {
        buckets.push(arr1[index]);
        index++;
      } else if (arr1[index] === arr2[index2]) {
        buckets.push(arr2[index2]);
        buckets.push(arr1[index]);
        index++;
        index2++;
      }
    }
  }

  return buckets;
}

// PR5. here's where "buckets" came from. arr could be numsArr or inputArr
function sort30Nums(arr, numBuckets = 10) {
  if (!arr || arr.length < 1) return undefined;

  // maybe minNum & maxNum +  numsArray would work well together
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }

    if (arr[i] > max) {
      max = arr[i];
    }
  }

  let sizeOfBuckets = 10;
  // bucketsArr for sure
  let buckets = [];
  for (let i = 1; i <= numBuckets; i++) {
    buckets.push([]);
  }

  for (let i = 0; i < arr.length; i++) {
    let currentVal = arr[i];

    buckets[Math.floor((currentVal - min) / sizeOfBuckets)].push(currentVal);
  }

  // sort individual buckets
  for (let bucket of buckets) {
    let swapMade;
    do {
      swapMade = false;
      for (let i = 0; i < bucket.length - 1; i++) {
        if (bucket[i + 1] < bucket[i]) {
          let temp = bucket[i];
          bucket[i] = bucket[i + 1];
          bucket[i + 1] = temp;
          swapMade = true;
        }
      }
    } while (swapMade);
  }

  // merge buckets in order
  let sortedBuckets = [];
  for (let bucket of buckets) {
    sortedBuckets.push(...bucket);
  }
  return sortedBuckets;
}

// PR5. inputArr or numsArr
function moveOddsToFront(arr) {
  if (!arr || arr.length < 1) return undefined;

  // could be evenOddCounter
  let num = 1;
  let firstLetter = arr[0];
  // rearrangedStack? or rearrangedArray?
  let newStack = [];
  if (num % 2 !== 0) {
    newStack.push(firstLetter);
    arr.splice(0, 1);
  }

  for (let i = 0; i < arr.length; i++) {
    num++;
    if (num % 2 !== 0) {
      newStack.push(arr[i]);
      arr.splice(i, 1);
    }
  }

  return [...newStack, ...arr];
}

// PR4: i think list1 and list2 is okay here
function mergeTwoLists(list1, list2) {
  // head could be startingNode or dummyNode
  let head = new ListNode();
  // currentNode
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

// PR4: removeAdjacentDupes would be more descriptive of what it's supposed to do
function removeDuplicates(root) {
  // head is probably okay, could be startingNode or firstNode
  let head = root;
  // currentNode
  let current = head;
  // maybe comparisonNode?
  let trackedNode = head;
  // while loop to traverse list
  while (current) {
    // comparisonNode.val !== currentNode.val is mush clearer
    if (trackedNode.val !== current.val) {
      trackedNode.next = current;
      trackedNode = current;
    }

    if (current === null) {
      trackedNode.next = null;
    }
    current = current.next;
  }
  // return head of linked list
  //   console.log(head, head.next, head.next.next);
  return head;
}

// PR4: this shit is so confusing to read. Not really sure how to make this one easier to read maybe it's just inherently obnoxious
function reverseList(head) {
  // prevNode
  let prev = null;
  // currentNode
  let current = head;
  while (current) {
    // nextNodeTemp
    let nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }

  return prev;
}
