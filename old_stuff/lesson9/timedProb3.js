// https://leetcode.com/problems/longest-common-prefix/?envType=study-plan-v2&envId=top-interview-150

// 1. listen
// 2. clarify. given array of string, return longest common prefix from all of them. So must start from the first index if string
// example: cat, catapilar = cat
// example: apple, appreciate = app

// 3. function signature
// function longestCommonPrefix(array){
// return prefix (string) or "" if there is none
// }

// 4. brute force
function longestCommonPrefix(array) {
  // longest = arr[0]
  let test = array[0];
  let longest = "";
  let currentString = "";
  // look through array
  for (let i = 1; i < array.length; i++) {
    // for each in array, look through each letter
    for (let j = 0; j < array[i].length; j++) {
      let char = array[i][j];
      // for each subsequent string, verify that each letter matches same index of longest
      if (char === test[j]) {
        // if yes, add to current string
        currentString += char;
        // console.log(currentString);
        // if no, longest = current string
      }
    }
    longest = currentString;
    currentString = "";
  }
  // return longest
  return longest;
}

// console.log(longestCommonPrefix(["flower", "flow", "flight"]));
// console.log(longestCommonPrefix(["dog", "racecar", "car"]));

// Okay I'm just under an hour right now, ran into a couple issues I couldn't figure out. I didn't understand the console errors. Maybe could have been different if a person was here to give a hint. Wouldn't have been using the console anyway! Ran into an issue trying to use splice on a string which I can't do. Oops.

// 5. improve. In my current solution I am looking through each word in the array, then for each word I am looking through each letter. I definitely need to look at each word, but I could cut off the loop when a character doesn't match to save on some time. Also to save space I could do the whole thing incrementing a counter then just return the 1st item up to that many characters. This would save space and time. Current time is n*k where n is length of the array and k is length of each word. Space is unput plus 3 variables

function longestCommonPrefix2(array) {
  // longest = arr[0]
  let test = array[0];
  let longestCount = array[0].length;
  let currentCount = 0;

  // look through array
  for (let i = 1; i < array.length; i++) {
    // for each in array, look through each letter
    for (let j = 0; j < array[i].length; j++) {
      let char = array[i][j];
      // for each subsequent string, verify that each letter matches same index of longest
      if (char === test[j]) {
        // if yes, add to current string
        currentCount++;
        // console.log(currentString);
        // if no, longest = current string
      } else {
        break;
      }
    }
    if (longestCount > currentCount) longestCount = currentCount;
    currentCount = 0;
  }
  // return longest

  let prefix = "";
  for (let i = 0; i < longestCount; i++) {
    prefix += test[i];
  }

  return prefix;
}

// 7. test!
// console.log(longestCommonPrefix2(["flower", "flow", "flight"]));
// console.log(longestCommonPrefix2(["dog", "racecar", "car"]));

// all together took 1.5hr. Final solution is faster because I break out of the inner loop if I hit a non-match. Also saves on space because storing numbers should be less space than strings, potentially.
