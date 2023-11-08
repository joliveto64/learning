import { SinglyLinkedNode } from "./utils.js";
import { SinglyLinkedList } from "./utils.js";

// *******************************************************************************
// *******************************************************************************
// 2. Given a stack of sticky notes with letters on them, reverse their order

let stackToReverse = [1, 2, 3, 4, 5];

function reverseStack(array) {
  if (!array || array.length <= 1) return array;
  // remove note from top of stack
  let removedItem = array.shift();
  // place note on table to left of stack to begin a new stack
  let newArray = [];
  newArray.unshift(removedItem);
  // remove note from top of stack
  // place note on top of new stack
  // repeat steps 3 and 4 until there are no notes left
  for (let i = 0; i < array.length; i++) {
    newArray.unshift(array[i]);
  }

  return newArray;
}
// time complexity is n^2 because unshift has to move every element to add a new one, then do that for every element. So, moving n items n times = n^2
//   this is fine for short array, not fine for large one
// space is n, the length of the original array

function reverseStack2(array) {
  if (!array || array.length <= 1) return array;

  let newArr = [];
  for (let i = array.length - 1; i >= 0; i--) {
    newArr.push(array[i]);
  }
  return newArr;
}
// I believe this is O(n) now. n to loop through once, push() is constant time

// *************************************************************************************
// *************************************************************************************
// 3. Write a ransom note (you're given a magazine, and a copy of the letter - you need to  cut out letters from the magazine to make the letter. Lmk if it's not possible)

let magazine = ["h", "h", "i", "j"];
let letter = ["h", "i", "x"];

// NOTE: my comments didn't make sense for code in their original order. I took the comments and found a more appropriate order for them

function ransomNote(magazine, letter) {
  // look at first letter in note and remember it
  // look at the next letter in the note and remember it
  for (let i = 0; i < letter.length; i++) {
    let matchFound = false;
    // look through letters in the magazine, skipping any that are crossed off, in order until you find a match
    for (let j = 0; j < magazine.length; j++) {
      if (letter[i] == magazine[j]) {
        console.log("match");
        matchFound = true;
        // if match is found, cross off letter in magazine so it can't be used again
        magazine[j] = null;
      }
    }
    // quit if no match is found and say "not possible"
    if (!matchFound) return false;
  }
  // repeat steps 2, 3, 4 and 5 until all letters have been found
  return true;
}

// time complexty is n^2 because you have to look through n letters each for n magazine letters potentially.
// space complexity is n because it doesn't change i'm just comparing

// *************************************************************************************
// *************************************************************************************
// here is a version that is O(n)
let magazine2 = ["a", "b", "c", "c", "x", "x"];
let letter2 = [];

function ransomNote2(magazine, letter) {
  if (!magazine || !letter || magazine.length < 1 || letter.length < 1) {
    return false;
  }

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
    if (!map.has(letter[i])) {
      return false;
    } else {
      map.set(letter[i], map.get(letter[i] - 1));
    }
  }

  return true;
}
// O(n + n) reduces to O(n)

// *************************************************************************************
// *************************************************************************************
// 4. Given a stack of 2 to 5 unsorted, numbered sticky notes. Give me 1 new sticky note with the sum of them all. Assume the person can add 2 numbers together

const arrayToSum = [1, 2, 3, 4, 5];

function sum(arr) {
  // take first sticky note from the stack
  let firstNum = arr[0];
  // write down the number from the note in step 1 on a new note
  let total = firstNum;
  // take the next note from the stack
  let secondNum = arr[1];
  // add the number from the note in step 3 to the number on the new note from step 2
  total += secondNum;
  // cross off number on new note from step 2 and write down the total that was added together from step 4
  // repeat steps 3, 4 and 5 until there are no notes left
  for (let i = 2; i < arr.length; i++) {
    total += arr[i];
  }

  return total;
}
// time complexity is O(n because it looks at every item in the array once)

// *************************************************************************************
// *************************************************************************************
// 5. Combine 2 stacks of sticky notes into 1 sorted stack
// One stack has 10 stickies, is sorted from smallest to largest, and each number is between 1 - 100
// The other stack has 15 stickies, is also sorted from smallest to largest and each number is between 1 - 100
// Assume the person can compare 2 numbers and see which is bigger

// steps: https://docs.google.com/document/d/1jEdBPfhesDkx9SbIRwtcFPjVF6Jj8Rt6KVh7z6rmsVU/edit?pli=1
// i ran into many issues translating my steps to code, so I've half followed them

