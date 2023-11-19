// non-code instructions:
// 1. look through letters one at a time, keep count from 1 as you go
// 2. remember starting point
// 3. if you see a letter you've seen before, if your count is bigger than it was before, the longest unique segment is from the starting point to 1 before the current letter
// -----remember this segment as the new longest
// 4. -----move up the starting point 1 letter at a time until you hit the repeat letter from step 3, then go 1 past
// 5. -----this is the new starting point
// 6. -----count is back to 1, remember the old highest count you had
// 7. -----only letter seen is the current one
// 8. continue to look through one at a time from this spot
// repeat this process

function longLines(inputArray) {
  // make lower-case
  for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = inputArray[i].toLowerCase();
  }
  // make list of allowed letters
  const charsAllowed = new Map();
  for (let i = 0; i < 26; i++) {
    let letter = String.fromCharCode(97 + i);
    charsAllowed.set(letter, true);
  }
  // make list of letters seen before
  let charsSeen = new Map();
  // remember starting point
  let startingIndex = 0;
  // remember count
  let count = 0;
  // remember highest count
  let highestCount = 0;
  // remember longest segment
  let longestSegment;

  // 1. look through 1 at a time
  for (let i = startingIndex; i < inputArray.length; i++) {
    console.log(inputArray[i], count);
    let current = inputArray[i];
    // 3. if you see a letter you've seen before, if your count is bigger than it was before, the longest unique segment is from the starting point to 1 before the current letter.
    if (
      charsAllowed.has(inputArray[i]) &&
      charsSeen.has(inputArray[i]) &&
      count > highestCount
    ) {
      // remember this segment as the new longest
      longestSegment = inputArray.slice(startingIndex, i);
      // remember the old highest count you had
      highestCount = count;
      //   reset count
      count = 0;
      //   this is the new starting point
      startingIndex = charsSeen.get(current) + 1;
      i = charsSeen.get(current);
      //   reset chars seen
      charsSeen.clear();
    }

    if (charsAllowed.has(inputArray[i]) && !charsSeen.has(inputArray[i])) {
      count++;
      charsSeen.set(inputArray[i], i);
    }
  }

  if (count > highestCount) {
    longestSegment = inputArray.slice(startingIndex, inputArray.length);
  }

  console.log(count, highestCount);
  return longestSegment;
}

// need to advance starting point to first "c" instead of 2nd
// console.log(longLines(["a", "B", "c", "d", "e", "f", "c", "z", "x", "v"]));
