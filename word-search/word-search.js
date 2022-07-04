// From https://interviewing.io/recordings/Javascript-FAANG-11/

function arrayEqual(arr, other) {
  if(!Array.isArray(arr) || !Array.isArray(other)) {
    return false;
  }

  if(arr.length !== other.length) {
    return false;
  }

  let result = true;
  for (let i = 0; i < arr.length; i++) {
    const thisItem = arr[i];
    const otherItem = other[i];
    if (Array.isArray(thisItem) && Array.isArray(otherItem)) {
      return arrayEqual(thisItem, otherItem);
    }
    if (arr[i] !== other[i]) {
      result = false;
    }
  }
  return result;
}

function assertEqual(expected, actual, title) {
  if (Array.isArray(actual) && Array.isArray(expected) && arrayEqual(actual, expected)) {
    console.log(`Passed: ${title}`);
  } else if (actual === expected) {
    console.log(`Passed: ${title}`);
  } else {
    console.log(`Failed: ${title}. Expected ${actual} to be ${expected}`);
  }
}

/*
Grid search
Given an m x n grid of characters board and a string word, return true if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.
The same letter cell me not be used more than once.
input board =
[
['A', 'B', 'C', 'E'],
['S', 'F', 'C', 'S'],
['A', 'D', 'E', 'E'],
]

word = 'ABCCED'

output = true
*/

// split the word on characters
// for the first character, find it in the first row
// write a function to look left and right in the row
// write a function to look left and right in the column
// DFS
// when a match is found for the next character
// recursively call for that character until we find another match
// when all of the string is found, return true
// if no matches are found, continue looking for any other matches of the first character
// repeat

function findCharacterAdjacent(startCharCoords, targetChar, board, omitDirection) {
  const [x, y] = startCharCoords;
  const left = board[x][y - 1];
  const right = board[x][y + 1];
  
  let top;
  let bottom;
  if (board[x-1]) {
    top = board[x - 1][y];
  }
  if (board[x+1]) {
    bottom = board[x + 1][y];
  }
  if (left === targetChar && !(omitDirection === 'left')) {
    return {
      direction: 'left',
      coordinates: [x, y - 1]
    };
  }
  if (right === targetChar && !(omitDirection === 'right')) {
    return {
      direction: 'right',
      coordinates: [x, y + 1]
    };
  }
  if (top === targetChar && !(omitDirection === 'top')) {
    return {
      direction: 'top',
      coordinates: [x - 1, y]
    };
  }
  if (bottom === targetChar && !(omitDirection === 'bottom')) {
    return {
      direction: 'bottom',
      coordinates: [x + 1, y]
    };
  }
}

function reverseDirection(direction) {
  if (direction === 'top') {
    return 'bottom';
  }
  if (direction === 'bottom') {
    return 'top';
  }
  if (direction === 'left') {
    return 'right';
  }
  if (direction === 'right') {
    return 'left';
  }
}

function gridSearch(board, word) {
  let foundMatch = false;
  const chars = word.split('');
  const [head, ...tail] = chars;
  
  for (let i = 0; i < board.length; i++) {
    const thisRow = board[i];
    for (let j = 0; j < thisRow.length; j++) {
      const thisChar = thisRow[j];
      if (thisChar === head) {
        let remainingTail = [...tail];
        let lastFoundCharCoords = [i, j]; // start with head
        let matchComplete = true;
        const visitedCoords = [lastFoundCharCoords];
        let lastDirection;
        while (remainingTail.length > 0) {
          const nextChar = remainingTail.shift();
          const foundLocationForNextChar = findCharacterAdjacent(lastFoundCharCoords, nextChar, board, reverseDirection(lastDirection));
          if (foundLocationForNextChar) {
            lastDirection = foundLocationForNextChar.direction;
            visitedCoords.push(foundLocationForNextChar.coordinates);
            lastFoundCharCoords = foundLocationForNextChar.coordinates;
          } else {
            matchComplete = false;
            remainingTail = [];
          }
        }
        if (matchComplete) {
          foundMatch = true;
        }
      }
    }
  }
  return foundMatch;
}

const board = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
];

assertEqual([0, 2], findCharacterAdjacent([0, 1], 'C', board).coordinates, 'Check left right B in the first row');
assertEqual('right', findCharacterAdjacent([0, 1], 'C', board).direction, 'Check left right B in the first row');
assertEqual([1, 1], findCharacterAdjacent([0, 1], 'F', board).coordinates, 'Check top bottom B in the first row');
assertEqual('bottom', findCharacterAdjacent([0, 1], 'F', board).direction, 'Check top bottom B in the first row');
assertEqual([2, 0], findCharacterAdjacent([1, 0], 'A', board, 'top').coordinates, 'Multiple matches omit top');
assertEqual('bottom', findCharacterAdjacent([1, 0], 'A', board, 'top').direction, 'Multiple matches omit top');
assertEqual(undefined, findCharacterAdjacent([0, 1], 'S', board), 'Check for bad char around B in the first row');
assertEqual(true, gridSearch(board, 'ABCCED'), 'Given example');
assertEqual(true, gridSearch(board, 'ASADFCSE'), 'Longer example');
assertEqual(false, gridSearch(board, 'ABCCES'), 'Word not found');