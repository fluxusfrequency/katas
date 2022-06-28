const assertEqual = (expected, actual, title) => {
  if (actual === expected) {
    console.log(`Passed: ${title}\n`);
  } else {
    console.log(`Failed: ${title}\nExpected ${actual} to equal ${expected}\n`);
  }
}

/* From https://interviewing.io/recordings/Javascript-Google-3/
 *
 * Write a function that takes two strings, s1 and s2, and returns the longest common subsequence of
 * s1 and s2
 * Longest seq of chars such that all appear in both strings, possibly with other chars in between
 * Order must remain the same
 */

function longestCommonSubsequence(s1, s2) {
  if (s1 === s2) {
    return s1;
  }

  if (s1 === '' || s2 === '') {
    return '';
  }

  const s1Length = s1.length;
  const s2Length = s2.length;
  const shorterLength = Math.min(s1Length, s2Length);
  const offset = Math.abs(s1Length - s2Length);
  let s1Offset = s1Length > s2Length ? offset : 0;
  let s2Offset = s1Length < s2Length ? offset : 0;

  return generatePermutationsAndCompare(s1, s2, s1Offset, s2Offset, shorterLength);
}

function generatePermutationsAndCompare(s1, s2, s1Offset, s2Offset, maxLength) {
  let s1Permutations;
  let s2Permutations;

  let lastTriedDifference = 0;
  while (lastTriedDifference < maxLength) {
    const nextToPermutateS1 = s1Permutations || s1;
    const nextToPermutateS2 = s2Permutations || s2;
    const s1LengthToTry = s1.length - lastTriedDifference - s1Offset;
    const s2LengthToTry = s2.length - lastTriedDifference - s2Offset;
    s1Permutations = generatePermutations(nextToPermutateS1, s1LengthToTry);
    s2Permutations = generatePermutations(nextToPermutateS2, s2LengthToTry);
    const match = s1Permutations.find(p => s2Permutations.indexOf(p) > -1);
    if (match) {
      return match;
    }
    lastTriedDifference++;
  }

  return '';
}

function generatePermutations(input, permutationLength) {
  let permutations = [];

  if (Array.isArray(input)) {
    permutations = input.map(s => generatePermutationsForString(s, permutationLength)).flat();
  } else {
    permutations = generatePermutationsForString(input, permutationLength);
  }
  return permutations;
}

function generatePermutationsForString(input, permutationLength) {
  const permutations = [];
  const differenceInLength = input.length - permutationLength;

  for (let i = permutationLength; i >= 0; i--) {
    const chars = input.split('');
    chars.splice(i, differenceInLength);
    permutations.push(chars.join(''));

  }
  return permutations;
}

assertEqual('', longestCommonSubsequence('asffevciiea', ''), 'empty string input');
assertEqual('aa', longestCommonSubsequence('aaaa', 'aa'), 'easy case');
assertEqual('ABAD', longestCommonSubsequence('ABAZDC', 'BACBAD'), 'same length');
assertEqual('GTAB', longestCommonSubsequence('AGGTAB', 'GXTXAYB'), 'different lengths');

//
// n = 6
// ABAZDC
//
// n = 5 // one blank rolling right to left
// ABAZD, ABAZC, ABADC, ABZDC, AAZDC, BAZDC
//
// n = 4 // two blanks rolling right to left (5), then B-X-B (4) rolling right to left, then B-X-X-B (3), B-X-X-X-B (2), B-X-X-X-X-B (1)
// ABAZ, ABAC, ABDC, AZDC, AZDC, | ABAD, ABZC, AADC, BZDC,
//
// assume strings are same length
// start with n = length of the string (6)
// if the strings are the same length and every character matches, return the whole string
//
// now try n - 1 (5)
// do a loop with an index decreasing from the new n to 0
// for the first string, take a character out at that index
// so for AGGTAB with n = 5, we take out character 5 and get AGGTA
// this becomes a candidate substring
// generate all the candidate substrings for s1 at n-1 and put them in a set
// generate all the candidate substrings for s2 at n-1 and put them in a set
// do an intersection on the sets, return the results
//
// now try n - 2
// get all the permutations of blanks
// for six items it's B-B, B-X-B, B-X-X-B, up to B-X-X-X-X-B
// (n, n + 1), (n, n + 2), (n, n + 3), (n, n + 4), (n, n + 5)
// for each blank permutation, generate all the n-2 character substrings
//
//
//
//
//
// TODO: check case where strings are not of equal length
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
////////////////////////////////////////////////////////////////////////// OLD
//
//
//  // take the first character of s1
    // compare the first character of s2
      // if they are NOT the same, go on to the next character of s2
        // repeat this comparison
      // if they ARE the same
        // store this character as a match
        // save this index from s2 as last matched index
        // go to the next block (next character of s1)
  // take the next character of s1
    // begin the s2 loop starting from the last matched index
  // when you get to the end of s1, return the match string
  //const matches = [];
  //let lastCheckedS2Idx = 0;

  //let shorterLength = Math.min(s1.length, s2.length);
  //for (let i = 0; i < shorterLength; i++) {
    //const s1Char = s1[i];
    //console.log('s1 char', s1Char);
    //for (let j = lastCheckedS2Idx; j < (s2.length - lastCheckedS2Idx); j++) {
      //const s2Char = s2[j];
      //console.log('s2 char', s2Char);
      //if (s1Char === s2Char) {
        //matches.push(s1Char);
        //console.log('match', s1Char, s2Char, i, j, matches);
        //lastCheckedS2Idx = j;
        //j = s2.length;
      //} else {
         //did not find a match
         //do nothing
      //}
    //}
  //}
  //return matches.join('');

// A, G, T, B
// AB, GT, GA, GB, TA, TB
// GTA, GTB, TAB
// GTAB
// n = 1 case
// look at the first letter in s1
// look for that letter in s2
// if you didn't find it, go to the next letter in s1
// if you did, that is a match for n = 1
// repeat for each letter in s1
//
// n = 2 case
// look at the first letter in s1
// look for that letter in s2
// if you didn't find it, go to the next letter in s1
// if you did, look at the next subsequent letter in s1
// beginning at the place where you found the match in s2, look at subsequent letters of s2 to find a match
// if you find one, the two letters form a match
// now continue from the next next letter in s1 (the one after line 4 above)
// look for matches in s2 as before
// continue until you've exhausted every letter in s1
//
// n = 3 case
// look at the first letter in s1
// if that letter doesn't start any of the matches from n = 2, go to the next letter
// look for that letter in s2
// if you didn't find it, go to the next letter in s1 (maybe store this step so we don't have to run through s2 extra times)
// if you did, store it and look at the next next letter in s1
// and look at the next subsequent letter in s1
// beginning at the place where you found the match in s2, look at subsequent letters of s2 to find a match
// if you find one, store it as well
// now continue from the next next letter in s1 (the one after line 4 above)
// look for matches in s2 as before
// if you find a third, that's a match
// continue until you've exhausted every letter in s1 (minus 3)



