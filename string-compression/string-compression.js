/*
* From Cracking the Coding Interview, exercise 1.5
*
* Implement a method to perform basic string compression using the counts of repeated characters. For example, the string
* aabcccccaaa would become a2b1c5a3. If the "compressed" string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a-z).
*
*/

function assertEqual(expected, actual, title) {
  if (actual === expected) {
    console.log(`Passed: ${title}\n`);
  } else {
    console.log(`Failed: ${title}. Expected ${actual} to be ${expected}\n`);
  }
}

function compress(input) {
  // create a variable for the currentCharacter
  // create a variable for the current count
  // create a variable for the output
  // iterate through the string one character at a time
  // if the character != current
  //    - save the current character plus the count as a number into the output variable
  //    - set current to the char
  //    - set the count to 1
  // else
  //    - add one to the count

  const chars = input.split('');
  let result = '';
  let currentChar = '';
  let count = 0;
  for (let i = 0; i <= chars.length; i++) {
    const char = chars[i];
    if (char === currentChar) {
      count++;
    } else {
      if (count > 0) {
        result = `${result}${currentChar}${count}`;
      }
      currentChar = char;
      count = 1;
    }
  }

  return (result.length < input.length) ? result : input;
}

assertEqual('a2b1c5a3', compress('aabcccccaaa'), 'basic compression');
assertEqual('x4y2x4i1e1z2a2', compress('xxxxyyxxxxiezzaa'), 'another basic');
assertEqual('abc', compress('abc'), 'input length is shorter than output');



// REACTO, repeat, example, approach, code, test, optimize
