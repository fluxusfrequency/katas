/*
 * From https://start.interviewing.io/interview/Jvn9AkMsZIlb/replay
*/


function assertEqual(expected, actual, title) {
  if (actual === expected) {
    console.log(`Passed: ${title}`);
  } else {
    console.log(`Failed: ${title}. Expected ${actual} to be ${expected}`);
  }
}

/*
 * Write a function that takes two strings as arguments, s and p, and returns a boolean denoting
 * whether s matches p
 *
 * p is a sequence of any number of the following
 * 1. a-z - which stands for itself
 * 2. . - which matches any character
 * 3. * - which matches 0 or more occurrences of the previous single character
 */

  // case 1
  // p contains no wildcards, s and p are of different lengths
  // return false
  // case 2
  // p contains no wildcards, s and p are of the same length
  // compare each pair,
  //  if they are the same or the p character is a dot, continue
  //  if they are different, return false and stop
  // case 3
  // p contains wildcards
  // begin comaring pairs as in case 2
  // at each step, check the next character in p
  //   if it is a *, store the current character in p as the wildcard match
  //   start compaing p by the following character after this one (to account for the wildcard)
  //
  //   subcase 1
  //   the character is matched one time
  //   c a b / c a * b
  //   i = 0, j = 0, c == c
  //   i = 1, j = 1,  a == a (next = *, so currentWildcard = a, continue through s until the character
  //   changes (which is the next one), compare to next character in p (increment j to account for
  //   the *))
  //   while s[i] == currentWildcard; i++
  //   i = 2, j = 3, b == b (i + 1)
  //     same as subcase 3
  //
  //   subcase 2
  //   the character is matched zero times
  //   c b / c a * b
  //   i = 0, j = 0, c == c
  //   i = 1, j = 1, b != a (next = *, so currentWildcard = a, wildcard doesn't match, so go to next
  //   character in p (j += 2)
  //   i = 1, j = 3, b == b
  //
  //
  //   subcase 3
  //   the character is matched n times
  //   c a a a a a a a b / c a * b
  //   i = 0, j = 0, c == c
  //   i = 1, j = 1, a == a (next = *, so currentWildcard = a, continue through s until the character
  //   changes, compare to the next character in p (j += 1)
  //   i = 8, j = 3, b == b
  //
  //
  //
  // edge cases
  // bad inputs, empty strings, null, undefined
  // matching non a-z characters should throw or return false
  // dot followed by star (get current character from s instead of p)

function validateChar(char) {
  const wildcards = ['.', '*'];
  const charCode = char.charCodeAt(0);
  const isWildcard = wildcards.find(w => w === char) !== undefined;
  return isWildcard || (charCode >= 97 && charCode <= 122);
}

function doesCharMatchRegexChar(sChar, pChar) {
  if (!validateChar(sChar) || !validateChar(pChar)) {
    return false;
  }
  return (sChar === pChar) || pChar === '.';
}

function compareNonWildcardStrings(s, p) {
  if (s.length !== p.length) {
    return false;
  } else {
    let isMatch = true;
    for (let i = 0; i < s.length; i++) {
      const currentS = s[i];
      const currentP = p[i];
      if (!doesCharMatchRegexChar(currentS, currentP)) {
        isMatch = false;
      }
    }
    return isMatch;
  }
}

function compareWildcardStrings(s, p) {
  let isMatch = true;
  let i = 0;
  let j = 0;
  let currentWildcard = null;

  while (i < s.length && j < p.length) {
    const currentS = s[i];
    const currentP = p[j];

    // wildcard matching
    if (p[j + 1] === '*') {
      currentWildcard = currentP;
      while (s[i] === currentWildcard) {
        i++;
      }
      j = j + 2;
    }

    // non wildcard matching
    if (!doesCharMatchRegexChar(currentS, currentP)) {
      isMatch = false;
      break;
    } else {
      i++;
      j++;
    }
  }

  return isMatch;
}

function regex(s, p) {
  if (!(typeof s === 'string' && typeof p === 'string')) {
    return false;
  }
  const containsWildcards = p.indexOf('*') > -1;

  if (!containsWildcards) {
    return compareNonWildcardStrings(s, p);
  } else {
    return compareWildcardStrings(s, p);
  }
}


assertEqual(false, regex('aba', 'ab'), 'missing a character');
assertEqual(true, regex('ab', 'ab'), 'same string');
assertEqual(true, regex('ab', 'a.'), 'basic dot');
assertEqual(true, regex('cab', 'ca*b'), 'wildcard with exactly one match');
assertEqual(true, regex('aa', 'a*'), 'wildcard');
assertEqual(false, regex('ab', '.'), 'pattern too short');
assertEqual(true, regex('aab', 'c*a*b'), 'wildcard with zeroes');
assertEqual(true, regex('caaaaaab', 'ca*b'), 'wildcard with zeroes');
assertEqual(true, regex('aaa', 'a*'), 'wildcard with multi repeat');
assertEqual(true, regex('ab', '.*'), 'dot and wildcard');
assertEqual(true, regex('abbbbc', 'a.*c'), 'dot and multi wildcard');
assertEqual(true, regex('ac', 'a.*c'), 'dot and empty wildcard');
assertEqual(false, regex('abc', undefined), 'bad input 1');
assertEqual(false, regex(undefined, 'abc'), 'bad input 2');
assertEqual(false, regex('abc', null), 'bad input 3');
assertEqual(false, regex(null, 'abc'), 'bad input 4');
assertEqual(false, regex('abc', 12), 'bad input 5');
assertEqual(false, regex(12, 'abc'), 'bad input 6');
assertEqual(false, regex(null, undefined), 'bad input 7');
assertEqual(true, regex('', '.*'), 'dot star on empty string');
assertEqual(false, regex('AAA', 'aaa'), 'upper case');
assertEqual(false, regex('AAA', 'A*'), 'upper case with wildcard');
