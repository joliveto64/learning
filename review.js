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
