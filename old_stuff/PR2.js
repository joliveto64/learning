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

  leftRotate(node) {
    let newParent = node.right;
    node.right = newParent.left;

    newParent.left.parent = node;
    newParent.parent = node.parent;

    if (node.parent === null) {
      this.root = newParent;
    } else if (node === node.parent.left) {
      node.parent.left = newParent;
    } else {
      node.parent.right = newParent;
    }

    newParent.left = node;
    node.parent = newParent;
  }

  rightRotate(node) {
    let newParent = node.left;
    node.left = newParent.right;

    newParent.right.parent = node;
    newParent.parent = node.parent;

    if (node.parent === null) {
      this.root = newParent;
    } else if (node === node.parent.right) {
      node.parent.right = newParent;
    } else {
      node.parent.left = newParent;
    }

    newParent.right = node;
    node.parent = newParent;
  }

  insert(value) {
    let node = new redBlackNode(value, "red", this.NIL, this.NIL, this.NIL);
    let root = this.root;

    if (root === this.NIL) {
      this.root = node;
      node.color = "black";
      return;
    }

    let isLeftChild;
    while (root !== this.NIL) {
      if (node.data < root.data) {
        root = root.left;
        isLeftChild = true;
      } else {
        root = root.right;
        isLeftChild = false;
      }
    }
    node.parent = root.parent;

    isLeftChild ? (node.parent.left = node) : (node.parent.right = node);

    this.fixInsert(node);
  }

  // chat gpt fixInsert - I can't follow this part
  fixInsert(node) {
    let uncle;
    // While the parent of the node is red
    while (node.parent.color == "red") {
      if (node.parent == node.parent.parent.right) {
        uncle = node.parent.parent.left; // Uncle node is the left child
        if (uncle.color == "red") {
          // Case 1 & 2: uncle is red
          uncle.color = "black";
          node.parent.color = "black";
          node.parent.parent.color = "red";
          node = node.parent.parent;
        } else {
          if (node == node.parent.left) {
            // Case 3: node is a left child
            node = node.parent;
            this.rightRotate(node);
          }
          // Case 4: node is a right child.
          node.parent.color = "black";
          node.parent.parent.color = "red";
          this.leftRotate(node.parent.parent);
        }
      } else {
        uncle = node.parent.parent.right; // Uncle node is the right child

        // Here, the mirror conditions are applied
        // because the other child (right child) is now involved.
        if (uncle.color == "red") {
          // Case 1 & 2
          uncle.color = "black";
          node.parent.color = "black";
          node.parent.parent.color = "red";
          node = node.parent.parent;
        } else {
          if (node == node.parent.right) {
            // Case 3
            node = node.parent;
            this.leftRotate(node);
          }
          // Case 4
          node.parent.color = "black";
          node.parent.parent.color = "red";
          this.rightRotate(node.parent.parent);
        }
      }
      // Corner case: if node becomes root break the loop
      if (node == this.root) {
        break;
      }
    }
    // Color the root node black (Property 2)
    this.root.color = "black";
  }
}
