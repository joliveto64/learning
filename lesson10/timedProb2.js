// https://leetcode.com/problems/trapping-rain-water/?envType=study-plan-v2&envId=top-interview-150
// this is a hard one!!!!!

// 1. listen
// 2. clarify. given an array representing height in whole numbers, I'm calculating how many squares of space in the gaps (where water could be held). return a number
// example: [1,0,1] = 1
// example: [1,0,2,4,2,1] = 1
// example: [2,1,0,1,2] = 3

// 3. function signature
// function trappingRainWater(height){
// return number
// }
// 4. brute force
function trappingRainWater(height) {
  // look at numbers 1 at a time
  let wallHeight = 0;
  let wallIndex = 0;
  let totalWater = 0;
  let tempTotal = 0;

  for (let i = 0; i < height.length; i++) {
    //   if you encounter num >= to num from before, add the empty space
    if (height[i] >= wallHeight) {
      wallHeight = height[i];
      wallIndex = i;
      totalWater += tempTotal;
      tempTotal = 0;
    }

    // take number and subtract subsequent nums to calc empty space
    if (height[i] < wallHeight) {
      tempTotal += wallHeight - height[i];
    }

    // unplanned addition to handle bug
    if (i === height.length - 1 && height[i] < wallHeight) {
      wallHeight = 0;
      tempTotal = 0;
      i = wallIndex;
    }
  }
  return totalWater;
}

console.log(trappingRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
console.log(trappingRainWater([4, 2, 0, 3, 2, 5]));

// have a solution that works on both of the leet example cases right now, about 4min left. Took me a little bit to figure out how to add 34-38 to fix a bug. I had to account for the loop ending before it found another wall that was >= to the previous highest wall. This stops it from adding water it couldn't actually collect by resetting the index to +1 after previous wall and resetting the wall height and tempWater

// time complexity is n + k where k is equal to the space between the current highest wall and the end of the array. Worst case scenario is highest wall at index 1, then looping until the end because it will, at the end, reset to index 2 and do it all over again. In other words, worst case should be n + (n - 1). Space is the input size n plus O(1) for the constant space variables

// I think there's probably a clever two-pointer solution which would be faster where you'd do the same thing but from boths sides at the same time, then handle what happens when the pointers intersect or pass each other
