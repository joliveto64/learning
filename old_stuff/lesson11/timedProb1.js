// https://leetcode.com/problems/reverse-words-in-a-string/?envType=study-plan-v2&envId=top-interview-150

// 1. listen
// 2. clarify. I am to take a string input and reverse the order of the words with single spaces between words
// example: "hello world" > "world hello"
// 3. function signature
// function reverseWords(inputString){
// return string
// }

// 4. brute force
function reverseWords(inputString) {
  // create new array of words by trimming and splitting the string: [hello, world]
  let wordsArray = inputString.trim().split(" ");
  console.log(wordsArray);
  // loop over backwards and add to new string + " " ("world hello")
  let reversedWordsString = "";
  for (let i = wordsArray.length - 1; i >= 0; i--) {
    //   ---skip spaces
    if (wordsArray[i] !== "") {
      console.log(wordsArray[i] === "");
      if (i === 0) {
        reversedWordsString += wordsArray[i];
      } else {
        reversedWordsString += wordsArray[i] + " ";
      }
    }
  }

  return reversedWordsString;
}
// passing my test and the two leet examples correctly. 29min left. current solution is time complexity is whatever trim and split need (both n apparently) plus looping over the array of words. so 2n + k where k is length of the array. Space is input + the array length k, plus the returned string worst case length of n. so n + k.

// 5. improve. To improve this, I could loop, then add letters to a new string, ignoring spaces. This could reduce the need for trim, split and the array. Didn't get the improvement in time. Almost done, having issue where last word isn't being added.

// 6. implement

function reverseWords2(inputString) {
  // look at each letter
  let reversedString = "";
  let currentWord = "";
  for (let i = 0; i < inputString.length; i++) {
    // --if letter !== " ", add to current word variable
    if (inputString[i] !== " ") {
      currentWord += inputString[i];
    } else if (inputString[i] === " " && currentWord.length > 0) {
      // -- if " ", add current word to beginning of string, reset current word to ""
      if (reversedString.length < 1) {
        reversedString += currentWord;
        currentWord = "";
      } else {
        reversedString = currentWord + " " + reversedString;
        currentWord = "";
      }
    }

    // had to add this during to fix bug
    if (i === inputString.length - 1 && currentWord.length > 0) {
      console.log(currentWord);

      if (reversedString.length < 1) {
        reversedString += currentWord;
      } else {
        reversedString = currentWord + " " + reversedString;
      }
    }
    // repeat
  }

  return reversedString;
}

// this version is O(n) where each letter is looked at only once. Space is n - the spaces for the returned string + the current word. Tested on leetcode, went from 5th percentile in both time and space to 50th percentile in time and 20th in space. Must not be ideal, but it's much better overall.

// // 7. test
// console.log(reverseWords("the sky is blue"));
// console.log(reverseWords("hello  world"));
// console.log(reverseWords("a good   example"));

// console.log(reverseWords2("the sky is blue"));
// console.log(reverseWords2(" hello  world "));
// console.log(reverseWords2("a good   example"));
// console.log(reverseWords2("apples"));
