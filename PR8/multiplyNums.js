function multiplyNumbers(numJ, numI) {
  // removed toString()
  let stringJ = numJ.split("").reverse();
  let stringI = numI.split("").reverse();
  console.log(stringI);
  let newNumArr = [];
  let carry = 0;

  for (let i = 0; i < stringI.length; i++) {
    let numI = Number(stringI[i]);
    let lineArr = [];

    for (let j = 0; j < stringJ.length; j++) {
      let numJ = Number(stringJ[j]);
      // added some variable names to make this less obnoxious
      let remainder = (numI * numJ + carry) % 10;
      let total = numI * numJ + carry;

      carry = (total - remainder) / 10;
      lineArr.push(remainder);
    }

    // had to add the final carry here!
    // only if there is a carry!
    if (carry > 0) {
      lineArr.push(carry);
    }
    // reset the carry!
    carry = 0;
    addNum(newNumArr, lineArr, i);
  }
  console.log(newNumArr);
  let total = 0;
  for (let subArr of newNumArr) {
    let tempStr = "";
    for (let digit of subArr) {
      tempStr += digit;
    }
    total += Number(tempStr);
    tempStr = "";
  }
  return total;
}

function addNum(newNumArr, lineArr, iteration) {
  lineArr = lineArr.reverse();
  for (let i = 0; i < iteration; i++) {
    lineArr.push(0);
  }
  newNumArr.push(lineArr);
}

// console.log(multiplyNumbers("9", "456"));
