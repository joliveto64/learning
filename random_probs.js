// 1. valid anagram
// ex: danger, garden
function isAnagram(str1, str2) {
  let cleaned1 = cleanString(str1);
  let cleaned2 = cleanString(str2);

  if (cleaned1.length !== cleaned2.length) return false;

  let chars1 = {};
  let chars2 = {};

  for (let i = 0; i < cleaned1.length; i++) {
    if (chars1[cleaned1[i]]) {
      chars1[cleaned1[i]]++;
    } else {
      chars1[cleaned1[i]] = 1;
    }

    if (chars2[cleaned2[i]]) {
      chars2[cleaned2[i]]++;
    } else {
      chars2[cleaned2[i]] = 1;
    }
  }

  for (let key in chars1) {
    if (!chars2[key] || chars1[key] !== chars2[key]) return false;
  }

  return true;
}

function cleanString(str) {
  return str
    .toLowerCase()
    .trim()
    .split("")
    .filter((char) => char.trim() !== "");
}

// wanted to relearn quicksort
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  let pivot = arr[0];
  let leftCount = [];
  let rightCount = [];

  for (let i = 0; i < arr.length; i++) {
    arr[i] < pivot ? leftCount.push(arr[i]) : rightCount.push(arr[i]);
  }

  return [...quickSort(leftCount), pivot, ...quickSort(rightCount)];
}

// console.log(isAnagram("daN ger", "gA    rd E n"));

// 2. find index of first and last occurance of target in sorted arr
function firstAndLastIndex(arr, target) {
  let returnArr = [null, null];

  let j = arr.length - 1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target && returnArr[0] === null) {
      returnArr[0] = i;
    }

    if (arr[j] === target && returnArr[1] === null) {
      returnArr[1] = j;
    }

    if (returnArr[0] !== null && returnArr[1] !== null) break;

    j--;
  }

  return returnArr;
}

// console.log(firstAndLastIndex([1, 2, 2, 2, 3, 4, 5, 2], 2));
// console.log(firstAndLastIndex([1, 2, 3, 4, 5], 2));
// console.log(firstAndLastIndex([1, 2, 3, 4, 5], 9));

// using binary search in log n time

function firstAndLastIndex2(arr, target) {
  let leftCount = 0;
  let rightCount = arr.length - 1;
  let mid;

  while (leftCount <= rightCount) {
    mid = Math.floor((leftCount + rightCount) / 2);
    if (arr[mid] === target) {
      break;
    } else if (arr[mid] > target) {
      rightCount = mid - 1;
    } else {
      leftCount = mid + 1;
    }
  }

  let finalArr = [null, null];
  let hi = mid;
  let lo = mid;

  while (arr[lo] === arr[mid]) {
    finalArr[0] = lo;
    lo--;
  }

  while (arr[hi] === arr[mid]) {
    finalArr[1] = hi;
    hi++;
  }

  return finalArr;
}

// console.log(firstAndLastIndex2([0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 2));
// console.log(firstAndLastIndex2([2], 2));

// 3. kth largest element in array
function kthLargestElement(array, k) {
  // sort array
  let sortedArray = sort(array);
  // return kth num
  console.log(sortedArray);
  return sortedArray[sortedArray.length - k];
}

function sort(array) {
  if (array.length <= 1) return array;

  let pivot = array[0];
  let leftCount = [];
  let rightCount = [];
  let equal = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      leftCount.push(array[i]);
    } else if (array[i] > pivot) {
      rightCount.push(array[i]);
    } else {
      equal.push(array[i]);
    }
  }

  return [...sort(leftCount), ...equal, ...sort(rightCount)];
}

// console.log(kthLargestElement([4, 2, 9, 8, 5, 6, 7, 1, 3], 2));

// 4. is binary tree symmetrical
function symmetricalTree(root) {
  if (!root) return true;

  return isMirror(root.leftCount, root.rightCount);
}

function isMirror(leftTree, rightTree) {
  if (leftTree === null && rightTree === null) {
    return true;
  } else if (leftTree === null || rightTree === null) {
    return false;
  } else if (leftTree.val !== rightTree.val) {
    return false;
  }

  return (
    isMirror(leftTree.leftCount, rightTree.rightCount) &&
    isMirror(leftTree.rightCount, rightTree.leftCount)
  );
}

function validPar(string) {
  let open = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] === "(") {
      open++;
    } else if (string[i] === ")" && open <= 0) {
      return false;
    } else if (string[i] === ")" && open > 0) {
      open--;
    }
  }

  return open === 0;
}

// console.log(validPar("((()))"));
// console.log(validPar(")))((("));
// console.log(validPar("(((())"));

// 5. gas station again!

function gasSation(gas, cost) {
  let net = [];
  for (let i = 0; i < gas.length; i++) {
    net.push(gas[i] - cost[i]);
  }

  for (let i = 0; i < net.length; i++) {
    let gasTank = 0;
    let currentCount = 0;
    let index = i;

    while (true) {
      if (currentCount === net.length) return index;
      gasTank += net[index];

      if (gasTank >= 0) {
        currentCount++;
        index++;

        if (index >= net.length) {
          index = 0;
        }
      } else {
        break;
      }
    }
  }
  return -1;
}

// console.log(
//   gasSation([1, 5, 3, 3, 5, 3, 1, 3, 4, 5], [5, 2, 2, 8, 2, 4, 2, 5, 1, 2])
// );

