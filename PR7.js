import { SinglyLinkedNode } from "./utils.js";
import { SinglyLinkedList } from "./utils.js";

// MULTIPLY NUMS ///////////////////////////////////////
////////////////////////////////////////////////////////
function addNum(newNumArr, lineArr, iteration) {
  lineArr = lineArr.reverse();
  for (let i = 0; i < iteration; i++) {
    lineArr.push(0);
  }
  newNumArr.push(lineArr);
}

function multiplyNumbers(numJ, numI) {
  // removed toString()
  let stringJ = numJ.split("").reverse();
  let stringI = numI.split("").reverse();
  let newNumArr = [];
  let carry = 0;

  for (let i = 0; i < stringI.length; i++) {
    let lineArr = [];
    let numI = Number(stringI[i]);

    for (let j = 0; j < stringJ.length; j++) {
      let numJ = Number(stringJ[j]);
      // added some variable names to make this less obnoxious
      let remainder = (numI * numJ) % 10;
      let product = numI * numJ;

      lineArr.push((product + carry) % 10);
      carry = (product - remainder) / 10;
    }

    // had to add the final carry here!
    lineArr.push(carry);
    addNum(newNumArr, lineArr, i);
  }

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
// console.log(multiplyNumbers("1", "1"));

// SIMP OLYMPICS ///////////////////////////////////////
////////////////////////////////////////////////////////

/*
1. 
2. clarify the question: a row of men each have a rating assigned to them which correlates (not specifies) to the number of BJs they receive. The exact number of BJs does not matter, but if one simp has a higher rating than the simp next to him, the simp with the higher rating must receive more BJs than the simp next to him with the lower rating. I am to specifiy how many BJs each guy receives while following the aforementioned rules. In short, for all adjacent simps, higher rating must have more BJs and lower rating must have lower BJs. Minimum of 1 BJ per simp. Adjacent simps with the same rating don't have to have the same number of BJs, but must follow the other rules

**Clarified the question, must keep BJs to a minimum 

for example:
[1,2,3,4,5] = [1,2,3,4,5] 
[5,5,5,5,5] = [1,1,1,1,1] 
[10,1,10,1,10] = [2,1,2,1,2]

3. function signature assuming array
function simpOlympics(ratings) {
  //operations
  // return an array
  return ratings;
}
*/

// 4. brute force.

function simpOlympics(arr) {
  return arr;
}

let rowOfSimps = [10, 10, 1, 2, 3];
// console.log(simpOlympics(rowOfSimps));

// 5. improve current solution.

// 6. implemet

// 7. test

// LONG LINES //////////////////////////////////////////
////////////////////////////////////////////////////////

/*
1. listen
2. clarify. given a paragraph from a book (so a string), find the longest segment which has no duplicate characters not counting punctuation, upper/lowercase is the same

example: aaaaaa > a
example: a a a a a a > a
example: Hello There Big Boy > lother

3. function signature
function longLines(str){
    // operations
    // return string segment 
}
*/

// 4. brute force
function longLines(str) {
  // keep counter as you go (+1 for each char)
  let counter = 0;

  // remember/record any new chars encountered
  let charsSeen = new Map();

  // stole this from chatgpt for convenience
  const charsAllowed = new Map();
  for (let i = 0; i < 26; i++) {
    let letter = String.fromCharCode(97 + i);
    charsAllowed.set(letter, letter);
  }

  // look through chars 1 at a time
  let newStr = str.toLowerCase();
  let startingIndex = 0;
  let substring = "";
  let longest = 0;

  for (let i = 0; i < newStr.length; i++) {
    // if weve seen a char already then set longest, reset count
    if (charsSeen.has(newStr[i])) {
      if (counter > longest) {
        longest = counter;
        substring = newStr.substring(startingIndex, i);
      }
      startingIndex = i;
      counter = 0;
      charsSeen.clear();
    }
    // add characters to seen list, increment counter
    if (charsAllowed.has(newStr[i])) {
      charsSeen.set(newStr[i], true);
      counter++;
    }
  }

  //   if the longest happens to go up to the end
  if (counter > longest) {
    substring = newStr.substring(startingIndex, newStr.length);
  }

  let finalString = "";

  for (let char of substring) {
    if (charsAllowed.has(char)) {
      finalString += char;
    }
  }

  return finalString;
}

// 5. improve solution. current solution loops over all characters to do some constant time operations, so I think the time complexity is n. I don't think I can speed that up because I need to look at every character still. space, I store a map of the alphabet for reference and also keep a temporary storage for the letters I've seen already. The storage can be reduced, I could probably not store the alphabet and just do a check as I go along based on character codes which I'll have to look up.

// 6. implement
function longLines2(str) {
  // keep counter as you go (+1 for each char)
  let counter = 0;

  // remember/record any new chars encountered
  let charsSeen = new Map();

  // look through chars 1 at a time
  let newStr = str.toLowerCase();
  let startingIndex = 0;
  let substring = "";
  let longest = 0;

  for (let i = 0; i < newStr.length; i++) {
    // if weve seen a char already then set longest, reset count
    if (charsSeen.has(newStr[i])) {
      if (counter > longest) {
        longest = counter;
        substring = newStr.substring(startingIndex, i);
      }
      startingIndex = i;
      counter = 0;
      charsSeen.clear();
    }
    // add characters to seen list, increment counter
    // got this stupid regex from the ai overlord
    if (/^[a-z]$/i.test(newStr[i])) {
      charsSeen.set(newStr[i], true);
      counter++;
    }
  }

  //   if the longest happens to go up to the end
  if (counter > longest) {
    substring = newStr.substring(startingIndex, newStr.length);
  }

  let finalString = "";

  for (let char of substring) {
    if (/^[a-z]$/i.test(char)) {
      finalString += char;
    }
  }

  return finalString;
}
// that slightly reduced the memory, but it's mostly the same. I don't think I cn speed it up any amount that's significant becuase I still need to loop at every character to know if it's important or not

// 7. test!
let paragraph =
  "zz z we f   hbEWQFPIUWREFwef][[[[[[[[[[[];'zz,.z,zzza /quick    br.o.w.n f";

// console.log(longLines2(paragraph));

// REMOVE CHEATERS //////////////////////////////////////
////////////////////////////////////////////////////////

/*
1. listen
2. clarify: I am to look through a stack of tests and identify a cheater if the answers of a test are exactly the same as the answers as the test just before it. If two are the same I know instantly 

example: [a,b,b,c,d] > [a,c,d]
example: [a,a,a,a,a] > []
example: [a,b,c,d,e] > [a,b,c,d,e]

3. function signature
function cheaters(arr){
  // operations
  // return array full of the cheaters
}
*/

// 4. brute force
function cheaters(arr) {
  let map = new Map();
  // 1.take first test
  for (let i = 0; i < arr.length; i++) {
    // 2.compare to list of versions seen already
    if (map.has(arr[i])) {
      // 3.if already there, throw out test
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      // 4.if not, add version to list of already seen
      map.set(arr[i], 1);
    }
  }
  // 6.repeat
  // 7. look through arr again, if item not in map, remove

  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (map.get(arr[i]) < 2) {
      newArr.push(arr[i]);
    }
  }

  console.log(map.entries());
  return newArr;
}

// 5 improve. Time complexity of my solution is n + n because I loop through the values once to add to the map, then again to push only those which appeared once to the final array. So that's n, not bad. for space I store all the values again in a map, then also make a new array. So it's 2x input size plus the final array which worse case could be also n if they all cheated, so 3n for space. Space could probably be improved here. I could not create the last array and just modify the original, but that would come at a cost to the time requirement because splicing an array is an order n operation.

// 6. implement: not much point in coppy/pasting the entire function, so here's the last part I could change to improve the space at the cost of time: (chaging lines 256 - 264)

// for (let i = 0; i < arr.length; i++) {
//   if (map.get(arr[i]) > 1) {
//     arr.splice(i, 1);
//     i--;
//   }
// }
// return arr;

// 7. test!
let tests = ["a", "b", "c", "a", "a", "b", "e"];

console.log(cheaters(tests));