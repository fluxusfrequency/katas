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

function assertEqual(actual, expected, title) {
  if (actual === expected) {
    console.log(`passed: ${title}\n`);
  } else {
    console.log(`failed: ${title}, expected ${actual} to be ${expected}\n`);
  }
}

function addedOneCharacter(s1, s2) {
  if (s2.length - s1.length !== 1) {
    return false;
  }

  let result = true;
  let isOffset = false;

  for (let i = 0; i < s1.length; i++) {
    if (!isOffset) {
      if (s1[i] !== s2[i]) { // they were the same until now
        isOffset = true;
      } else {
        // they match, continue checking
      }
    } else {
      if (s1[i - 1] !== s2[i]) { // the characters didn't match, return false
        result = false;
        i = s2.length;
      }
    }
  }
  return result;

}

function removedOneCharacter(s1, s2) { // pale, ple... (p,p), (a,l), (l, l)
  if (s1.length - s2.length !== 1) {   //               0 0    1
    return false;
  }

  let result = true;
  let isOffset = false;

  for (let i = 0; i < s2.length; i++) {
    if (!isOffset) {
      if (s1[i] !== s2[i]) { // they were the same until now
        isOffset = true;
      } else {
        // they match, continue checking
      }
    } else {
      if (s1[i] !== s2[i - 1]) { // the characters didn't match, return false
        result = false;
        i = s2.length;
      }
    }
  }
  return result;
}

function changedOneCharacter(s1, s2) {
  if (s1.length !== s2.length) {
    return false;
  }

  let changedCount = 0;

  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      changedCount++;
      if (changedCount > 1) {
        return false;
      }
    }
  }
  return changedCount === 1;
}

function isOneAway(s1, s2) {
  if (!(typeof s1 === 'string') || !(typeof s2 === 'string')) {
    return undefined;
  }

  const checked = addedOneCharacter(s1, s2) || removedOneCharacter(s1, s2) || changedOneCharacter(s1, s2);
  return checked || false;
}

assertEqual(false, isOneAway('pale', ''), 'empty string');
assertEqual(undefined, isOneAway('pale', undefined), 'wrong input gives undefined');
assertEqual(undefined, isOneAway('pale', undefined), 'wrong input gives undefined 2');
assertEqual(true, isOneAway('pale', 'ple'), 'remove a letter');
assertEqual(false, isOneAway('pale', 'le'), 'remove two letters');
assertEqual(true, isOneAway('pale', 'pales'), 'add a letter');
assertEqual(false, isOneAway('pale', 'palest'), 'add two letters');
assertEqual(true, isOneAway('pale', 'bale'), 'change a letter');
assertEqual(false, isOneAway('pale', 'bake'), 'change two letters');
assertEqual(false, isOneAway('pale', 'coke'), 'change three letters');
assertEqual(false, isOneAway('pale', 'baler'), 'change a letter and add one');
assertEqual(false, isOneAway('pale', 'bae'), 'change a letter and remove one');
