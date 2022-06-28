// From https://leetcode.com/problems/maximal-square/description/
Array.prototype.isEqualTo = function(other) {
  if (!Array.isArray(other) || this.length !== other.length) {
    return false;
  }

  let result = true
  for (let i = 0; i < this.length; i++) {
    const thisItem = this[i];
    const otherItem = other[i];
    if (Array.isArray(thisItem) && Array.isArray(otherItem)) {
      return thisItem.isEqualTo(otherItem);
    } else if (thisItem !== otherItem) {
      result = false;
    }
  }
  return result;
};

function assertEqual(expected, actual, title) {
  let result = false;
  if (Array.isArray(actual) && Array.isArray(expected)) {
    result = expected.isEqualTo(actual);
  } else {
    result = expected === actual;
  }

  if (result) {
    console.log(`Passed: ${title}\n`);
  } else {
    console.log(`Failed: ${title}. Expected ${actual} to be ${expected}\n`);
  }
}

// start with the largest possible square size (smaller of m or n)
// in a 5*4, this is 4
// 1 0 1 0 0
// 1 0 1 1 1
// 1 1 1 1 1
// 1 0 0 1 0
// for this example we are going to be making 4*4 matrices
// we are going left to right in the bigger column (m in this case)
// we are going to slice out a max-sized matrix for (m - n + 1) spots, i.e. idx = 0, 1
// we stop when we hit the right bound of the max square
// if we find a square in that size, we stop immediately and return the total
// if not, we decrement the size of square we're looking for and go through again,
// m - n horizontally and n - 1 spots vertically
//
// we need a counter for last biggest size looked for, both for m and for n
// the larger of the two is initialized to Math.abs(m - n) + 1
// the smaller is initialized to 1
//
// write a function that slices a square out of a 2-dimensional matrix
// loop through (bigger counter) times the bigger side
// for each of those, loop through (smaller counter) times the smaller side
// each produces a coordinate pair, e.g. for the example above it will be
// [0, 0], [1, 0] and then we've checked all the 4*4 squares
// for 3*3 we'll do [0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]
// and for 2*2 we'll do [0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2]
//
// whenever we find a square of all 1s, exit

function cutSquareFromMatrix(matrix, size, coordinates) {
  const [x, y] = coordinates;
  const slicedM = [...matrix].slice(x, x + size);
  const result = slicedM.map(row => [...row].slice(y, y + size));
  return result;
}

function isSquareAllOnes(square) {
  return square.every(line => line.every(item => item === '1'));
}

function checkInnerSquares(matrix, numToCheckM, numToCheckN, lastSquareSizeChecked) {
  let mLeft = numToCheckM;
  let nLeft = numToCheckN;
  while (mLeft > 0 && nLeft > 0) {
    const squareSize = Math.min(mLeft, nLeft);
    for (let i = 0; i < mLeft; i++) {
      for (let j = 0; j < nLeft; j++) {
        const coordinates = [i, j];
        // Optimization: if the line contains a 0, don't bother cutting a square
        if (matrix[i].indexOf('0') !== -1) {
          const square = cutSquareFromMatrix(matrix, lastSquareSizeChecked, coordinates);
          if (isSquareAllOnes(square)) {
            return lastSquareSizeChecked ** 2;
          }
        }
      }
    }
    mLeft--;
    nLeft--;
  }
  return null;
}

// Input is a 2-dimension array with size m*n
function largestSquare(input) {
  if (!input.length > 0) {
    return null;
  }
  const m = input[0].length;
  const n = input.length;
  // begin with the maximum square size possible (smaller of m or n)
  let lastSquareSizeChecked = Math.min(m, n);

  while (lastSquareSizeChecked > 0) {
    // only check until we hit the right bound of m and the bottom bound of n
    let numToCheckM = m - lastSquareSizeChecked + 1;
    let numToCheckN = n - lastSquareSizeChecked + 1;
    const foundInnerSquare = checkInnerSquares(input, numToCheckM, numToCheckN, lastSquareSizeChecked);

    if (foundInnerSquare) {
      return foundInnerSquare;
    } else {
      lastSquareSizeChecked--;
    }
  }
  // base case, nothing was found
  return 0;
}

const example1 = [['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']];
const example2 = [['0','1'],['1','0']];
const example3 = [['1','0','1','0'],['1','0','1','1'],['1','1','1','1'],['1','0','0','1'],['0','1','1','0']];
const example4 = [['1', '0', '0', '0', '0'], ['1', '0', '1', '0', '0'],['1','0','0','0','1'],['1','0','1','0','1'],['1', '0', '0', '0', '0'], ['1','0','0','1','1'],['1','0','0','1','1']];

assertEqual([['1','0','1','0'],['1','0','1','1'],['1','1','1','1'],['1','0','0','1']], cutSquareFromMatrix(example1, 4, [0, 0]), 'Cutting out a square');
assertEqual([['0','1','1'],['1','1','1'],['0','0','1']], cutSquareFromMatrix(example1, 3, [1, 1]), 'Cutting out another square');

assertEqual(true, isSquareAllOnes([['1', '1'],['1', '1']]), 'all ones');
assertEqual(false, isSquareAllOnes([['1', '0'],['1', '1']]), 'not all ones');
assertEqual(true, isSquareAllOnes([['1', '1', '1'],['1', '1', '1']]), 'moar ones');

assertEqual(null, largestSquare([]), 'Empty array');
assertEqual(0, largestSquare([['0']]), 'None found');
assertEqual(4, largestSquare(example1), 'First example, 5*4');
assertEqual(1, largestSquare(example2), 'Second example, 2*2');
assertEqual(4, largestSquare(example3), 'Third example, 4*5');

// example 4
// 1 0 0 0 0
// 1 0 1 0 0
// 1 0 0 0 1
// 1 0 1 0 1
// 1 0 0 0 0
// 1 0 0 1 1
// 1 0 0 1 1
assertEqual(4, largestSquare(example4), 'Fourth example, 7*5, square at the end, num to check m and n must be different');
