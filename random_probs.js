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
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
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

// using binary search in n log n time

function firstAndLastIndex2(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      break;
    } else if (arr[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
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
  let left = [];
  let right = [];
  let equal = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else if (array[i] > pivot) {
      right.push(array[i]);
    } else {
      equal.push(array[i]);
    }
  }

  return [...sort(left), ...equal, ...sort(right)];
}

// console.log(kthLargestElement([4, 2, 9, 8, 5, 6, 7, 1, 3], 2));

// 4. is binary tree symmetrical
function symmetricalTree(root) {
  if (!root) return true;

  return isMirror(root.left, root.right);
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
    isMirror(leftTree.left, rightTree.right) &&
    isMirror(leftTree.right, rightTree.left)
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
    let count = 0;
    let index = i;

    while (true) {
      if (count === net.length) return index;
      gasTank += net[index];

      if (gasTank >= 0) {
        count++;
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
