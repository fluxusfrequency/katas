/*
 * CtCi Chapter 1, Question 5
 * One Away
 * There are three types of edits that can be performed on strings: insert a character, remove
 * a character, or replace a character. Given two strings, write a function to check if they are one
 * edit (or zero edits) away.
 * EXAMPLE
 * pale, ple -> true
 * pales, pale -> true
 * pale -> bale -> true
 * pale -> bake -> true
 */

function assertEqual(expected, actual, title = '') {
  if (expected === actual) {
    console.log(`passed: ${title} \n`);
  } else {
    console.log(`failed: ${title}, expected ${actual} to be ${expected}\n`)
  }
}

function oneAway(s1, s2) {
  // If it's 2 or more away, immediately return false
  if (Math.abs(s1.length - s2.length) > 1) {
    return false;
  }

  const areSameLength = s1.length === s2.length;

  // When the strings differ in the length, we put the longer string first
  const firstStr = s2.length > s1.length ? s2 : s1;
  const secondStr = s2.length > s1.length ? s1 : s2;
  const max = secondStr.length;
  let distance = 0;

  for (let i = 0; i < max; i++) {
    const firstCharIndex = areSameLength ? i : i + distance;
    const firstChar = firstStr[firstCharIndex];
    const secondChar = secondStr[i];
    if (firstChar !== secondChar) {
      distance++;
      if (distance.length > 1) {
        return false;
      }
    }
    // When all the characters match until the end, but s1 still has one more character,
    // We return true because the words are one trailing character away (e.g. pales + pale)
    if (!areSameLength && i === max - 1 && distance === 0) {
      return true;
    }
  }

  return distance === 1;
}

assertEqual(false, oneAway('palefg', 'pale'), 'two letters longer')
assertEqual(false, oneAway('pale', 'palefg'), 'two letters shorter')
assertEqual(false, oneAway('pale', 'pale'), 'same word')
assertEqual(true, oneAway('pale', 'bale'), 'same length, one letter off')
assertEqual(false, oneAway('pale', 'babe'), 'same length, two letters off')
assertEqual(true, oneAway('pale', 'ple'), 'one letter longer')
assertEqual(true, oneAway('pales', 'pale'), 'one letter longer 2')
assertEqual(true, oneAway('ple', 'pale'), 'one letter shorter')
assertEqual(true, oneAway('pale', 'pales'), 'one letter shorter 2')
