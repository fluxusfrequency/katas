const assertEqual = (actual, expected, title) => {
  if (actual === expected) {
    console.log(`Passed: ${title}\n`);
  } else {
    console.log(`Failed: ${title}\nExpected ${actual} to equal ${expected}\n`);
  }
}

const candyCrush = (input) => {
  if (!(typeof input === 'string')) {
    return '';
  }

  const arr = Array.from(input);
  const output = [];
  let foundATriplet = false;

  for (let i = 0; i < arr.length; i++) {
    const thisChar = arr[i];

    if (i + 2 < arr.length) {
      const nextChar = arr[i + 1];
      const nextNextChar = arr[i + 2];
      if(thisChar === nextChar && thisChar === nextNextChar) {
        foundATriplet = true;
        i += 2;
      } else {
        output.push(thisChar);
      }
    } else {
      output.push(thisChar);
    }
  }
  const result = output.join('');
  return foundATriplet ? candyCrush(result) : result;
};

const candyCrush2 = (input) => {
  if (!(typeof input === 'string')) {
    return '';
  }

  return expandCrushedVectors(crushVectors(generateVectors(input)));
};

function generateVectors(input) {
  const arr = Array.from(input);
  const counts = [];

  // Generate the vectors
  for (let i = 0; i < arr.length; i++) {
    const thisChar = arr[i];
    let j = 1;
    let currentCount = 1;
    while(arr[i + j] === thisChar) {
      currentCount += 1;
      j += 1;
    }
    counts.push([arr[i], currentCount]);
    i += j - 1;
  }

  return counts;
}

function crushVectors(vectors) {
  const stack = [];
  // combine and use vectors to generate output
  vectors.forEach(dyad => {
    const char = dyad[0];
    const count = dyad[1];
    const topOfStackDyad = stack.at(-1);

    if (count >= 3) {
      // do nothing
    } else if (stack.length > 0 && topOfStackDyad[0] === char) {
      stack.pop();
      const newCount = count + topOfStackDyad[1];
      if (newCount >= 3) {
        // do nothing
      } else {
        stack.push([char, newCount]);
      }
    } else {
      stack.push(dyad);
    }
  });

  return stack;
}

function expandCrushedVectors(crushedVectors) {
  return crushedVectors.reduce((output, dyad) => {
    return output + dyad[0].repeat(dyad[1])
  }, '');
}

//assertEqual(candyCrush('aaabbbc'), 'c', 'simple case');
//assertEqual(candyCrush('aabbbacd'), 'cd', 'two letters left behind');
//assertEqual(candyCrush('aabbccddeeedcba'), '', 'they all get crushed');
//assertEqual(candyCrush('aaabbbacd'), 'acd', 'doesnt crush in the wrong order');
//assertEqual(candyCrush(''), '', 'nothing');
//assertEqual(candyCrush(null), '', 'bad input');

assertEqual(candyCrush2('aaabbbc'), 'c', 'simple case');
assertEqual(candyCrush2('aabbbacd'), 'cd', 'two letters left behind');
assertEqual(candyCrush2('aabbccddeeedcba'), '', 'they all get crushed');
assertEqual(candyCrush2('aaabbbacd'), 'acd', 'doesnt crush in the wrong order');
assertEqual(candyCrush2(''), '', 'nothing');
assertEqual(candyCrush2(null), '', 'bad input');

