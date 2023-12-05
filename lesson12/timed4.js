// https://leetcode.com/problems/valid-anagram/?envType=study-plan-v2&envId=top-interview-150

// 1. listen
// 2. clarify. take two strings as input, return true if the second is an anagram of the first, false if it is not.
// ex: "cat", "tac" > true
// ex: "cat", "rat" > false

// 3. function sig
// function isAnagram(string, target){
// operations
// return true or false
// }

// 4. brute
function isAnagram(string, target) {
  if (string.length !== target.length) return false;

  let chars = new Map();
  // loop over string, putting chars into map
  for (let i = 0; i < string.length; i++) {
    // ---if it is, count-- to prevent chars being used twice if count <= 0
    if (chars.has(string[i])) {
      chars.set(string[i], chars.get(string[i]) + 1);
    } else if (!chars.has(string[i])) {
      chars.set(string[i], 1);
    }
  }

  // loop over target, checking if each char is in the map
  for (let i = 0; i < target.length; i++) {
    // ---if not, return false
    if (!chars.has(target[i]) || chars.get(target[i]) < 1) {
      return false;
    } else {
      chars.set(target[i], chars.get(target[i]) - 1);
    }
  }
  //   return true if function makes it to the end
  return true;
}

// console.log(isAnagram("anagram", "nagaram"));
// console.log(isAnagram("rat", "car"));
// console.log(isAnagram("ab", "a"));
// console.log(isAnagram("aacc", "ccac"));
// console.log("//////////");

// 35min left / 60. Ran into a bug which was the same thing as we talked about, had the steps and logic correct, typed the code wrong. But I got it on my own. passes all leet tests.

// 5. improve. Current solution is 2n (loops over a thing and another thing that has to be the same length), or O(n). Space is input + n to store the map of the chars. I could reduce the space by doing tons of looping, which would not be a good trade off. I might be able to do it in O(n) instead of 2n.

// 6. implement
function isAnagram2(string, target) {
  if (string.length !== target.length) return false;
  let map = new Map();

  for (let i = 0; i < string.length; i++) {
    if (!map.has(string[i])) {
      map.set(string[i], ["str", 1]);
    } else {
      if (map.get(string[i])[0] === "str") {
        map.set(string[i], [map.get(string[i])[0], map.get(string[i])[1] + 1]);
      } else {
        map.set(string[i], [map.get(string[i])[0], map.get(string[i])[1] - 1]);
      }

      if (map.get(string[i])[1] < 1) {
        map.delete(string[i]);
      }
    }

    if (!map.has(target[i])) {
      map.set(target[i], ["tar", 1]);
    } else {
      if (map.get(target[i])[0] === "tar") {
        map.set(target[i], [map.get(target[i])[0], map.get(target[i])[1] + 1]);
      } else {
        map.set(target[i], [map.get(target[i])[0], map.get(target[i])[1] - 1]);
      }

      if (map.get(target[i])[1] < 1) {
        map.delete(target[i]);
      }
    }

    // console.log(map.entries());
  }

  if (map.size > 0) {
    return false;
  } else {
    return true;
  }
}

// well that was a nightmare. But, it works and passes all tests and only loops once now. Intersetingly, it's slower that the one that loops twice....and uses more memory! So, not an optimization at all lol. This is something we should chat about, on paper it's O(n) instead of O(2n), although I get they both reduce to n.

// 7. test
console.log(isAnagram2("anagram", "nagaram"));
console.log(isAnagram2("rat", "car"));
console.log(isAnagram2("ab", "a"));
console.log(isAnagram2("aacc", "ccac"));
console.log(isAnagram2("aa", "bb"));
