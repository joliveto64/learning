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

// find index of first and last occurance of target in sorted arr
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

// using binary search

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

  while (finalArr[0] === null || finalArr[1] === null) {
    console.log(lo, hi);
    if (!arr[lo]) finalArr[0] = -1;
    if (!arr[hi]) finalArr[1] = -1;

    if (arr[lo] !== arr[mid] && finalArr[0] === null) {
      finalArr[0] = lo + 1;
    }

    if (arr[hi] !== arr[mid] && finalArr[1] === null) {
      finalArr[1] = hi - 1;
    }
    hi++;
    lo--;
  }

  return finalArr;
}

console.log(
  firstAndLastIndex2([1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9], 2)
);
