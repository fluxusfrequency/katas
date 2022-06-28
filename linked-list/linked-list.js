function assertEqual(actual, expected, title) {
  if (actual === expected) {
    console.log(`passed: ${title}\n`);
  } else {
    console.log(`failed: ${title}, expected ${actual} to equal ${expected}\n`);
  }
}

class LinkedList {
  constructor(data) {
    if (data) {
      this.head = new Node(data[0], null, null);
    } else {
      this.head = null;
    }
  }

  fastForward(callback = () => {}) {
    if (!this.head) {
      return null;
    }

    while (this.head.next) {
      callback(this.head);
      this.head = this.head.next;
    }
    callback(this.head); // call for the last element
    return this.head;
  }

  rewind() {
    if (!this.head) {
      return null;
    }

    while (this.head.prev) {
      this.head = this.head.prev;
    }
    return this.head;
  }

  push(datum) {
    this.fastForward();
    const newNode = new Node(datum, this.head, null);
    if (this.head) {
      this.head.next = newNode;
    }
    this.head = newNode;
  }

  pop() {
    if (!this.head) {
      return null;
    }

    this.fastForward();
    const tmp = this.head;
    if (this.head.prev) {
      this.head.prev.next = null;
    }
    this.head = this.head.prev;
    return tmp.datum;
  }

  unshift(datum) {
    this.rewind();
    const newNode = new Node(datum, null, this.head);
    if (this.head) {
      this.head.prev = newNode;
    }
    this.head = newNode;
  }

  shift() {
    if (!this.head) {
      return null;
    }

    this.rewind();
    const tmp = this.head;
    if (this.head.next) {
      this.head.next.prev = null;
    }
    this.head = this.head.next;
    return tmp.datum;
  }

  delete(value) {
    let foundMatch = false;
    this.rewind();
    this.fastForward((node) => {
      if (!foundMatch && node.datum === value) {
        if (!node.prev && !node.next) { // only one element in the list
          this.head = null;
        }
        if (node.prev) {
          node.prev.next = node.next;
        }
        if (node.next) {
          node.next.prev = node.prev;
        }
        foundMatch = true;
      }
    });
  }

  count() {
    let counter = 0;
    this.rewind();
    this.fastForward(() => counter += 1);
    return counter;
  }
};

class Node {
  constructor(datum, prev, next) {
    this.datum = datum;
    this.prev = prev;
    this.next = next;
  }
};

let list;

assertEqual(new LinkedList(['foo', 'bar']).head.datum, 'foo', 'head should be a node with the first element passed in');

list = new LinkedList()
list.push(7);
assertEqual(list.pop(), 7, 'pop gets last element from the list');

list = new LinkedList();
list.push(11);
list.push(13);
assertEqual(list.pop(), 13, 'pops tail one time');
assertEqual(list.pop(), 11, 'pops tail second time');

list = new LinkedList();
list.push(17);
assertEqual(list.shift(), 17, 'shift gets a single element from the list');

list = new LinkedList();
list.push(23);
list.push(5);
assertEqual(list.shift(), 23, 'shift gets first element from the list');
assertEqual(list.shift(), 5, 'shift gets second element from the list');

list = new LinkedList();
list.unshift(23);
list.unshift(5);
assertEqual(list.shift(), 5, 'unshift prepends to the list');
assertEqual(list.shift(), 23, 'unshift prepends to the list again');


list = new LinkedList();
list.push(1);
list.push(2);
assertEqual(list.pop(), 2, 'pop, push, shift, and unshift can be used in any order 1');
list.push(3);
assertEqual(list.shift(), 1, 'pop, push, shift, and unshift can be used in any order 2');
list.unshift(4);
list.push(5);
assertEqual(list.shift(), 4, 'pop, push, shift, and unshift can be used in any order 3');
assertEqual(list.pop(), 5, 'pop, push, shift, and unshift can be used in any order 4');
assertEqual(list.shift(), 3, 'pop, push, shift, and unshift can be used in any order 5');


list = new LinkedList();
assertEqual(list.count(), 0, 'count an empty list');

list = new LinkedList();
list.push(37);
list.push(1);
assertEqual(list.count(), 2, 'count a list with items');

list = new LinkedList();
list.push(31);
assertEqual(list.count(), 1, 'counting with mutations 1');
list.unshift(43);
assertEqual(list.count(), 2, 'counting with mutations 2');
list.shift();
assertEqual(list.count(), 1, 'counting with mutations 3');
list.pop();
assertEqual(list.count(), 0, 'counting with mutations 4');

list = new LinkedList();
list.push(41);
list.push(59);
list.pop();
list.pop();
list.push(47);
assertEqual(list.count(), 1, 'does not break on popping to empty 1');
assertEqual(list.pop(), 47, 'does not break on popping empty 2');

list = new LinkedList();
list.push(41);
list.push(59);
list.shift();
list.shift();
list.push(47);
assertEqual(list.count(), 1, 'shifting to empty does not break 1');
assertEqual(list.shift(), 47, 'shifting to empty does not break 1');

list = new LinkedList();
list.push(61);
list.delete(61);
assertEqual(list.count(), 0, 'deletes the only element');

list = new LinkedList();
list.push(71);
list.push(83);
list.push(79);
list.delete(83);
assertEqual(list.count(), 2, 'deleting specific element 1');
assertEqual(list.pop(), 79, 'deleting specific element 2');
assertEqual(list.shift(), 71, 'deleting specific element 3');

list = new LinkedList();
list.push(71);
list.push(83);
list.push(79);
list.delete(83);
assertEqual(list.count(), 2, 'delete specific el then reassign tail 1');
assertEqual(list.pop(), 79, 'delete specific el then reassign tail 2');
assertEqual(list.pop(), 71, 'delete specific el then reassign tail 3');

list = new LinkedList();
list.push(71);
list.push(83);
list.push(79);
list.delete(83);
assertEqual(list.count(), 2, 'delete specific el then reassign head 1');
assertEqual(list.shift(), 71, 'delete specific el then reassign head 2');
assertEqual(list.shift(), 79, 'delete specific el then reassign head 3');

list = new LinkedList();
list.push(97);
list.push(101);
list.delete(97);
assertEqual(list.count(), 1, 'deletes first two els 1');
assertEqual(list.pop(), 101, 'deletes first two els 2');

list = new LinkedList();
list.push(97);
list.push(101);
list.delete(101);
assertEqual(list.count(), 1, 'deletes second two els 1');
assertEqual(list.pop(), 97, 'deletes second two els 2');

list = new LinkedList();
list.push(89);
list.delete(103);
assertEqual(list.count(), 1, 'delete does not modify the list if the element is not found')

list = new LinkedList();
list.push(73);
list.push(9);
list.push(9);
list.push(107);
list.delete(9);
assertEqual(list.pop(), 107, 'deletes only the first occurrence 1');
assertEqual(list.pop(), 9, 'deletes only the first occurrence 2');
assertEqual(list.pop(), 73, 'deletes only the first occurrence 3');
