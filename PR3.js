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

    // changed > to >= per your comment
    if (data > node.data) {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insert(data, node.right);
      }
    }
  }
}

let myBinaryTree = new BinaryTree();

myBinaryTree.insert(1);
myBinaryTree.insert(2);
myBinaryTree.insert(3);
myBinaryTree.insert(4);
myBinaryTree.insert(5);
myBinaryTree.insert(9);

/**
 * added JSDoc per your comment.
 *
 * flattens binary tree given the root node
 *
 * @param {BinaryTreeNode} root the root of the binary tree to be flattened
 * @return {any[]} the flattened tree values
 */

function flattenBinaryTree(root) {
  if (!root) return [];

  return [
    ...flattenBinaryTree(root.left),
    root.data,
    ...flattenBinaryTree(root.right),
  ];
}

// console.log(flattenBinaryTree(myBinaryTree.root));

// fixing the cache problem

class DoublyLinkedNode {
  constructor(key = null, value = null, prev = null, next = null) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class leastRecentlyUsedCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.head = null;
    this.tail = null;
    this.map = new Map();
  }

  put(key, value) {
    let node = this.map.get(key);

    if (node) this.#remove(node);

    if (this.map.size >= this.capacity) {
      this.map.delete(this.tail.key);
      this.#remove(this.tail);
    }

    let newNode = new DoublyLinkedNode(key, value);
    this.map.set(key, newNode);
    this.#add(newNode);
  }

  get(key) {
    let data = this.map.get(key);
    if (!data) return;

    this.#remove(data);
    this.#add(data);

    return data.value;
  }

  #add(node) {
    node.next = this.head;
    node.prev = null;

    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
  }

  #remove(node) {
    if (!node) return;

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    if (node === this.head) this.head = node.next;
    if (node === this.tail) this.tail = node.prev;
  }
}
