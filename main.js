// 1. reverse a string
function reverseString(str) {
  let newStr = [];

  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return newStr;
}

// console.log(reverseString("Hello dude"));

// 2. find the largest number
function largestNumber(arr) {
  let currentLargest = -100000;

  for (let number of arr) {
    if (number > currentLargest) {
      currentLargest = number;
    }
  }
  return currentLargest;
}

// console.log(largestNumber([3, 5, 8, 6, 9, 0, 3, 1, 2, 5, 6, 12, 5, 9]));

// 3. check if prime number
function isPrimeNumber(num) {
  if (num === 1) {
    return false;
  }
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// console.log(isPrimeNumber(1));

// 4. remove duplicates
function removeDuplicates(arr) {
  // make empty array
  let newArr = [];

  // loop over target array
  for (let i = 0; i < arr.length - 1; i++) {
    if (!newArr.includes(arr[i])) {
      // if new array !include arr[i], push it
      newArr.push(arr[i]);
    }
  }
  // return newArr
  return newArr;
}

// console.log(removeDuplicates([3, 3, 4, 6, 5, 8, 7, 9, 0, 8, 9, 7, 0, 1]));

// 5. check if anagrams
function isAnagram(str1, str2) {
  return sort(str1) === sort(str2);
}

function sort(str) {
  return str.toLowerCase().replace(" ", "").split("").sort().join("").trim();
}

// console.log(isAnagram("New York Times", "Monkeys Write"));

// 6. find the factorial
function factorial(num) {
  let result = num;

  for (let i = num - 1; i > 1; i--) {
    result *= i;
  }
  return result;
}

// console.log(factorial(5));

// 7. sort an array
function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}

// console.log(sortArray([2, 5, 4, 7, 6, 9, 0, 8, 7, 10, 2, 4, 8, 6]));

// 8. create a stack (LIFO - LastInFirstOut)
class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    this.items.pop();
  }

  peek(item) {
    return this.items[this.items.length - 1];
  }

  print() {
    console.log(this.items);
  }
}

// const myStack = new Stack();
// myStack.push(1);
// myStack.push(2);
// myStack.push(3);
// myStack.pop();
// myStack.print();
// console.log(myStack.peek());

// 9. implement a queue (FIFO = FirstInFirstOut)

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    if (this.items.length > 0) this.items.shift();
  }

  peek() {
    console.log(this.items[0]);
  }
}

// const myQueue = new Queue();
// myQueue.enqueue(1);
// myQueue.enqueue(2);
// myQueue.peek();
// myQueue.dequeue();
// myQueue.peek();

// 10. implement binary search

function binarySearch(arr, target) {
  arr.sort((a, b) => a - b);
  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex <= rightIndex) {
    const midIndex = Math.floor((leftIndex + rightIndex) / 2);

    if (arr[midIndex] === target) {
      return midIndex;
    } else if (target < arr[midIndex]) {
      rightIndex = midIndex - 1;
    } else {
      leftIndex = midIndex + 1;
    }
  }
  return "No match";
}

// console.log(binarySearch(array, 6));

// 11. implement bubble sort

function bubbleSort(arr) {
  let keepGoing;
  do {
    keepGoing = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let tempkeyue = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tempkeyue;
        keepGoing = true;
      }
    }
  } while (keepGoing);
  return arr;
}

let array = [1, 5, 4, 7, 6, 8, 9, 0, 3, 2, 4, 6];
// console.log(bubbleSort(array));

// 12. implement quick sort

function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  let leftSplit = [];
  let rightSplit = [];
  let pivotNum = arr.splice(Math.floor(arr.length / 2), 1)[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivotNum) {
      leftSplit.push(arr[i]);
    } else if (arr[i] >= pivotNum) {
      rightSplit.push(arr[i]);
    }
  }

  return [...quickSort(leftSplit), pivotNum, ...quickSort(rightSplit)];
}

// console.log(array.length, quickSort(array));

// 13. merge sort

let array2 = [1, 5, 4, 7, 8, 9, 0, 2, 3, 9, 4, 5, 6, 3, 1, 1];

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let middle = Math.floor(arr.length / 2);
  let leftSide = arr.slice(0, middle);
  let rightSide = arr.slice(middle);

  return merge(mergeSort(leftSide), mergeSort(rightSide));
}

function merge(leftArr, rightArr) {
  let resultArr = [];

  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      resultArr.push(leftArr.shift());
    } else {
      resultArr.push(rightArr.shift());
    }
  }

  return leftArr.length
    ? [...resultArr, ...leftArr]
    : [...resultArr, ...rightArr];
}

// console.log(array2.length, mergeSort(array2));

// 14.  n^2 operation

