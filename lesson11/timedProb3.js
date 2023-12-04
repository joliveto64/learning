// https://leetcode.com/problems/zigzag-conversion/?envType=study-plan-v2&envId=top-interview-150

// 1. listen
// 2. clarify. Take a string that's displayed in a zigzag and print out the characters by row.
// example: h  o (3 rows)
//          e l
//          l
// output: hoell
// 3. function sig
// function covertZigZag(string, numRows){
// return string
// }

// 4. brute force
function covertZigZag(string, numRows) {
  let lines = {};

  for (let i = 1; i <= numRows; i++) {
    lines[i] = [];
  }

  let count = 1;
  let decrement = false;
  // look through letters
  for (let i = 0; i < string.length; i++) {
    // the count dictates which line the letter appears on for the final string
    // lines[i].push(string[i]);
    lines[count].push(string[i]);
    console.log(count);

    // count up from 1 to numRows, then back down to 1 (1,2,3,2,1)
    if (count === numRows) {
      decrement = true;
    }
    if (count === 1) {
      decrement = false;
    }

    decrement ? count-- : count++;
  }

  //   got to this point when the timer went off. I basically had it but couldnt get it to loop through the object of arrays properly.
  let convertedString = "";
  for (let array in lines) {
    // i thought you could say "for (let letter of array) 🫠"
    for (let letter of lines[array]) {
      convertedString += letter;
    }
  }

  // return the string
  return convertedString;
}

// 5. improve
// 6. implement
// 7. test

// console.log(covertZigZag("hello", 3));
console.log(covertZigZag("PAYPALISHIRING", 4));
console.log(covertZigZag("PAYPALISHIRING", 3));
console.log(covertZigZag("a", 1));

// Okay so for this problem I got it. I spent the last 10 whole minutes not realizing that you can't say for (let letter of array) vs for (letter letter of object(array)). Other than that is was good.

// time complexity: is n to loop through and look at each letter to decide where to put it in the object which is O(1) time. Then n again to loop through the object of arrays and make the final string. So n + n or n

// space complexity: lines obj is k (equal to numRows), count and decrement are O(1) and the final string is length n of the input size. so input plus n + k
