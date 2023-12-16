// https://leetcode.com/problems/gas-station/?envType=study-plan-v2&envId=top-interview-150

// 1. listen
// 2. clarify: I am given 2 arrays of numbers, 1 is units of gas and the other is cost associated with leaving each station, i. The task is to see if a full circuit can be made from any index starting with 0 gas, then receiving the gas amount at i where you begin.
// example: Gas[2,4,1], Cost[1,2,2] > only index 0 works net = [1,2,-1]

// 3. function signature.
// function gasStations(gasArr, costArr){
// return index || -1
// }

// 4. brute force.
function gasStations(gasArr, costArr) {
  for (let i = 0; i < gasArr.length; i++) {
    let count = 0;
    let gasTank = 0;
    let index = i;

    while (true) {
      if (count === gasArr.length) return index;
      gasTank += gasArr[index] - costArr[index];

      if (gasTank >= 0) {
        index++;
        count++;
        if (index >= gasArr.length) {
          index = 0;
        }
      } else {
        break;
      }
    }
  }
  return -1;
}

// console.log(gasStations([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
// console.log(gasStations([2, 3, 4], [3, 4, 3]));

// failed this one. Seemed easy enough but then I couldn't figure out how to code my original steps. I couldn't figure out if I needed nested for loops, a while loop and a for loop or two while loops...or something else. Basically, iterating over the whole array while each iteration starting one index further and reverting to the beginning once at the end of the array each time was getting me all tangled up. My steps seemed perfectly coherent for an on-paper solution:
// if gas[i] - cost[i] >= 1 go to next
// if not start over from next index
// if at end of array go back to the beginning
// if reaching starting index, return that index
// if last index doesn't work return -1
