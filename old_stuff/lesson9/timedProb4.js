// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/?envType=study-plan-v2&envId=top-interview-150

// 1. listen
// 2. clarify. given a string and a substring, I need to return the index where the substring first appears in the string.
// example: input = "poppins", "pop"
// answer = 0
// example: input = "poppins", "in"
// answer = 4

// 3. function signature
// function needleInHaystack(haystack, needle){
//     return number
// }

// 4. brute force.
function needleInHaystack(haystack, needle) {
  let firstIndex = -1;
  let counter = 0;
  // look through haystack
  let j = 0;
  for (let i = 0; i < haystack.length; i++) {
    // compare each letter to first letter in needle
    if (haystack[i] === needle[j]) {
      // if first letter matches, remember index
      firstIndex = i;
      // start counter/inc by 1
      counter++;
      j++;
      // if mismatch before counter === needle length, reset index to -1 and counter to 0
    } else {
      counter = 0;
      j = 0;
      firstIndex = -1;
    }
    // if counter === needle.length, return the saved index
    if (counter === needle.length) return firstIndex - (needle.length - 1);
    // repeat
  }
  return firstIndex;
}

// 26min left right here, the 2 leetcode test cases above are working.
// 5. improve solution. My current solution loops through the haystack 1 time, ending early if it finds a match before the end. This makes worst case scenario n. You have to look at all letters until you find the first substring, so this is necessary. The only thing I can think to change would be to not store the "firstIndex" and just calculate it at line 36 if needed and return -1 at 39 if no matches found. Saves storing 1 variable which isn't really a big deal, but might also improve readability which is worthwhile.

// 6. implement juicy improvements
function needleInHaystack2(haystack, needle) {
  let counter = 0;
  let j = 0;
  let repeat = false;
  let skippedIndex;
  // look through haystack
  for (let i = 0; i < haystack.length; i++) {
    // compare each letter to first letter in needle
    if (haystack[i] === needle[j]) {
      if (haystack[i] === needle[0]) {
        repeat = true;
        skippedIndex = i;
      }
      // if first letter matches, remember index
      // start counter/inc by 1
      counter++;
      j++;
      // if mismatch before counter === needle length, reset index to -1 and counter to 0
    } else {
      if (repeat) {
        i = skippedIndex - 1;
        counter = 0;
        j = 0;
        repeat = false;
      }
      counter = 0;
      j = 0;
    }
    // if counter === needle.length, return the saved index
    if (counter === needle.length) return i - (needle.length - 1);
    // repeat
  }
  return -1;
}

// 7. test!
// console.log(needleInHaystack2("sadbutsad", "sad"));
// console.log(needleInHaystack2("mississippi", "issip"));

// 19min left. went and checked in leetcode and there were problems, passed the initial cases but fails some later ones. "mississippi" and "issip" failed. Updated the problem and now it gets the right answer, 6min left on the clock. Still fails leetcode though it says time limit exceeded, not sure what to do about that. Okay talked to chat GPT and is said my solution is just slow, so I'll try to fix it. Past the timer now. Leetcode is kinda dumb, like sure the solution is bad but just saying failed it retarded. At least let me know if it technically works but is also bad, saying fail without feedback is lame. Elitist whores!
