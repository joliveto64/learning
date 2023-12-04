// https://leetcode.com/problems/product-of-array-except-self/?envType=study-plan-v2&envId=top-interview-150

// 1. listen
// 2. clarify. Given an array of nums, I must return an array where array[i] is replaced by the product of all nums in the array except for the 1 at array[i].
// example: [1,2,3] = [6,3,2]
// example: [1,1,1] = [1,1,1]

// 3. function signature:
// function productExceptSelf(array){
// return array
// }

// 4. brute force.
function productExceptSelf(inputArray) {
  // remember current index
  let currentIndex = 0;
  let product = 1;
  let productArray = [];
  // while prodArray length !== array length
  while (productArray.length < inputArray.length) {
    // loop over array, keeping product of all nums
    for (let i = 0; i < inputArray.length; i++) {
      // if i === current index, skip that one
      if (i !== currentIndex) {
        product *= inputArray[i];
      }
    }
    // push product to newArr at current index after current loop
    productArray.push(product === 0 ? Math.abs(product) : product);
    // repeat loop & inc current index, prod = 1
    currentIndex++;
    product = 1;
  }
  return productArray;
}

// console.log(productExceptSelf([1, 2, 3, 4]));
// console.log(productExceptSelf([-1, 1, 0, -3, 3]));

// at 23min left. little big where it's printing out -0, otherwise looks good for naive solution. Just randomly remembered math.abs.

// 5. improve solution. This loops a bunch of times, so I know it's slow (it's n^2). Initial thought to improve is to use a map, but not sure how if that's correct just yet. Can't think of anything with the map, but I think I can find the product by looping once, then loop though it again and push the product divided by inputArray[i]
function productExceptSelf2(inputArray) {
  let product = 1;
  let productArray = [];

  for (let i = 0; i < inputArray.length; i++) {
    product *= inputArray[i];
  }

  for (let i = 0; i < inputArray.length; i++) {
    productArray.push(product / inputArray[i]);
  }

  return productArray;
}

// 7. test!
// console.log(productExceptSelf2([1, 2, 3, 4]));
// console.log(productExceptSelf2([-1, 1, 0, -3, 3]));

// okay cool that looks like it works. Definitely faster, have 8mins left right now. Now it's n + n which simplifies to n for time complexity! Oops it doesn't work...lol I'm past time now but gonna try to fix it, I think I have the right general idea. Oh man these 0s are so annoying to deal with in this case

function productExceptSelf3(inputArray) {
  let product = 1;
  let productArray = [];
  let numZeros = 0;

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] !== 0) {
      product *= inputArray[i];
    } else {
      numZeros++;
    }
  }

  for (let i = 0; i < inputArray.length; i++) {
    if (numZeros === 0) {
      productArray.push(product / inputArray[i]);
    }

    if (inputArray[i] === 0 && numZeros === 1) {
      productArray.push(product);
    }

    if (inputArray[i] !== 0 && numZeros === 1) {
      productArray.push(0);
    }

    if (numZeros > 1) {
      productArray.push(0);
    }
  }

  return productArray;
}

// console.log(productExceptSelf3([1, 2, 3, 4]));
// console.log(productExceptSelf3([-1, 1, 0, -3, 3]));

// okay this ended up being more dumb than I thought whatever I got it
