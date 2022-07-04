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

// create an adjacency list
// for each node, create a node object and initialize a key in the adjacency list pointing to an empty array
// for each edge, find the appropriate key and push the second node into the adjacency list array
// begin dfs
// initalize visited array
// find the first candidate node
// for each edge, run dfs again
// return true if the target is found

function getLeftNodeFromCoordinates(coordinates, board) {
  const [x, y] = coordinates;
  const value = board[x][y - 1];
  if (value) {
    return {
      coordinates: [x, y - 1],
      value
    };
  }
}

function getRightNodeFromCoordinates(coordinates, board) {
  const [x, y] = coordinates;
  const value = board[x][y + 1];
  if (value) {
    return {
      coordinates: [x, y + 1],
      value
    };
  }
}

function getTopNodeFromCoordinates(coordinates, board) {
  const [x, y] = coordinates;
  const row = board[x - 1];
  if (row) {
    const value = row[y];
    if (value) {
      return {
        coordinates: [x - 1, y],
        value
      };
    }
  }
}

function getBottomNodeFromCoordinates(coordinates, board) {
  const [x, y] = coordinates;
  const row = board[x + 1];
  if (row) {
    const value = row[y];
    if (value) {
      return {
        coordinates: [x + 1, y],
        value
      };
    }
  }
}

// Has side effects: mutates adjacencyList
function addNodesToList(board, adjacencyList) {
  for (let i = 0; i < board.length; i++) {
    const thisRow = board[i];
    for (let j = 0; j < thisRow.length; j++) {
      adjacencyList[`${i},${j}`] = [];
    }
  }
}

// Has side effects: mutates adjacencyList
function addEdgesToList(board, adjacencyList) {
  for (let i = 0; i < board.length; i++) {
    const thisRow = board[i];
    for (let j = 0; j < thisRow.length; j++) {
      const coordinates = [i, j];
      const leftNode = getLeftNodeFromCoordinates(coordinates, board);
      const rightNode = getRightNodeFromCoordinates(coordinates, board);
      const topNode = getTopNodeFromCoordinates(coordinates, board);
      const bottomNode = getBottomNodeFromCoordinates(coordinates, board);
      const foundNodes = [leftNode, rightNode, topNode, bottomNode].filter(n => n);
      adjacencyList[`${i},${j}`] = adjacencyList[`${i},${j}`].concat(foundNodes);
    }
  }
}

function buildAdjacencyList(board) {
  const output = {};
  addNodesToList(board, output);
  addEdgesToList(board, output);
  return output;
}

function isNodeAlreadyVisited(node, visited) {
  return visited.find(oldNode => arrayEqual(oldNode.coordinates, node.coordinates)) !== undefined;
}

function dfs(adjacencyList, startNode, charsToFind, visited = [startNode]) {
  const [x, y] = startNode.coordinates;
  const neighbors = adjacencyList[`${x},${y}`];
  const nextChar = charsToFind[0];

  const matchingNeighbor = neighbors.find(n => (n.value === nextChar) && !isNodeAlreadyVisited(n, visited));

  if (matchingNeighbor && charsToFind.length === 1) {
    return true;
  }

  if (matchingNeighbor) {
    visited.push(matchingNeighbor);
    charsToFind.shift();
    return dfs(adjacencyList, matchingNeighbor, charsToFind, visited);
  }

  return false;
}

function gridSearch(board, word) {
  const adjacencyList = buildAdjacencyList(board);
  const [head, ...tail] = word;
  let foundMatch = false;
  for (let i = 0; i < board.length; i++) {
    const thisRow = board[i];
    for (let j = 0; j < thisRow.length; j++) {
      const thisChar = thisRow[j];
      if (thisChar === head) {
        const node = {
          coordinates: [i, j],
          value: thisChar
        };
        foundMatch = dfs(adjacencyList, node, [...tail]); // copy the tail in case there is more than one matching head in the board
        if (foundMatch) {
          i = board.length;
          j = thisRow.lenghth;
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

assertEqual(true, gridSearch(board, 'ABCCED'), 'Given example');
assertEqual(true, gridSearch(board, 'ASADFCSE'), 'Longer example');
assertEqual(false, gridSearch(board, 'ACCCC'), 'Nonsense');
assertEqual(false, gridSearch(board, 'ABCCES'), 'Word not found');