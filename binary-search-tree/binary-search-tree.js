Array.prototype.isEqualTo = function(other) {
  if (!Array.isArray(other) || this.length !== other.length) {
    return false;
  }

  let result = true
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== other[i]) {
      result = false;
    }
  }
  return result;
};

function expect(actual) {
  return {
    toEqual: (expected, title) => {
      const comparisonPassed = Array.isArray(actual) && Array.isArray(expected) ? actual.isEqualTo(expected) : actual === expected;
      if (comparisonPassed) {
        console.log(`passed: ${title}\n`);
      } else {
        console.log(`failed: ${title}. Expected ${actual} to match ${expected}\n`);
      }
    }
  };
}

class BinarySearchTree {
  constructor(data) {
    this.data = data;
  }

  each(callback) {
    let head = this;

    if (this.left) {
      this.left.each(callback);
    }

    callback(this.data);

    if (this.right) {
      this.right.each(callback);
    }
  }

  insert(datum) {
    const { data, left, right } = this;
    if (datum <= data) {
      if (!left) {
        this.left = new BinarySearchTree(datum);
      } else {
        this.left.insert(datum);
      }
    } else if (datum > data) {
      if (!right) {
        this.right = new BinarySearchTree(datum);
      } else {
        this.right.insert(datum);
      }
    }
  }
}

function recordAllData(bst) {
  const result = [];
  bst.each(el => result.push(el));
  return result;
}

let bst;
bst = new BinarySearchTree(null);
expect(recordAllData(bst)).toEqual([], 'empty list');
bst = new BinarySearchTree(1);
expect(recordAllData(bst)).toEqual([1], 'single element');

let four;
four = new BinarySearchTree(4);
four.insert(2);
expect(four.data).toEqual(4, 'insert right initialization');
expect(four.left.data).toEqual(2, 'insert right search');

four = new BinarySearchTree(4);
four.insert(4);
expect(four.data).toEqual(4, 'insert left initialization');
expect(four.left.data).toEqual(4, 'insert left search');

four = new BinarySearchTree(4);
four.insert(5);
expect(four.data).toEqual(4, 'right side greater 1');
expect(four.right.data).toEqual(5, 'right side greater 2');

four = new BinarySearchTree(4);
four.insert(2);
four.insert(6);
four.insert(1);
four.insert(3);
four.insert(5);
four.insert(7);
expect(four.data).toEqual(4);
expect(four.left.data).toEqual(2);
expect(four.left.left.data).toEqual(1);
expect(four.left.right.data).toEqual(3);
expect(four.right.data).toEqual(6);
expect(four.right.left.data).toEqual(5);
expect(four.right.right.data).toEqual(7);

expect(recordAllData(new BinarySearchTree(2))).toEqual([2]);

four = new BinarySearchTree(2);
four.insert(1);
expect(recordAllData(four)).toEqual([1, 2]);

four = new BinarySearchTree(2);
four.insert(2);
expect(recordAllData(four)).toEqual([2, 2]);

four = new BinarySearchTree(2);
four.insert(3);
expect(recordAllData(four)).toEqual([2, 3]);
four = new BinarySearchTree(2);
four.insert(1);
four.insert(3);
four.insert(6);
four.insert(7);
four.insert(5);
expect(recordAllData(four)).toEqual([1, 2, 3, 5, 6, 7]);

     //2
 //1      3
       //5 6
          //7
