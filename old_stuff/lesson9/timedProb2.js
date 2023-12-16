// https://leetcode.com/problems/length-of-last-word/?envType=study-plan-v2&envId=top-interview-150

// 1. listen
// 2. clarify. I am given a string that has words and spaces, mut return the length of the final word.
// example: hello world
// answer = 5 (world)

// 3. function signature:
// function lengthLastWord(string) {
//   // return number
// }

// 4. brute force
function lengthLastWord(string) {
  // ignore spaces beginning and end
  let words = string.trim();
  // look through the string 1 at a time
  let counter = 0;
  for (let i = 0; i < words.length; i++) {
    let current = words[i];
    // if current is letter (or first index), start counter
    if (current !== " ") {
      counter++;
      // reset counter if hit a space
    } else {
      counter = 0;
    }
  }
  //   return counter
  return counter;
}

// console.log(lengthLastWord("     hello world "));
// console.log(lengthLastWord("   fly me   to   the moon  "));
// console.log(lengthLastWord("luffy is still joyboy"));

// time remaining 32min
// 5. improve solution. current solution I remove the spaces from the beginning and the end, then loop through looking at each character or space 1 time each for a length of n. I can improve the length of this by looping backwards instead until the first space.

// 6. implement
function lengthLastWord2(string) {
  // ignore spaces beginning and end
  let words = string.trim();
  // look through the string 1 at a time
  let counter = 0;
  for (let i = words.length - 1; i >= 0; i--) {
    let current = words[i];
    // start counter
    if (current !== " ") {
      counter++;
    } else {
      // return counter if hit a space
      return counter;
    }
  }
  return counter;
}

// test!
// console.log(lengthLastWord2("     hello world "));
// console.log(lengthLastWord2("   fly me   to   the moon  "));
// console.log(lengthLastWord2("luffy is still joyboy"));

// all three test cases from leet check out in here
// time remaining 28min
