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
      wallHeight = height[i];
      tempTotal = 0;
      i = wallIndex;
    }
  }
  return totalWater;
}

// console.log(trappingRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
// console.log(trappingRainWater([4, 2, 0, 3, 2, 5]));
// console.log(trappingRainWater([4, 2, 3]));

// have a solution that works on both of the leet example cases right now, about 4min left. Fails some other tests though. Failed [4,2,3], I see why. Lame.

function trappingRainWater2(height) {
  // trim off the end if it's descending
  let currentIndex = height.length - 1;
  while (height[currentIndex] < height[currentIndex - 1]) {
    height.pop();
    currentIndex--;
  }

  // then do same things
  let wallHeight = 0;
  let totalWater = 0;
  let tempTotal = 0;
  let wallIndex;

  for (let i = 0; i < height.length; i++) {
    if (height[i] >= wallHeight) {
      wallHeight = height[i];
      totalWater += tempTotal;
      tempTotal = 0;
      wallIndex = i;
    }

    if (height[i] < wallHeight) {
      tempTotal += wallHeight - height[i];
    }

    if (i === height.length - 1 && height[i] < wallHeight) {
      wallHeight = height[i];
      tempTotal = 0;
      i = wallIndex;
    }
  }
  return totalWater;
}

// console.log(trappingRainWater2([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
// console.log(trappingRainWater2([4, 2, 0, 3, 2, 5]));
// console.log(trappingRainWater2([4, 2, 3]));
// console.log(trappingRainWater2([4, 9, 4, 5, 3, 2]));
// console.log(trappingRainWater2([9, 6, 8, 8, 5, 6, 3]));

// okay have spent too long and asked chatGPT. It says to use 2 pointers. I thought of using two pointers, but with my previous solution just working in two ways at once. After running through it in my head I disregarded the idea

function chatGptIsALittleBitch(height) {
  let left = 0;
  let maxLeft = 0;
  let right = height.length - 1;
  let maxRight = 0;
  let trappedWater = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= maxLeft) {
        maxLeft = height[left];
      } else {
        trappedWater += maxLeft - height[left];
      }
      left++;
    } else {
      if (height[right] >= maxRight) {
        maxRight = height[right];
      } else {
        trappedWater += maxRight - height[right];
      }
      right--;
    }
  }
  return trappedWater;
}

// console.log("should be: 6");
// console.log(chatGptIsALittleBitch([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
// console.log("should be: 9");
// console.log(chatGptIsALittleBitch([4, 2, 0, 3, 2, 5]));
// console.log("should be: 1");
// console.log(chatGptIsALittleBitch([4, 2, 3]));
// console.log("should be: 1");
// console.log(chatGptIsALittleBitch([4, 9, 4, 5, 3, 2]));
// console.log("should be: 3");
// console.log(chatGptIsALittleBitch([9, 6, 8, 8, 5, 6, 3]));

// time complexity is n since it looks at everything (half from left and half from right), space is constant plus the input
