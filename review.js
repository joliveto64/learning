// double linked list

class DoubleLinkedNode {
  constructor(data, prev = null, next = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    let newNode = new DoubleLinkedNode(data);

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
    let newNode = new DoubleLinkedNode(data);

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
    let newNode = new DoubleLinkedNode(data);

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

    if (!this.root) {
      this.root = newNode;
      return;
    }

    if (data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insert(data, node.left);
      }
    }

    if (data > node.data) {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insert(data, node.right);
      }
    }
  }
}

// calculate max depth of binary tree

function maxDepthBinaryTree(node) {
  if (!node) {
    return 0;
  } else {
    let leftDepth = maxDepthBinaryTree(node.left);
    let rightDepth = maxDepthBinaryTree(node.right);

    return Math.max(leftDepth, rightDepth) + 1;
  }
}

// flatten binary tree

let myBinaryTree = new BinaryTree();

myBinaryTree.insert(4);
myBinaryTree.insert(3);
myBinaryTree.insert(5);
myBinaryTree.insert(7);
myBinaryTree.insert(1);
myBinaryTree.insert(6);
myBinaryTree.insert(8);
myBinaryTree.insert(2);

// this function flattens the tree into an array with two helper functions
function flattenBinaryTree(node) {
  // returns the left data, root data, right data in a new array with the spread (...) operator
  return [...flattenLeftValues(node), node.data, ...flattenRightValues(node)];
}

// this function returns an array with the values from the right side of the tree
function flattenRightValues(node) {
  let arr = [];
  node = node.right;

  while (node) {
    node.left ? arr.push(node.left.data) : null;
    arr.push(node.data);

    if (!node.right) {
      return arr;
    }
    node = node.right;
  }
}

// this functions returns an array with the values from the left side of the tree
function flattenLeftValues(node) {
  let arr = [];
  node = node.left;

  while (node) {
    node.right ? arr.unshift(node.right.data) : null;
    arr.unshift(node.data);

    if (!node.left) {
      return arr;
    }
    node = node.left;
  }
}

console.log(flattenBinaryTree(myBinaryTree.root));

// red-black trees

class redBlackNode {
  constructor(data, color, left = null, right = null, parent = null) {
    this.data = data;
    this.color = color;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

class redBlackTree {
  constructor() {
    this.NIL = new redBlackNode(null, "black");
    this.root = this.NIL;
  }
}
