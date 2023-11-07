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
