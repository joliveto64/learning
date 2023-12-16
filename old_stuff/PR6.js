import { SinglyLinkedNode } from "../utils.js";
import { SinglyLinkedList } from "../utils.js";

// RANSOM NOTE 2 ///////////////////////////////////////
////////////////////////////////////////////////////////
let magazine2 = ["a", "b", "c", "c", "x", "x"];
let letter2 = ["a", "x", "c", "c"];

function ransomNote2(magazine, letter) {
  if (!magazine || !letter || magazine.length < 1 || letter.length < 1) {
    return undefined;
  }

  let map = new Map();
  for (let i = 0; i < magazine.length; i++) {
    if (map.has(magazine[i])) {
      map.set(magazine[i], map.get(magazine[i]) + 1);
    } else {
      map.set(magazine[i], 1);
    }
  }

  for (let i = 0; i < letter.length; i++) {
    // changed this to say if not > 0
    if (!map.get(letter[i]) > 0) {
      return false;
    } else {
      // this can stay the same, though I could add code to make it stop decrememting
      map.set(letter[i], map.get(letter[i]) - 1);
    }
  }
  return true;
}
// console.log(ransomNote2(magazine2, letter2));

// MULTIPLY NUMS ///////////////////////////////////////
////////////////////////////////////////////////////////
function addNum(arr, newNum, itt) {
  newNum = newNum.reverse();
  for (let i = 0; i < itt; i++) {
    newNum.push(0);
  }
  arr.push(newNum);
}

function multiplyNumbers(numJ, numI) {
  let stringJ = numJ.toString().split("").reverse();
  let stringI = numI.toString().split("").reverse();
  let arr = [];
  let total = 0;

  for (let i = 0; i < stringI.length; i++) {
    let lineArr = [];
    let carry = 0;
    let numI = Number(stringI[i]);

    for (let j = 0; j < stringJ.length; j++) {
      let numJ = Number(stringJ[j]);

      lineArr.push((numI * numJ + carry) % 10);
      carry = (numI * numJ - ((numI * numJ) % 10)) / 10;
    }

    addNum(arr, lineArr, i);
  }

  for (let subArr of arr) {
    let tempStr = "";
    for (let digit of subArr) {
      tempStr += digit;
    }
    total += Number(tempStr);
    tempStr = "";
  }

  return total;
}
// console.log(multiplyNumbers(9, 456));
// FIX THIS (2,465)
// make input strings

// SIMP OLYMPICS ///////////////////////////////////////
////////////////////////////////////////////////////////

/*
1. listen (I don't know what to write for this part)

2. clarify the question: a row of men each have a rating assigned to them which correlates (not specifies) to the number of BJs they receive. The exact number of BJs does not matter, but if one simp has a higher rating than the simp next to him, the simp with the higher rating must receive more BJs than the simp next to him with the lower rating. I am to specifiy how many BJs each guy receives while following the aforementioned rules. In short, for all adjacent simps, higher rating must have more BJs and lower rating must have lower BJs. Minimum of 1 BJ per simp. Adjacent simps with the same rating don't have to have the same number of BJs, but must follow the other rules

**Clarified the question, must keep BJs to a minimum 

for example:
[1,2,3,4,5] = [1,2,3,4,5] 
[5,5,5,5,5] = [1,1,1,1,1] 
[10,1,10,1,10] = [2,1,2,1,2]

3. function signature assuming array
function simpOlympics(arr) {
  //operations
  // return an array with associated number of BJs
  return arr;
}
*/

// 4. brute force. returning the same array works so I'm waiting to do this one until we talk so I can get some clarification on the problem

function simpOlympics(arr) {
  // row of sticky notes each labeled 1 -10

  // 1. find minumum value
  let min = Infinity;
  for (let item of arr) {
    if (item < min) min = item;
  }

  // 2. if min > 1, subtract 1 to get the difference
  let difference = min > 1 ? min - 1 : 0;
  // 3. subtract the answer from previous step from all numbers to remove bottom space
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] - difference;
    console.log(min);
  }

  let changesMade;
  while (changesMade) {
    changesMade = false;

    for (let i = 0; i < arr.length; i++) {
      let prev = arr[i - 1];
      let current = arr[i];
      let next = arr[i + 1];
    }
  }

  return arr;
}

