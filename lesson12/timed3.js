// https://leetcode.com/problems/container-with-most-water/?envType=study-plan-v2&envId=top-interview-150

// 1. listen
// 2. clarify. given an array of nums (height), I am to figure out the most water that can be stored between any two of the nums. water is not stored on top of nums, but between um values.
// ex: [5,1,2,3,1] = 9 (between 5 and 3) 3 for each num passed
// ex: [2,1,1,5,1,5]

// 3. function sig
// function maxWater(heightArray){
// return number
// }

// 4. brute
function maxWater(heightArray) {
  // pointer at each end
  let left = 0;
  let right = heightArray.length - 1;
  let maxWater = 0;

  while (left < right) {
    // calc water between two ppoints
    let water =
      Math.min(heightArray[left], heightArray[right]) * (right - left);

    // --if > maxWater, update it
    if (water > maxWater) maxWater = water;

    // then move the smaller one in
    if (heightArray[left] < heightArray[right]) {
      left++;
    } else {
      right--;
    }
    water = 0;
  }
  //   repeat
  return maxWater;
}

console.log(maxWater([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxWater([1, 1]));

// Beat all test cases on leet! About 29mins left! Good thing we talked about that stpud water problem before! sheeeesh

// 5. improve. This is O(n) since it looks at everything once, stops looping once the pointers positions are equal. Space is O(1) for storing some variables. I don't think I can improve this much. Constant space is really good and I don't see how I can speed up the time because every number needs to be looked at
// 6. implement
// 7. test
