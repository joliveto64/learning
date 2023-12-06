// https://leetcode.com/problems/3sum/?envType=study-plan-v2&envId=top-interview-150

// 1. listen
// 2. clarify. find all triplets that add up to zero and return them in an array of arrays, no duplicate sets, no repeat indices in the same set
// ex: [0,0,0] = [[0,0,0]]
// ex: [-1,-2,2,0] = [[-2,2,0]]
// ex: [-1,1,-1,0,2,-2] = [[-1,1,0], [-2,2,0], [-1,-1,2]]

// 3. function sig
// function threeSum(nums) {
// operations
// return array of array triplets
// }

// 4. brute force
function threeSum(nums) {
  let seen = new Map();
  let triplets = [];

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        let sum = nums[i] + nums[j] + nums[k];

        if (sum === 0) {
          let array = [nums[i], nums[j], nums[k]];
          let key = array.sort().toString();

          if (!seen.has(key)) {
            triplets.push(array);
            seen.set(key, true);
          }
        }
      }
    }
  }
  return triplets;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

// Okay I failed this one. was way off I think. Eventually figured it out with some hints from chatGPT. I was tying to do it without nesting 3 loops because that's obviously bad, but I just couldn't get it
