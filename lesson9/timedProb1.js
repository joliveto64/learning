// https://leetcode.com/problems/roman-to-integer/?envType=study-plan-v2&envId=top-interview-150

var romanToInt = function (s) {
  let total = 0;
  let romes = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // look through nums
  for (let i = 0; i < s.length; i++) {
    let amount = 0;
    let current = s[i];
    let prev = s[i - 1];

    // if prev num is i, x, or c you might have to subtract
    if (prev === "I" && (current === "V" || current === "X")) {
      // subrtract prev from current AND subtract previous if needed
      amount = romes[current] - romes[prev] - romes[prev];
    } else if (prev === "X" && (current === "L" || current === "C")) {
      // subrtract prev from current AND subtract previous if needed
      amount = romes[current] - romes[prev] - romes[prev];
    } else if (prev === "C" && (current === "D" || current === "M")) {
      // subrtract prev from current AND subtract previous if needed
      amount = romes[current] - romes[prev] - romes[prev];
    } else {
      amount = romes[current];
    }
    // add adjusted amount
    total += amount;
  }
  // return total
  return total;
};

// 7. test!
// console.log(romanToInt("III"));
// console.log(romanToInt("LVIII"));
// console.log(romanToInt("MCMXCIV"));

// I forgot to do step 3, did not have time improve solution, I went over the 45min timer by less than 1min on this one after making some dumb mistakes and changing stuff. My mistake again was rushing the steps to get to code faster. Will spend more time on steps in next one for sure. For time complexity, it looks through once and adjusts the final number as it goes. I'm using an object to reference the number equivalents so that's O(1). Overall should be O(n). Space is required for the romes object and a few variables which make no signifcant difference. What I could improve is the unnecessary calculations I perform. Since I'm going forward, the way I'm doing it adds some letters like "I", then removes them in the next iteration because it was actually "IV", so not 1 + 5, but 1 - 5. If I were to iterate backwards I could fix that.

var romanToInt2 = function (s) {
  let total = 0;
  let romes = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // look through nums
  for (let i = s.length - 1; i >= 0; i--) {
    let amount = 0;
    let current = s[i];
    let next = s[i - 1];

    // if prev num is i, x, or c you might have to subtract
    if (next === "I" && (current === "V" || current === "X")) {
      // subrtract prev from current AND subtract previous if needed
      amount = romes[current] - romes[next];
      i--;
    } else if (next === "X" && (current === "L" || current === "C")) {
      // subrtract prev from current AND subtract previous if needed
      amount = romes[current] - romes[next];
      i--;
    } else if (next === "C" && (current === "D" || current === "M")) {
      // subrtract prev from current AND subtract previous if needed
      amount = romes[current] - romes[next];
      i--;
    } else {
      amount = romes[current];
    }
    // add adjusted amount
    total += amount;
  }
  // return total
  return total;
};
// this is still n, but removes unnecessary calculations

// console.log(romanToInt2("III"));
// console.log(romanToInt2("LVIII"));
// console.log(romanToInt2("MCMXCIV"));
