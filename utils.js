export class SinglyLinkedNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

export class SinglyLinkedList {
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
    this.head = new SinglyLinkedNode(data, this.head);
  }

  insertLast(data) {
    this.checkHead();
    let current = this.head;
    while (current) {
      if (!current.next) {
        current.next = new SinglyLinkedNode(data);
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

    if (index === 0) {
      this.insertFirst(data);
    }

    let count = 0;
    let current = this.head;

    while (current) {
      if (count === index - 1) {
        current.next = new SinglyLinkedNode(data, current.next);
        return;
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

    if (index === 0) {
      this.deleteFirst();
      return;
    }

    let count = 0;
    let current = this.head;

    while (current) {
      if (count === index - 1) {
        current.next = current.next.next;
        return;
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
    this.checkHead();

    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

export class BinaryTree {
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

// MIHAI LOOK HERE FOR THE BINARY TREE NODES

class BinaryTreeNode {
  constructor(val, parent = null, left = null, right = null) {
    this.val = val;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

let node1 = new BinaryTreeNode(1);
let node2 = new BinaryTreeNode(2);
let node3 = new BinaryTreeNode(3);
let node4 = new BinaryTreeNode(4);
let node5 = new BinaryTreeNode(5);
let node6 = new BinaryTreeNode(6);
let node7 = new BinaryTreeNode(7);
let node8 = new BinaryTreeNode(8);
let node9 = new BinaryTreeNode(9);

node5.left = node3;
node5.right = node7;

node3.left = node2;
node3.right = node4;

node7.left = node6;
node7.right = node8;

node2.left = node1;
node8.right = node9;

node3.parent = node5;
node7.parent = node5;

node2.parent = node3;
node4.parent = node3;

node6.parent = node7;
node8.parent = node7;

node1.parent = node2;
node9.parent = node8;

let familyTree = {
  node1: node1,
  node2: node2,
  node3: node3,
  node4: node4,
  node5: node5,
  node6: node6,
  node7: node7,
  node8: node8,
  node9: node9,
};

export { familyTree };