function mergeSortedArrays(arr1, arr2) {
  // deal with edge cases
  if ((!arr1 && !arr2) || (arr1.length < 1 && arr2.length < 1)) return [];

  //   init empty array and start index counters to increment later
  let newArr = [];
  let index = 0;
  let index2 = 0;

  //   while loop to compare values
  while (arr1[index] || arr2[index2]) {
    // make sure the index exists
    let index1Exists = arr1[index] !== undefined;
    let index2Exists = arr2[index2] !== undefined;

    // if only one exists, push the other
    if (!index1Exists && index2Exists) {
      newArr.push(arr2[index2]);
      index2++;
    }
    if (!index2Exists && index1Exists) {
      newArr.push(arr1[index]);
      index++;
    }

    // handle >, < and === cases if both exist
    if (index1Exists && index2Exists) {
      if (arr1[index] > arr2[index2]) {
        newArr.push(arr2[index2]);
        index2++;
      } else if (arr2[index2] > arr1[index]) {
        newArr.push(arr1[index]);
        index++;
      } else if (arr1[index] === arr2[index2]) {
        newArr.push(arr2[index2]);
        newArr.push(arr1[index]);
        index++;
        index2++;
      }
    }
  }
  //   return the new merged and sorted array
  return newArr;
}

// time complexity is n because i look through each array once. n + n is O(n)

let firstStack = [1, 2, 3, 4];
let secondStack = [3, 5, 100];
// console.log(mergeSortedArrays(firstStack, secondStack));

// 6.  Sort 30 Numbers 1-100

// gonna try to solve this different than I did before (my steps were like bubble sort I think) per our last talk

function sort30Nums(arr) {
  if (!arr || arr.length < 1) return arr;
  //  create"buckets" to divide numbers
  let newArr = [];
  for (let i = 1; i <= 10; i++) {
    newArr.push([]);
  }

  // loop and place into buckets
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];

    if (current <= 10) {
      newArr[0].push(current);
    }

    if (current >= 11 && current <= 20) {
      newArr[1].push(current);
    }

    if (current >= 21 && current <= 30) {
      newArr[2].push(current);
    }

    if (current >= 31 && current <= 40) {
      newArr[3].push(current);
    }

    if (current >= 41 && current <= 50) {
      newArr[4].push(current);
    }

    if (current >= 51 && current <= 60) {
      newArr[5].push(current);
    }

    if (current >= 61 && current <= 70) {
      newArr[6].push(current);
    }

    if (current >= 71 && current <= 80) {
      newArr[7].push(current);
    }

    if (current >= 81 && current <= 90) {
      newArr[8].push(current);
    }

    if (current >= 91 && current <= 100) {
      newArr[9].push(current);
    }
  }
  // sort individual buckets

  for (let bucket of newArr) {
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
  return [
    ...newArr[0],
    ...newArr[1],
    ...newArr[2],
    ...newArr[3],
    ...newArr[4],
    ...newArr[5],
    ...newArr[6],
    ...newArr[7],
    ...newArr[8],
    ...newArr[9],
  ];
}

let arrayOf30 = [
  100, 1, 20, 34, 68, 96, 46, 37, 86, 77, 44, 33, 29, 1, 35, 99, 34, 71, 82, 73,
  59, 67, 45, 23, 12, 21, 43, 54, 65, 76,
];

// console.log(sort30Nums(arrayOf30));

// *************************************************************************************
// *************************************************************************************

// 7. Given a stack of sticky notes with letters on them, take all the odd ones and put them at the front (eg: D,E,F,G --> D,F then E,G since D and F are the 1st and 3rd sticky, since 1 and 3 are odd numbers). Assume the person can count and tell if a number is even or odd.

function moveOddsToFront(arr) {
  if (!arr || arr.length < 1) return arr;
  // write down the number 1
  let num = 1;
  // look at the note at the top of the stack
  let firstLetter = arr[0];
  // if the number in your head is an odd number, remove the note from the previous step and place it to the side to start a new stack
  let newStack = [];
  if (num % 2 !== 0) {
    newStack.push(firstLetter);
    arr.splice(0, 1);
  }

  // 4. if there is a next note, look at it and increase the number you wrote down by 1
  // 5. if the number in your head is an odd number, remove the note from the previous step and place at the bottom of the new stack, go to step 4
  for (let i = 0; i < arr.length; i++) {
    num++;
    if (num % 2 !== 0) {
      newStack.push(arr[i]);
      arr.splice(i, 1);
    }
  }
  // if there is not a next note, take the new stack and place the whole thing, in the same order, on top of the old stack
  return [...newStack, ...arr];
}
// this is O(n) because I look at everything once
let arrayToMoveOdds = ["D", "E", "F", "G"];

// 8. Compute the average of 10 numbers. Assume the person is able to do basic arithmetic on 2 numbers

function calcAverage(arr) {
  if (!arr || arr.length < 1) return arr;
  // remember the number 0, this is your number
  let myNumber = 0;
  // look at the first number and add it to your number
  myNumber += arr[0];
  // look at the next number and add it to your number
  // if there is a next number, repeat step 3. If there is no next number, go to the next step
  for (let i = 1; i < arr.length; i++) {
    myNumber += arr[i];
  }
  // divide your number by 10
  return myNumber / arr.length;
}

let numsToAverage = [5, 5, 7, 2, 8, 6, 4];
// this one is O(n) because I look at every number once
console.log(calcAverage(numsToAverage));
