// https://leetcode.com/problems/is-subsequence/?envType=study-plan-v2&envId=top-interview-150

/*
1. listen
2. clarify. given two string, see if one is found in the other, doesn't have to be subsequent, but does have to be in order
example: cat, chyaygt > true
example: cat, chgfta > false

3. function sig
function subsequence(sub, target){
    return true or false
}
*/

// 4. brute force
function subsequence(sub, target) {
  if (sub === target) return true;
  // start with first letter of sub
  let subIndex = 0;
  let count = 0;
  // look thru target until you find the letter
  for (let i = 0; i < target.length; i++) {
    // ---if you do, switch to second letter and repeat
    if (sub[subIndex] === target[i]) {
      subIndex++;
      count++;
    }
    // ---if make it thru all letters, return true
    if (count >= sub.length) {
      return true;
    }
  }
  // ---if not found, return false
  return false;
}

// at 46min left / 1hr right now, had to change something to pass 1 edge case on leet. Although I call BS because they said constraints were only lowercase english letter then the last test is "" and "" so fuck them leet can suck it.

// 5. improve. I loop through the target once, so the time is n where n is the length of the target in the worst case. I don't want to move into a map or anything because I need to retain order. Also, I need to look at everything to know for sure. I didn't do a nested loop so that's fine. Space is input plus two variables which are O(1). I'm comfortable with this solution, not gonna change it. 43min left.

// 7. test!
// console.log(subsequence("abc", "ahbgdc"));
// console.log(subsequence("axc", "ahbgdc"));
// console.log(subsequence("''", "''"));