function nestedLoops(arr) {
  for (let item of arr) {
    for (let sameItem of arr) {
      console.log("Hello");
    }
  }
}

// nestedLoops(array2);
// console.log(array2.length);

// 15. triple nest (n^3)

function cubicNesting(arr) {
  let num = 0;
  for (let outer of arr)
    for (let middle of arr) {
      for (let inner of arr) {
        console.log(++num);
      }
    }
}

// cubicNesting([1, 2, 3]);

// 16. fibonacci (2^n)

function fib(n) {
  if (n <= 1) {
    return n;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}

// console.log(fib(25));

// 17. factorial (n time)

function factorial(num) {
  if (num >= 0 && num < 2) {
    return 1;
  } else {
    return factorial(num - 1) * num;
  }
}

// console.log(factorial(5));

function getPermutations(string) {
  let arr = string.split("");
}

getPermutations("abc");

// implement a hash table

class HashTable {
  constructor() {
    this.tableLength = 10;
    this.table = [];
    for (let i = 0; i <= this.tableLength; i++) {
      this.table[i] = [];
    }
  }

  #hash(key) {
    return key.charCodeAt(0) % this.tableLength;
  }

  set(key, keyue) {
    let bucketIndex = this.#hash(key);
    this.table[bucketIndex].push([key, keyue]);
  }

  get(key) {
    let bucketIndex = this.#hash(key);

    for (let i = 0; i < this.table[bucketIndex].length; i++) {
      if (this.table[bucketIndex][i][0] === key) {
        return this.table[bucketIndex][i][1];
      }
    }
    return "Not found";
  }

  delete(key) {
    let bucketIndex = this.#hash(key);

    for (let i = 0; i < this.table[bucketIndex].length; i++) {
      if (this.table[bucketIndex][i][0] === key) {
        this.table[bucketIndex][i].splice(i, 1);
      }
    }
    return "Not found";
  }
}

let myTable = new HashTable();

// myTable.set("name", "joe");
// console.log(myTable.get("name"));
// myTable.delete("name");
// console.log(myTable.get("name"));

// implement a tree

// class Node {
//   constructor(data) {
//     this.data = data;
//     this.left = null;
//     this.right = null;
//   }
// }

// let root = new Node("root");

// root.left = child1;
// root.right = child2;

// majority elem

// let testArr = [3, 2, 3];

var majorityElement = function (nums) {
  // calculate threshold for majority elem
  const majority = Math.floor(nums.length / 2);
  console.log(majority);
  let numsObject = {};
  // loop over nums and add to object to increment
  for (let i = 0; i < nums.length; i++) {
    console.log(numsObject);
    if (!numsObject[nums[i]]) {
      numsObject[nums[i]] = 1;
    } else {
      numsObject[nums[i]]++;
    }
  }

  for (let key in numsObject) {
    if (numsObject[key] > majority) {
      return key;
    }
  }
};

// console.log(majorityElement(testArr));

// rotate to the right by k

// let testArr = [1, 2];

const rotate = function (nums, k) {
  let adjusted = k > nums.length ? k % nums.length : k;
  console.log(adjusted);

  let splicedNums = nums.splice(-adjusted);
  nums.unshift(...splicedNums);

  return nums;
};

// console.log(rotate(testArr, 3));

// stocks

var maxProfit = function (prices) {
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      maxProfit += prices[i] - prices[i - 1];
    }
  }
  return maxProfit;
};

// console.log(maxProfit(testArr));

// jumps

// h-index

// test = [3, 0, 6, 1, 5];

var hIndex = function (citations) {
  let sorted = citations.sort((a, b) => b - a);
  console.log(sorted);

  for (let i = 0; i < sort.length; i++) {
    if (citations[i] < i) {
      return i;
    }
  }
};

// console.log(hIndex(test));

// randoized set

class RandomSet {
  constructor() {
    this.map = new Map();
    this.arr = [];
  }

  add(key) {
    if (this.map.has(key)) {
      return false;
    } else {
      this.arr.push(key);
      this.map.set(key, this.arr.length - 1);
    }
  }

  remove(key) {
    if (!this.map.has(key)) {
      return false;
    } else {
      let index = this.map.get(key);
      let ReplacementValue = this.arr[this.arr.length - 1];

      this.arr[index] = ReplacementValue;
      this.map.set(ReplacementValue, index);

      this.map.delete(key);
      this.arr.pop();
    }
  }

  getRandom() {
    const randomIndex = Math.floor(Math.random() * this.arr.length);
    console.log(this.arr[randomIndex]);
  }
}

// let mySet = new RandomSet();
// mySet.add(10);
// mySet.add(20);
// mySet.add(30);
// mySet.remove(10);
// mySet.getRandom();

// product of array except self (brute force)

