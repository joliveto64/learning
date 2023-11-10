// RANSOM NOTE 2 ///////////////////////////////////////
////////////////////////////////////////////////////////
let magazine2 = ["a", "b", "c", "c", "x", "x"];
let letter2 = ["a", "x", "c", "c", "z"];

function ransomNote2(magazine, letter) {
  if (!magazine || !letter || magazine.length < 1 || letter.length < 1) {
    return undefined;
  }

  let map = new Map();
  for (let i = 0; i < magazine.length; i++) {
    if (map.has(magazine[i])) {
      map.set(magazine[i], map.get(magazine[i]) + 1);
    } else {
      map.set(magazine[i], 1);
    }
  }

  for (let i = 0; i < letter.length; i++) {
    // changed this to say if not > 0
    if (!map.get(letter[i]) > 0) {
      return false;
    } else {
      // this can stay the same, though I could add code to make it stop decrememting
      map.set(letter[i], map.get(letter[i]) - 1);
    }
  }
  return true;
}
// console.log(ransomNote2(magazine2, letter2));

// MULTIPLY NUMS ///////////////////////////////////////
////////////////////////////////////////////////////////
function addNum(arr, newNum, itt) {
  newNum = newNum.reverse();
  for (let i = 0; i < itt; i++) {
    newNum.push(0);
  }
  arr.push(newNum);
}

function multiplyNumbers(numJ, numI) {
  let stringJ = numJ.toString().split("").reverse();
  let stringI = numI.toString().split("").reverse();
  let arr = [];
  let total = 0;

  for (let i = 0; i < stringI.length; i++) {
    let lineArr = [];
    let carry = 0;
    let numI = Number(stringI[i]);

    for (let j = 0; j < stringJ.length; j++) {
      let numJ = Number(stringJ[j]);

      lineArr.push((numI * numJ + carry) % 10);
      carry = (numI * numJ - ((numI * numJ) % 10)) / 10;
    }

    addNum(arr, lineArr, i);
  }

  for (let subArr of arr) {
    let tempStr = "";
    for (let digit of subArr) {
      tempStr += digit;
    }
    total += Number(tempStr);
    tempStr = "";
  }

  return total;
}
// console.log(multiplyNumbers(123, 456));
