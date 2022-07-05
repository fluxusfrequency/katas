// From https://interviewing.io/recordings/JavaScript-Microsoft-12/
//
// Given an array of integers and an integer k, you need to find the total number of continuous
// subarrays whose sum equals k
//
// Example 1:
//
// Input: nums = [1, 1, 1], k = 2
// Output: 2
//
// Example 2:
//
// Input: nums = [1, 2, 3, 1, 2, 3], k = 6
// Output = 4
//
// Constraints
//
// The length of the array is in range [1, 20000]
// The range of numbers in the array is [-1000, 1000]
// The range of the integer k is [-1e7, 1e7]
//
//
// From https://interviewing.io/recordings/JavaScript-Microsoft-12/
//
// Given an array of integers and an integer k, you need to find the total number of continuous
// subarrays whose sum equals k
//
// Example 1:
//
// Input: nums = [1, 1, 1], k = 2
// Output: 2
//
// Example 2:
//
// Input: nums = [1, 2, 3, 1, 2, 3], k = 6
// Output = 4
//
// Constraints
//
// The length of the array is in range [1, 20000]
// The range of numbers in the array is [-1000, 1000]
// The range of the integer k is [-1e7, 1e7]
//
// Edge case
// empty num array [] => can't be below 1
// k = 0 => this is not really an edge case since we can have negative numbers
//
// [1, 2, 3, 1, 2, 3] => [[1], [2], [3], [1], [2], [3], [1, 2], [2, 3], [3, 1], [1, 2], [2, 3], [1, 2, 3], [2, 3, 1], [3, 1, 2], [1, 2, 3], [1, 2, 3, 1], [2, 3, 1, 2], [3, 1, 2, 3], [1, 2, 3, 1, 2], [2, 3, 1, 2, 3]]
// n = 6
// n - 1 => 2
// n - 2 => 3
// n - 3 => 4
// n - 4 => 5
// n - 5 => 6
// n - 1 => n - 2 ... n - (n - 1)

// Solution approaches

// Solution 1
// [1, 2, 3, 1, 2, 3]
// Generate all the subarrays first
// [[1], [2] ... etc] O(n^2)
// Iterate through the power set
// Sum each O(m)
// keep track of how many of those sums == k
// O(m + n^2)

// Solution 2
// [1, 2, 3, 1, 2, 3]
// start with the first element of the array
// take slices from this element + 0, 1, 2, 3, ... n -1
// [1], [1,2], [1, 2, 3], [1, 2, 3, 1]
// sum = 1, 3, (3 + 3), (6 + 1)
// keep track of how many of these sums == k
// now go to the next element
// O(n^2)

function assertEqual(expected, actual, title) {
    if (actual === expected) {
        console.log(`passed: ${title}\n`);
    } else {
        console.log(`failed: ${title}. Expected ${actual} to be ${expected}\n`);
    }
}

// take slices from this element + 0, 1, 2, 3, ... n -1
// [1], [1,2], [1, 2, 3], [1, 2, 3, 1]
// sum = 1, 3, (3 + 3), (6 + 1)
// keep track of how many of these sums == k
// now go to the next element

function sumEqualsK(input, k) {
    let numMatches = 0;
    for (let i = 0; i < input.length; i++) {
        let lastSum = input[i];
        for (let j = 1; j < input.length - i; j++) {
          const thisNum = input[i + j];
          const sum = lastSum + thisNum;

          if (sum === k) {
              numMatches++;
          }
          lastSum = lastSum + thisNum;
        }
    }

    return numMatches;
}

assertEqual(2, sumEqualsK([1, 1, 1], 2), 'base case');
assertEqual(4, sumEqualsK([1, 2, 3, 1, 2, 3], 6), 'bigger case');
assertEqual(5, sumEqualsK([1, -1, 0, 2, -2], 0), 'negative numbers and zeros');