let test = [1, 2, 3, 4];

function productExceptSelf(nums) {
  let newArr = [];

  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] !== nums[i]) {
        product *= nums[j];
      }
    }
    newArr.push(product);
    product = 1;
  }
  return newArr;
}

// console.log(productExceptSelf(test));

// product of array except self O(n)

function productExceptSelfFaster(nums) {
  let obj = {};
  let newArr = [];

  for (let i = 0; i < nums.length; i++) {
    if (!obj[nums[i]]) {
      obj[i] = nums[i];
    }
  }

  for (let i = 0; i < nums.length; i++) {
    console.log(obj[i]);
  }
  console.log(obj);
}

// productExceptSelfFaster(test);

// gas stations

let gas = [1, 2, 3, 4, 5];
let cost = [3, 4, 5, 1, 2];

var canCompleteCircuit = function (gas, cost) {
  // compare arrays
  // generate single value for each position

  let length = gas.length;
  let newArr = [];

  for (let i = 0; i < length; i++) {
    newArr.push([gas[i], gas[i] - cost[i]]);
  }
  console.log(newArr);
};

// canCompleteCircuit(gas, cost);

// caching system (mihai's question)

class LeastRecentlyUsedStorage {
  constructor(maxSize) {
    this.capacity = maxSize;
    this.cache = new Map();
  }

  put(key, value) {
    if (this.cache.size >= this.capacity) {
      let lastUsed = this.cache.keys().next().value;
      this.cache.delete(lastUsed);
    }

    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
  }

  get(key) {
    if (!this.cache.has(key)) return "Not found";

    let value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }
}

let storage = new LeastRecentlyUsedStorage(5);

class leastFrequentlyUsedStorage {
  constructor(maxSize) {
    this.cache = new Map();
    this.capacity = maxSize;
  }

  put(key, value) {
    if (this.cache.size >= this.capacity) {
      let deleteKey = this.#findLeastUsed();
      this.cache.delete(deleteKey);
    }

    this.cache.set(key, { value: value, freq: 1 });
  }

  get(key) {
    if (!this.cache.has(key)) return "Not found";

    this.cache.get(key).freq += 1;

    return this.cache.get(key);
  }

  #findLeastUsed(key) {
    let smallestFreq = Infinity;
    let keyToDelete = null;

    for (let [key, value] of this.cache) {
      if (value.freq < smallestFreq) {
        smallestFreq = value.freq;
        keyToDelete = key;
      }
    }
    console.log("deleting:", keyToDelete);
    return keyToDelete;
  }
}

let storage2 = new leastFrequentlyUsedStorage(3);

class timeToLive {
  constructor() {
    this.cache = new Map();
  }

  put(key, value, timeToLive = 3000) {
    this.cache.set(key, value);

    setTimeout(() => {
      console.log("deleting");
      this.cache.delete(key);
    }, timeToLive);
  }

  get(key) {
    if (!this.cache.has(key)) return "not found";

    return this.cache.get(key);
  }
}

let storage3 = new timeToLive();

// linked lists

const node = class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
};

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(data) {
    this.head = new Node(data, this.head);
  }

  deleteFirst() {
    if (!this.head) {
      return;
    }
    this.head = this.head.next;
  }

  insertLast(data) {
    if (!this.head) {
      this.head = new Node(data);
    }

    let node = this.head;
    while (node) {
      if (!node.next) {
        node.next = new Node(data);
        return;
      }
      node = node.next;
    }
  }

  deleteLast() {
    if (!this.head) {
      return;
    }

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let previous = this.head;
    let current = this.head.next;

    while (current.next) {
      previous = current;
      current = current.next;
    }
    previous.next = null;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    if (!this.head) {
      return null;
    }

    let node = this.head;
    while (node) {
      if (!node.next) {
        return node;
      }
      node = node.next;
    }
  }

  getLength() {
    if (!this.head) {
      return 0;
    }

    let node = this.head;
    let count = 1;
    while (node) {
      if (!node.next) {
        return count;
      }
      count++;
      node = node.next;
    }
  }

  printData() {
    let node = this.head;
    while (node) {
      console.log(node.data);
      node = node.next;
    }
  }

  insertAtIndex(data, index) {
    if (index < 0 || index >= this.getLength()) {
      return undefined;
    }

    let count = 0;
    let node = this.head;

    while (node) {
      if (count === index - 1) {
        node.next = new Node(data, node.next);
        break;
      }
      count++;
      node = node.next;
    }
  }

  deleteAtIndex(index) {
    if (index < 0 || index >= this.getLength()) {
      return undefined;
    }

    let count = 0;
    let node = this.head;

    while (node) {
      if (count === index - 1) {
        node.next = node.next.next;
      }
      count++;
      node = node.next;
    }
  }
}

