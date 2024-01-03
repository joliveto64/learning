//  https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/?envType=study-plan-v2&envId=top-interview-150

/*
1. listen
2. clarify. I am to take a numbers array and a target number, then find two nums in the array that add up to the target. Then, I am to return an array of the indices of the two num each +1 to make them 1 indexed instead of 0 indexed. 
example: [1,2,3], 5 > [2,3]

3. function sig
function twoSum(numsArray, target){
    // operations
    return array
}
 */

// 4. brute force
function twoSum(numsArray, target) {
  // start with first num
  let firstIndex = 0;
  // look through rest of nums, adding each to num to see if it === target
  while (firstIndex <= numsArray.length - 1) {
    for (let i = firstIndex + 1; i < numsArray.length; i++) {
      // ---if found, return [index +1, index2 +1]
      if (numsArray[firstIndex] + numsArray[i] === target) {
        return [firstIndex + 1, i + 1];
      }
    }
    // if not, increase index to second, then repeat process again
    firstIndex++;
  }
  return false;
}

// passing all three example cases on leet. at 47min left / 60. Passed all test cases also. So time is probably not great. worst case if it's the last two nums I loop through n-2 times. Basically n, then each loop is n-k where k is the current firstIndex. So I could describe it as n-k^n -2? or...n^2 pretty much. If it was the last two nums in the array, I would almost need to loop over the entire thing n times to find it. Space is contant plus the input. Once of the constrains of the problem was to keep the space at constant time, so that's a bit of a hinderance possibly.

// 5. improve
function twoSum2(numsArray, target) {
  let numsMap = new Map();

  for (let i = 0; i < numsArray.length; i++) {
    numsMap.set(numsArray[i], i);
  }

  for (let i = 0; i < numsArray.length; i++) {
    if (
      numsMap.has(target - numsArray[i]) &&
      numsMap.get(target - numsArray[i]) > i
    ) {
      return [i + 1, numsMap.get(target - numsArray[i]) + 1];
    }
  }
  return false;
}

// 6. implement. 28min left // 60, just finished the second solution which is passing the same three cases as the original.

// // 7. test
// console.log(twoSum([2, 7, 11, 15], 9));
// console.log(twoSum([2, 3, 4], 6));
// console.log(twoSum([-1, 0], -1));
// console.log("////////////////////");
// console.log(twoSum2([2, 7, 11, 15], 9));
// console.log(twoSum2([2, 3, 4], 6));
// console.log(twoSum2([-1, 0], -1));
// this case fails, can't figure out why.
// console.log(twoSum2([0, 0, 3, 4], 0));

// had some buggyness that I couldn't figure out and neither could chatGPT. I changed my function and it was right, then I typed the wrong console.log format and kept getting "false", but it was actually fine. So I would have gotten through the second implementation in time actually. 76ms vs 471ms! 45MB vs 43MB before. Pretty good I think