// console.log(gasSation([1, 0], [1, 1]));

// sliding window
let slidingArr = [1, 3, 5, 2, 4, 2];
// ex: k = 3
// ex: [1,3,5] = 9
// ex: [3,5,2] = 10
// ex: [5,2,4] = 11
// ex: [2,4,2] = 8

function slidingWindow(arr, k) {
  let window = k;
  let subArr = [];
  let total = 0;

  // loop over array
  for (let i = 0; i < arr.length; i++) {
    // add moveZerosTest[i] to total
    total += arr[i];

    // if >= k - 1, subtract arr[i - k] if there
    // push to subArr
    if (i >= window - 1) {
      total = arr[i - window] ? total - arr[i - window] : total;
      subArr.push(total);
    }
  }

  // return subArr
  return subArr;
}

// console.log(slidingWindow(slidingArr, 3));

// move zeros: move all zeros to the end "in place", no copy of the array, must maintain order of the non-0 elements
let moveZerosTest = [0, 1, 0, 3, 12];
function moveZeros(nums) {
  let changes = true;
  while (changes) {
    changes = false;
    for (let i = 0; i < moveZerosTest.length; i++) {
      if (moveZerosTest[i] === 0) continue;

      if (moveZerosTest[i - 1] === 0 && moveZerosTest[i] !== 0) {
        moveZerosTest[i - 1] = moveZerosTest[i];
        moveZerosTest[i] = 0;

        changes = true;
      }
    }
  }

  return nums;
}

// console.log(moveZeros(moveZerosTest));

// min subarray
// return min length of subarray needed to add up to >= target
function minSubArrayLen(target, nums) {
  // let window = 1
  let window = 1;
  // loop over array
  while (window <= nums.length) {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
      // keep running total
      // for each iteration, subtract arr[i-target] if exists and add current
      total += nums[i];
      total = nums[i - window] ? total - nums[i - window] : total;
      // if total >= target return window
      if (total >= target) return window;
      // if no answer, window++ (while window <=numslength)}
    }
    window++;
  }
  return 0;
}

// console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
// console.log(minSubArrayLen(4, [1, 4, 4]));
// console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1, 1]));

// reverse string with recursion
function reverseString(string, newString = "", index = string.length - 1) {
  if (index < 0) return newString;
  newString += string[index];

  return reverseString(string, newString, --index);
}

function reverseString2(string, index) {
  if (index < 0) {
    return "";
  } else {
    return string[index] + reverseString2(string, index - 1);
  }
}

// console.log(reverseString("hello"));
// let str = "hello";
// console.log(reverseString2(str, str.length - 1));

// invert binary tree
// mirror rightCount/leftCount and return root

class BinaryNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

let node0 = new BinaryNode(10);
let node3 = new BinaryNode(3);
let node2 = new BinaryNode(2, node3);
let node1 = new BinaryNode(1, node2, node0);

//       1
//      /\
//     2  10
//    /
//   3

function print(root) {
  if (!root) return;
  console.log(root.val);
  print(root.leftCount);
  print(root.rightCount);
}

function swap(root) {
  if (!root) return;

  let temp = root.leftCount;
  root.leftCount = root.rightCount;
  root.rightCount = temp;

  swap(root.leftCount);
  swap(root.rightCount);
}

function invertTree(root) {
  if (!root) return [];

  let temp = root.leftCount;
  root.leftCount = root.rightCount;
  root.rightCount = temp;

  invertTree(root.leftCount);
  invertTree(root.rightCount);

  return root;
}

// max depth
var maxDepth = function (root) {
  if (!root) return 0;

  let currentCount = 1;
  let leftCount = maxDepth(root.leftCount);
  let rightCount = maxDepth(root.rightCount);

  return Math.max(leftCount, rightCount) + currentCount;
};

// console.log(maxDepth(node2));

// symmetric trees
// if right/left symmetrical, return true, else return false
function isSymmetric(root) {
  if (!root) return true;

  let left = root.left;
  let right = root.right;
  console.log(root);

  return compare(left, right);
}

function compare(left, right) {
  console.log("running");
  if (!left && !right) return true;
  if (!left || !right) return false;
  if (left.val !== right.val) return false;
  console.log(left);

  if (compare(left.left, right.right) && compare(left.right, right.left)) {
    return true;
  } else {
    return false;
  }
}

// console.log(isSymmetric(node2));

// right view again
function rightSideView(node, level = 0, seen = []) {
  if (!node) return [];

  if (seen.length === level && node.val !== null) seen.push(node.val);
  level++;

  rightSideView(node.right, level, seen);
  rightSideView(node.left, level, seen);

  return seen;
}

// console.log(rightSideView(node1));

// average of levels
// find the average of the nodes at each level
// return averages in an array

function averageOfLevels(root, level = 0, map = new Map()) {
  if (!root) return;

  if (!map.has(level)) {
    map.set(level, [root.val]);
  } else {
    map.get(level).push(root.val);
  }
  level++;

  averageOfLevels(root.left, level, map);
  averageOfLevels(root.right, level, map);

  return map;
}

function calcAverages(root) {
  if (!root) return [];

  const mapOfArrays = averageOfLevels(root);
  let averages = [];

  for (let [key, array] of mapOfArrays) {
    let total = 0;
    let length = array.length;
    for (let num of array) {
      total += num;
    }
    averages.push(total / length);
  }

  return averages;
}

// console.log(calcAverages());
