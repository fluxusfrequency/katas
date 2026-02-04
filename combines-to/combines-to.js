// given a list of positive integers, write a function that returns a boolean indicating whether 
// the numbers in the list can be added and/or multiplied together to yield the target
// e.g. [2, 3, 5] with a target of 25 is true (2+3*5)
// [2, 3, 5] with a target of 12 is false

const assertEqual = (actual, expected, title) => {
  if (actual === expected) {
    console.log(`Passed: ${title}\n`);
  } else {
    console.log(`Failed: ${title}\nExpected ${actual} to equal ${expected}\n`);
  }
}

function combinesTo(list, target) {
  // Try all possible combinations of operations
  function tryCombinations(numbers, currentValue) {
    // Base case: if we've used all numbers
    if (numbers.length === 0) {
      return currentValue === target;
    }

    // Try each number in the list
    for (let i = 0; i < numbers.length; i++) {
      const num = numbers[i];
      const remainingNumbers = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
      
      // Try addition
      if (tryCombinations(remainingNumbers, currentValue + num)) {
        return true;
      }
      
      // Try multiplication
      if (tryCombinations(remainingNumbers, currentValue * num)) {
        return true;
      }
    }
    
    return false;
  }

  // Start with the first number and try all combinations
  return tryCombinations(list, 0);
}

assertEqual(combinesTo([2, 3, 5], 25), true, 'true case');
assertEqual(combinesTo([2, 3, 5], 12), false, 'false case');