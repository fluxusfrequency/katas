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

function swap(arr, i, j) {
  const tmpI = arr[i];
  arr[i] = arr[j];
  arr[j] = tmpI;
}

function partition(input, low, high) { // has side effects: the input is mutated by the call to swap()
  const pivot = input[Math.floor((high + low) / 2)];
  let i = low;
  let j = high;
  while (i <= j) {
    while(input[i] < pivot) { // move up from the bottom of the input until we find an element greater than the pivot
      i++;
    }
    while(input[j] > pivot) { // move down from the top of the input until we find an element smaller than the pivot
      j--;
    }
    if (i <= j) { // once we have passed the pivot we should not swap
      swap(input, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(input, low = 0, high = input.length - 1) {
  if (input.length > 1) {
    const index = partition(input, low, high);
    if (low < index - 1) {
      quickSort(input, low, index - 1);
    }
    if (index < high) {
      quickSort(input, index, high);
    }
    return input;
  }
}

assertEqual([1, 2, 3, 4, 5, 6], quickSort([4, 3, 6, 1, 5, 2]), 'basic example');
assertEqual(['a', 'b', 'c', 'd', 'e'], quickSort(['e', 'a', 'b', 'd', 'c']), 'alphabet');
assertEqual([0, 32, 43, 112, 301, 399, 444, 1100, 99238], quickSort([112, 43, 444, 99238, 399, 0, 1100, 32, 301]), 'complicated');