// let myList = new LinkedList();

// myList.insertFirst("1");
// myList.insertFirst("2");
// myList.insertFirst("3");
// myList.insertFirst("4");
// myList.insertFirst("5");
// myList.insertFirst("6");
// myList.insertFirst("7");
// myList.insertFirst("8");
// myList.insertFirst("9");
// myList.insertFirst("10");

// myList.insertAtIndex("***INSERTED***", 5);
// myList.printData();
// myList.deleteAtIndex(5);
// myList.printData();

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class linkedList2 {
  constructor() {
    this.head = null;
  }

  checkHead(data) {
    if (!this.head) {
      return undefined;
    }
  }

  getLength() {
    this.checkHead();

    let count = 1;
    let current = this.head;

    while (current.next) {
      count++;
      current = current.next;
    }
    return count;
  }

  insertFirst(data) {
    this.checkHead();

    this.head = new Node(data, this.head);
  }

  insertLast(data) {
    this.checkHead();
    let current = this.head;
    while (current) {
      if (!current.next) {
        current.next = new Node(data);
        return;
      }
      current = current.next;
    }
  }

  deleteFirst() {
    this.checkHead();
    this.head = this.head.next;
  }

  deleteLast() {
    this.checkHead();

    if (!this.head.next) {
      this.head = null;
    }

    let prev = this.head;
    let current = this.head.next;

    while (current) {
      if (!current.next) {
        prev.next = null;
        return;
      }

      prev = current;
      current = current.next;
    }
  }

  insertAtIndex(data, index) {
    this.checkHead();

    if (index < 0 || index >= this.getLength()) {
      return undefined;
    }

    let count = 0;
    let current = this.head;

    while (current) {
      if (count === index - 1) {
        current.next = new Node(data, current.next);
      }
      current = current.next;
      count++;
    }
  }

  deleteAtIndex(index) {
    this.checkHead();

    if (index < 0 || index >= this.getLength()) {
      return undefined;
    }

    let count = 0;
    let current = this.head;

    while (current) {
      if (count === index - 1) {
        current.next = current.next.next;
      }
      current = current.next;
      count++;
    }
  }

  getFirst() {
    this.checkHead();

    return this.head.data;
  }

  getLast() {
    this.checkHead();

    let current = this.head;

    while (current) {
      if (!current.next) {
        return current.data;
      }
      current = current.next;
    }
  }

  printData() {
    if (!this.head) {
      return undefined;
    }

    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

// const list = new linkedList2();

// list.insertFirst(1);
// list.insertFirst(2);
// list.insertFirst(3);
// list.insertFirst(4);
// list.insertFirst(5);
// list.insertLast(0);
// list.insertAtIndex("INSERT", 3);
// list.printData();
// console.log("count:", list.getLength());
// list.deleteAtIndex(3);
// list.printData();
// console.log("count:", list.getLength());
// console.log("first:", list.getFirst(), "last:", list.getLast());

// leet linked list problem

function hasCycle(head) {
  const nodesSeen = new Set();

  while (head) {
    if (nodesSeen.has(head)) {
      return true;
    } else {
      nodesSeen.add(head);
    }
    head = head.next;
  }
  return false;
}

// double linked list

class Node3 {
  constructor(data, prev = null, next = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

class linkedList3 {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    let newNode = new Node3(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  prepend(data) {
    let newNode = new Node3(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  insertInside(data) {
    let newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }

    let next = this.head.next;
    this.head.next = newNode;
    newNode.prev = this.head;
    newNode.next = next;
    next.prev = newNode;
  }

  deleteFirst() {
    if (!this.head) return;
    this.head = this.head.next;
  }

  deleteLast() {
    if (!this.head) return;
    this.tail = this.tail.prev;
    this.tail.next = null;
  }

  getFirst() {
    if (!this.head) return;
    return this.head.data;
  }

  getLast() {
    if (!this.head) return;
    return this.tail.data;
  }

  getLength() {
    if (!this.head) {
      return 0;
    }

    let count = 1;
    let current = this.head;

    while (current.next) {
      count++;
      current = current.next;
    }
    return count;
  }

  printData() {
    if (!this.head) return;

    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

// binary trees

class BinaryTreeNode {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(data, node = this.root) {
    let newNode = new BinaryTreeNode(data);

    if (!root) {
      this.root = newNode;
      return;
    }

    if (data < node.data) {
      if (!node.left) {
        node.left = new BinaryTreeNode(data);
      } else {
        this.insert(data, node.left);
      }
    }

    if (data > node.data) {
      if (!node.right) {
        node.right = new BinaryTreeNode(data);
      } else {
        this.insert(data, node.right);
      }
    }
  }
}
