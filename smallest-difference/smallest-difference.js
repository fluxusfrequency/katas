/* From https://start.interviewing.io/interview/ePFHkAqq0cId/replay
 * Given two arrays, find the element(s) in each array such that the absolute value of the
 * difference is as small as possible.
 * Return the index i from the first array, and the index j from the second array
 */
function arrayEqual(arr, other) {
  if(!Array.isArray(arr) || !Array.isArray(other)) {
    return false;
  }

  if(arr.length !== other.length) {
    return false;
  }

  let result = true;
  for (let i = 0; i < arr.length; i++) {
    const thisItem = arr[i];
    const otherItem = other[i];
    if (Array.isArray(thisItem) && Array.isArray(otherItem)) {
      const passed = arrayEqual(thisItem, otherItem);
      if (!passed) {
        result = false;
      }
    } else if (arr[i] !== other[i]) {
      result = false;
    }
  }
  return result;
}

function assertEqual(expected, actual, title) {
  if (Array.isArray(actual) && Array.isArray(expected) && arrayEqual(actual, expected)) {
    console.log(`Passed: ${title}`);
  } else if (actual === expected) {
    console.log(`Passed: ${title}`);
  } else {
    console.log(`Failed: ${title}. Expected ${actual} to be ${expected}`);
  }
}

// naive solution
// initialize a lastSmallestDifference variable
// initialize a lastSmallestPair variable
// iterate through array 1 (i)
// for each element, iterate through array 2 (j)
// for each pair i, j, calculate the difference
// if the current distance is < lastSmallestDifference, set it to the current distance and set
// lastSmallestPair to [i, j]
// return lastSmallestPair
// O(n**2)

//function smallestDifference(a, b) {
  //let lastSmallestDifference = -1;
  //let lastSmallestPair = [];
  //let lastSmallestPairs = [];

  //for (let i = 0; i < a.length; i++) {
    //for (let j = 0; j < b.length; j++) {
      //const aVal = a[i];
      //const bVal = b[j];
      //const currentDifference = Math.abs(aVal - bVal);
      //if (currentDifference < lastSmallestDifference || lastSmallestDifference < 0) {
        //lastSmallestDifference = currentDifference;
        //lastSmallestPair = [i, j];
        //lastSmallestPairs = [];
      //} else if (currentDifference === lastSmallestDifference) {
        //lastSmallestPairs.push([i, j]);
      //}
    //}
  //}
  //return lastSmallestPairs.length > 0 ? lastSmallestPairs : lastSmallestPair;
//}

// better solution
// sort the arrays
// pointer in each array

function smallestDifference(a, b) {
  let lastSmallestDifference = -1;
  let lastSmallestPair = [];
  let lastSmallestPairs = [];
  let i = 0;
  let j = 0;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();

  while (i < sortedA.length && j < sortedB.length) {
    const thisA = sortedA[i];
    const thisB = sortedB[j];
    const difference = Math.abs(thisA - thisB);

    const y = a.indexOf(thisA);
    const z = b.indexOf(thisB);
    const thisPair = [y, z];

    if (difference < lastSmallestDifference || lastSmallestDifference < 0) {
      lastSmallestDifference = difference;
      lastSmallestPair = thisPair;
      lastSmallestPairs = [];
    } else if (difference === lastSmallestDifference) {
      lastSmallestPair = thisPair;
      lastSmallestPairs.push(thisPair);
    }

    if (thisA < thisB) {
      i++;
    } else if (thisA > thisB) {
      j++;
    } else {
      i++;
    }
  }

  return lastSmallestPairs.length > 1 ? lastSmallestPairs.sort((n, m) => n[0] - m[0]) : lastSmallestPair;
}

const array1 = [3, 2, 5];
const array2 = [4, 7, 2];
assertEqual([], smallestDifference([], []), 'empty inputs');
assertEqual([], smallestDifference([], array2), 'empty input for a1');
assertEqual([], smallestDifference(array1, []), 'empty input for a2');
assertEqual([1, 2], smallestDifference(array1, array2), 'same value');
const array3 = [1, 6, 3, 5, 0];
const array4 = [9, 2, 7, 4];
assertEqual([[1, 2], [2, 1], [2,3], [3, 3]], smallestDifference(array3, array4), 'multiple');
const array5 = [1, 3, 5, 9, 10];
const array6 = [13];
assertEqual([4, 0], smallestDifference(array5, array6), 'bigger');

const array7 = [3, 2, 5, 2];
const array8 = [2, 4, 7, 2];
assertEqual([1, 0], smallestDifference(array7, array8), 'duplicates');

// non number elements; => throw
