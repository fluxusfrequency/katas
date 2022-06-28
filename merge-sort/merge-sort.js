function arrayEqual(arr, other) {
  if(!Array.isArray(arr) || !Array.isArray(other)) {
    return false;
  }

  if(arr.length !== other.length) {
    return false;
  }

  let result = true;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== other[i]) {
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

// Takes two sorted arrays
function merge(leftArr, rightArr) {
  const result = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      result.push(leftArr.shift());
    } else {
      result.push(rightArr.shift());
    }
  }
  return [...result, ...leftArr, ...rightArr];
}

function mergeSort(input) {
  const middle = input.length / 2;
  if (input.length < 2) {
    return input;
  }
  const leftHalf = input.slice(0, middle);
  const rightHalf = input.slice(middle, input.length);
  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

assertEqual([1, 2, 3, 4, 5, 6], mergeSort([4, 3, 6, 1, 5, 2]), 'basic example');
assertEqual(['a', 'b', 'c', 'd', 'e'], mergeSort(['e', 'a', 'b', 'd', 'c']), 'alphabet');
assertEqual([0, 32, 43, 112, 301, 399, 444, 1100, 99238], mergeSort([112, 43, 444, 99238, 399, 0, 1100, 32, 301]), 'complicated');

