const _Node = require('./node');

// _length: assigned number of nodes in list
// head: points to the head of the list (node in front)
class LinkedList {
  constructor() {
    this.head = null;
  }

  /*
    Insertion: beginning, end, anywhere between
    two nodes (insert, insertAt)

    Insertion at beginning:
      1. create new node
      2. point the head to that new node
  */
  insertFirst(spanish, english) {
    this.head = new _Node(spanish, english, this.head);
  }

  insertLast(spanish, english) {
    if (this.head === null) {
      this.insertFirst(spanish, english);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(spanish, english, null);
    }
  }

  /*
  Retrieval (find) operation
  Traverse the list, comparing 
  the value stored in each node with the value
  you are searching

  When item is found, return the node.
  */
  find(item) {
    //start at the head
    let currNode = this.head;
    //if the list is empty
    if (!this.head) {
      return null;
    }
    //Check for the item 
    while (currNode.value !== item) {
      //return null if end of the list 
      // and the item is not on the list
      if (currNode.next === null) {
        return null;
      } else {
        //otherwise keep looking 
        currNode = currNode.next;
      }
    }
    //found it
    return currNode;
  }

  /*
    Removal

    Delete first item on the list:
    change the head to indicate the new first item on the list

    Delete item for n = 1 to n = end:
    start at head of the list and find node that contains dragon fruit
  */
  remove(item) {
    //if the list is empty
    if (!this.head) {
      return null;
    }
    //if the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    //start at the head
    let currNode = this.head;
    //keep track of previous
    let previousNode = this.head;

    while ((currNode !== null) && (currNode.value !== item)) {
      //save the previous node 
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }

  insertBefore(item, index) {
    console.log(item, index);
    //start at the head
    let currNode = this.head;
    let count = 0;
    // console.log('VALUE:', currNode.value);
    
    // exit out of function if list empty
    if (currNode.value === null) {
      return 'ERR: linked list is empty';
    }

    // get list length
    while (currNode.next !== null) {
      currNode = currNode.next;
      count++;
    }
    console.log('count is:', count);

    if (index > count || index < 0) {
      return 'Index is out of bounds';
    }
    console.log('HELLO WORLD!')

    let parent = null;
    currNode = this.head;
    // console.log('FIRST head:', currNode);
    // traverse to node fed from index
    for (let i=0; i<index; i++) {
      parent = currNode;
      currNode = currNode.next;
    }

    if (currNode) {
      // make child current
      let child = new _Node(currNode.value, currNode.next);
      currNode.value = item;
      currNode.next = child;
    }
    else if (parent) {
      // insert node at end list
      parent.next = new _Node(item, null);
    }
    else {
      // create new head
      this.head = new _Node(item, null);
    }
  }

  insertAfter(item, index) {
    console.log(item, index);
    //start at the head
    let currNode = this.head;
    let parent = null;
    console.log('FIRST head:', currNode);
    // traverse to node fed from index
    for (let i=0; i<index; i++) {
      parent = currNode;
      currNode = currNode.next;
    }

    // console.log('TRAVERSED parent:', parent);
    // console.log('TRAVERSED currNode:', currNode);
    
    // currNode = new _Node(item, currNode.next);
    // console.log(currNode.next);
    if (currNode) {
      // make child current
      let child = new _Node(item, currNode.next);
      // currNode.value = item;
      currNode.next = child;
    }
  }

  // recursion creates stack
  // unfinished function
  // for/iterative loop takes less memory
  display(list) {
    const listObj = list.head;
    console.log(JSON.stringify(listObj));
      
  }

}

module.exports = LinkedList;