let rowOfSimps = [10, 10, 10, 10, 1, 10];
console.log(simpOlympics(rowOfSimps));

// 5. improve current solution.

// 6. implemet

// RECESS GAME /////////////////////////////////////////
////////////////////////////////////////////////////////

/*
1. listen 👂

2. clarify the question: circle of numbers 1-10, starting at a specified number. I must traverse the circle clockwise the number of increments equal to the starting number, then take the number I land on and do it again. repeat. if it's possible to land on the original number again I win, if not, I lose. 

I would have to clarify on the type of input. I could see this being done with lists or arrays 

for example, with sticky notes:
3 > 2 > 1 > (back to beginning). if i start on 2 I'll go to 3, then 3, then 3...so I would lose
2 > 1 > 1 > (back to beginning). if I start at the second "1" I would go to 2, then back to the original "1", so I would win. 

3. functional signature
function recessGame(head of list or array index){
  // operations
  // return true or false
}
 */

// 4. brute force
function recessGame(head) {
  // circle of sticky notes with number 1 - 10
  // 1.make note of starting note and its number
  let startingNode = head;
  let map = new Map();

  while (head) {
    let numMoves = head.data;

    // 2.increment along the notes clockwise the number of times from the starting note
    for (let i = 0; i < numMoves; i++) {
      head = head.next;
      if (map.has(head)) return false;
      map.set(head, true);
    }

    // 3.look at the next number on the note you land on
    // 4. if you landed on the start you win, if not you lose when you get to the end
    if (head === startingNode) return true;
  }
  // 5. repeat 2 - 4 until you get back to the beginning
}

// 5. improve. Previous solution time is O(n) because I look at each node one time. Space is also n (technically n - 1 I think) because I store every value as I go. I don't think the time can be sped up because I will still need to traverse each item one at a time until I get back to the beginning, but I could maybe improve the space requirement by not storing all of the values? I could loop through once until I find the beginning again and count the number of nodes as I go. Then I could loop a second time following the jumps and compare the number of nodes as I go. This would require more time

// 6. implement
function recessGame2(head) {
  // loop through to see how many nodes
  let firstNode = head;
  let numNodes = 1;

  head = head.next;
  while (head !== firstNode) {
    head = head.next;
    numNodes++;
  }
  // console.log(counter, head.data);

  // loop though again following jumps
  let count = 0;
  let current = firstNode;

  // only while we haven't exceeded the counter
  while (count <= numNodes) {
    let numMoves = current.data;

    for (let i = 0; i < numMoves; i++) {
      current = current.next;
      count++;
    }

    // if num of moves === counter it works, if its > counter we went over
    if (count === numNodes) return true;
  }

  return false;
}
// okay so the time is n + n or O(n) and the space is now O(1)

// 7. test! I played around with the numbers below a bunch
// let node1 = new SinglyLinkedNode(1);
// let node2 = new SinglyLinkedNode(4);
// let node3 = new SinglyLinkedNode(1);
// let node4 = new SinglyLinkedNode(2);
// node1.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node1;

// console.log(recessGame(node1));
// console.log(recessGame2(node1));

// version that doesn't work, ignore. wanted for reference
// function simpOlympics(arr) {
//   // row of sticky notes labeled 1-10
//   // 1.look though and see how many different numbers there are
//   let map = new Map();
//   for (let i = 0; i < arr.length; i++) {
//     let current = arr[i];
//     map.set(current, true);
//   }

//   // 2.this is how many numbers counting up from 1 there will be
//   let uniqueNumbers = map.size;

//   // 3.make the highest number 1, ties allowed
//   // 4.make the second lowest 2, ties allowed
//   // 5.repeat
//   // for the code I'm changing this to start high and work my way down
//   let newArr = [];
//   while (uniqueNumbers > 0) {
//     let max = -Infinity;
//     // find highest number
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i] > max) {
//         max = arr[i];
//       }
//     }
//     console.log("max:", max, "uniqueNumbers:", uniqueNumbers);
//     // loop to find all numbers === max
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i] === max) {
//         // remove the number
//         arr[i] = null;
//         // set current index to the current uniqueNumbers in newArr
//         newArr[i] = uniqueNumbers;
//       }
//     }

//     // decrement uniqueNumbers
//     uniqueNumbers--;
//   }

//   return newArr;
// }
