import { SinglyLinkedNode } from "./utils.js";
import { SinglyLinkedList } from "./utils.js";

// *******************************************************************************
// *******************************************************************************
// 2. Given a stack of sticky notes with letters on them, reverse their order

let stackToReverse = [1, 2, 3, 4, 5];

function reverseStack(array) {
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

// *************************************************************************************
// *************************************************************************************
// 3. Write a ransom note (you're given a magazine, and a copy of the letter - you need to  cut out letters from the magazine to make the letter. Lmk if it's not possible)

let magazine = ["a", "i", "x", "o", "q", "e", "h", "g"];
let letter = ["h", "i", "x", "g"];

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

// here is a version that is O(n)
function ransomNote2(magazine, letter) {
  let magazineMap = new Map();

  //   this loop is O(n)
  for (let i = 0; i < magazine.length; i++) {
    magazineMap.set(magazine[i], i);
  }

  //   this loop is also O(n)
  for (let i = 0; i < letter.length; i++) {
    if (!magazineMap.get(letter[i])) {
      return false;
    }
  }

  return true;
}
// O(n + n) reduces to O(n)
