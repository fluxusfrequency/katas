const assertEqual = (actual, expected, title) => {
  if (actual === expected) {
    console.log(`Passed: ${title}\n`);
  } else {
    console.log(`Failed: ${title}\nExpected ${actual} to equal ${expected}\n`);
  }
}

function generateVectors(input) {
  const vectors = [];

  // Split the string into characters
  const chars = input.split('');
  // Keep track of the current character
  let currentChar = '';
  // Keep track of how many times the current character has shown up
  let currentCharCount = 0;
  // Read the characters from left to right
  for (let i = 0; i <= chars.length; i++) {
    const thisChar = chars[i];
    // if this character is different from the current character
    if (thisChar === currentChar) {
      // increment the count
      currentCharCount++;
    } else {
      if (currentChar !== '') {
        // save the old currentCharacter and its count into a vector
        const vector = [currentChar, currentCharCount];
        // push the vector into the vectors array
        vectors.push(vector);
      }
      // set the current character to this character
      currentChar = thisChar;
      // set the count to 1
      currentCharCount = 1;
    }
  }

  return vectors;
}

function crushVectors(vectors) {
  const stack = [];

  // go through the vectors
  vectors.forEach(v => {
    const [char, count] = v;
    
    const topVector = stack.at(-1);
    const [topChar, topCount] = topVector || [];

    if (count > 2) {
      // if the value is greater than 2, do nothing with it
    } else if (stack.length > 0 && char === topChar) {
      // else if there is anything in the stack
      // check if the top item matches the current vector
      // if so, pop it
      stack.pop();
      // combine their counts
      const newCount = count + topCount;
      if (newCount > 2) {
        // if the combined count is greater than 2, do nothing
      } else {
      // else add the combined total vector into the stack
        stack.push([char, newCount]);
      }
    } else {
      // else if there is nothing in the stack, just add this vector to the stack
      stack.push(v);
    }
  });
  return stack;
}

function stringifyStack(stack) {
  return stack.reduce((result, item) => {
    const [char, count] = item;
    result = result + char.repeat(count);
    return result;
  }, '');
}

const candyCrush = (input) => {
  if (!input) {
    return '';
  }

  return stringifyStack(crushVectors(generateVectors(input)));
};

assertEqual(candyCrush(''), '', 'nothing');
assertEqual(candyCrush(null), '', 'bad input');
assertEqual(candyCrush('aaabbbc'), 'c', 'simple case');
assertEqual(candyCrush('aabbbacd'), 'cd', 'two letters left behind');
assertEqual(candyCrush('aabbccddeeedcba'), '', 'they all get crushed');
assertEqual(candyCrush('aaabbbacd'), 'acd', 'doesnt crush in the wrong order');