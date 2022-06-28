class Element {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class List {
  constructor(list) {
    this.head = null;
    this.length = 0;

    if (list) {
      list.forEach(item => this.add(new Element(item)));
    }
  }

  add(el) {
    if (!this.head) {
      this.head = el;
    } else {
      const tmp = this.head;
      // Make the last element point circularly to the first
      if (this.head.next === null) {
        this.head.next = el;
      }
      this.head = el;
      this.head.next = tmp;
    }

    this.length++;
  }

  reverse() {
    let k = this.length;
    let prev = null;
    let current = this.head;
    let next = null;

    while (k > 0) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
      k--;
    }

    this.head = prev;
    return this;
  }

  toArray() {
    const result = [];

    let k = this.length;
    while (k > 0) {
      result.push(this.head.value);
      this.head = this.head.next;
      k--;
    }
    return result;
  }
}

function arrayEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return false;
  }
  let result = true;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      result = false;
    }
  }
  return result;
}

function expect(actual) {
  return {
    toEqual: (expected) => {
      let areEqual = actual === expected;
      if (Array.isArray(expected) && Array.isArray(actual)) {
        areEqual = arrayEqual(actual, expected);
      }
      if (areEqual) {
        console.log(`passed: ${expected}`);
      } else {
        console.log(`failed: expected ${actual} to equal ${expected}`);
      }
    },
    toBeDefined: () => {
      if (actual !== undefined) {
        console.log(`passed: ${actual}`);
      } else {
        console.log(`failed: ${actual}`);
      }
    }
  };
}

function xtest() {
}


function test(title, cb) {
  cb();
}

function xdescribe() {
}

function describe(title, cb) {
  cb();
}

xdescribe('Element class', () => {
  test('has constructor', () => {
    const element = new Element(1);
    expect(element.value).toEqual(1);
  });
  test('value reflects constructor arg', () => {
    const element = new Element(2);
    expect(element.value).toEqual(2);
  });
  test('has null for next by default', () => {
    const element = new Element(1);
    expect(element.next).toEqual(null);
  });
});

describe('List class', () => {
  test('has constructor', () => {
    const list = new List();
    expect(list).toBeDefined();
  });
  test('new lists should have length 0', () => {
    const list = new List();
    expect(list.length).toEqual(0);
  });
  xtest('can add a element', () => {
    const list = new List();
    const element = new Element(1);
    expect(() => list.add(element)).not.toThrow();
  });
  test('adding a element increments length', () => {
    const list = new List();
    const element = new Element(1);
    list.add(element);
    expect(list.length).toEqual(1);
  });
  test('adding two elements increments twice', () => {
    const list = new List();
    const element1 = new Element(1);
    const element2 = new Element(3);
    list.add(element1);
    list.add(element2);
    expect(list.length).toEqual(2);
  });
  test('new Lists have a null head element', () => {
    const list = new List();
    expect(list.head).toEqual(null);
  });
  test('adding an Element to an empty list sets the head Element', () => {
    const list = new List();
    const element = new Element(1);
    list.add(element);
    expect(list.head.value).toEqual(1);
  });
  test('adding a second Element updates the head Element', () => {
    const list = new List();
    const element1 = new Element(1);
    const element2 = new Element(3);
    list.add(element1);
    list.add(element2);
    expect(list.head.value).toEqual(3);
  });
  test('can get the next Element from the head', () => {
    const list = new List();
    const element1 = new Element(1);
    const element2 = new Element(3);
    list.add(element1);
    list.add(element2);
    expect(list.head.next.value).toEqual(1);
  });
  test('can be initialized with an array', () => {
    const list = new List([1, 2, 3]);
    expect(list.length).toEqual(3);
    expect(list.head.value).toEqual(3);
  });
});
describe('Lists with multiple elements', () => {
  let list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  test('with correct length', () => {
    expect(list.length).toEqual(10);
  });

  test('with correct head value', () => {
    expect(list.head.value).toEqual(10);
  });
  test('can traverse the list', () => {
    expect(list.head.next.next.next.value).toEqual(7);
  });
  test('can convert to an array', () => {
    const oneList = new List([1]);
    expect(oneList.toArray()).toEqual([1]);
  });
  test('head of list is final element from input array', () => {
    const twoList = new List([1, 2]);
    expect(twoList.head.value).toEqual(2);
  });
  test('can convert longer list to an array', () => {
    expect(list.toArray()).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });
  test('can be reversed', () => {
    const twoList = new List([1, 2]);
    expect(twoList.reverse().toArray()).toEqual([1, 2]);
  });
  test('can be reversed when it has more elements', () => {
    const threeList = new List([1, 2, 3]);
    expect(threeList.reverse().toArray()).toEqual([1, 2, 3]);
  });
  test('can reverse with many elements', () => {
    let list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(list.reverse().toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  test('can reverse a reversal', () => {
    let list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(list.reverse().reverse().toArray()).toEqual([
      10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
    ]);
  });
});
