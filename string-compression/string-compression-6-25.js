/*
* From Cracking the Coding Interview, exercise 1.5
*
* Implement a method to perform basic string compression using the counts of repeated characters. For example, the string
* aabcccccaaa would become a2b1c5a3. If the "compressed" string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a-z).
*
*/

function assertEqual(expected, actual, message) {
  if (expected === actual) {
    console.log(`PASS: ${message}\n`);
  } else {
    console.log(`FAIL: ${message}, expected ${actual} to be ${expected}\n`)
  }
}

function compress(input) {
  // create an output array to build up and later join
  // create a variable for the current repeating character ("a")
  // create a count for the current repeating character
  // create a pointer for the current character index
  // step through the string using the index
  // if this char == the repeating char, increment the counter
  // if this char != the repeating char, push the previous repeating char and count into the array,
  //   then update the repeating char variable to the new char, and reset the counter to 1

  if (!input || typeof input !== 'string') {
    return '';
  }

  let output = [];
  let currentValue = input[0];
  let counter = 1;

  for (let i = 1; i < input.length; i++) {
    const newValue = input[i];
    if (currentValue === newValue) {
      counter++;
    } else {
      output.push(`${currentValue}${counter}`);
      counter = 1;
      currentValue = newValue;
    }
  }
  // Account for the final grouping
  output.push(`${currentValue}${counter}`);

  // Only return the compressed version if shorter than the input
  if (output.length * 2 < input.length) { // we multiply by two because each item in the array is 2 characters (e.g. "a3")
    return output.join('');
  } else {
    return input;
  }
}

assertEqual('', compress(''), 'empty string');
assertEqual('', compress(null), 'bad input 1');
assertEqual('', compress(5), 'bad input 2');
assertEqual('', compress(undefined), 'bad input 3');
assertEqual('', compress({}), 'bad input 4');
assertEqual('a2b1c5a3', compress('aabcccccaaa'), 'base case');
assertEqual('aabb', compress('aabb'), 'not shorter');
assertEqual('a2b8c1d4', compress('aabbbbbbbbcdddd'), 'another string')