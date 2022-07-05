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
Grid search (shortest path)
Given an m x n grid of characters board, a starting character, and a target character, return the shortest path to the target
If there are more than one path of equal length, return any path

The path can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.
The same letter cell me not be used more than once for a given path

input board =
[
['A', 'B', 'C', 'F'],
['S', 'F', 'C', 'S'],
['A', 'D', 'E', 'X'],
]

start = 'A'
output = 'ADEX'

start = 'B'
target = 'E'
output = ['BFDE', 'BCCE', 'BFCE']

*/

// create an adjacency list
// for each node, create a node object and initialize a key in the adjacency list pointing to an empty array
// for each edge, find the appropriate key and push the second node into the adjacency list array
// begin looking through the board until we find a candidate first node
// begin BFS
// initialize visited array
// initialize queue with candidate
// initialize parents object
// while queue.length; grab the next item in the queue
//   if target == item; return the item's value
//   else get neighbors from adjacency list
//     for each neighbor
//       if neighbor's value == target
//         construct return path from parents object
//       else if neighbor not visited
//         add to queue
//         add to visited
//         add its parent
// repeat for other candidate nodes

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

// create an adjacency list
// for each node, create a node object and initialize a key in the adjacency list pointing to an empty array
// for each edge, find the appropriate key and push the second node into the adjacency list array
// begin looking through the board until we find a candidate first node
// begin BFS
// initialize visited array
// initialize queue with candidate
// initialize path array
// initialize n (levelsCount) to 0
// while queue.length; grab the next item in the queue
//   if target == item; return true
//   else get neighbors from adjacency list
//     for each neighbor
//       if neighbor == target
//         add to path
//         return path
//       else if neighbor not visited
//         add to path
//         add to queue
//         add to visited
//       path.pop() to get rid of neighbot that didn't match
//   remove n items from the end
//   n++
//
//
// A
// B, S
// S, C, F
// C, F, A
// F, A, F, C
// A, F, C, D
// F, C, D
// C, D, S
// D, S, E
// S, E
// E, X
// E
// X
//
//['A', 'B', 'C', 'F'],
//['S', 'F', 'C', 'S'],
//['A', 'D', 'E', 'X'],
//
// A B S C F A F C D S E X
//
// A
// A, B
// A, S
// A, B, C
// A, B, F
// A, S, F
// A, B, C, F
// A, B, C, C
// A, B, F, C
// A, B, F, D
// A, B, C, F, S
// A, B, C, C, E
// A, B, C, F, S, X
//
function findPath(endNode, startNode, parents) {
  const results = [endNode.value];
  const [x, y] = endNode.coordinates;
  let nextParent = parents[`${x},${y}`];
  while (nextParent && nextParent !== startNode) {
    results.unshift(nextParent.value);
    const [n, m] = nextParent.coordinates;
    nextParent = parents[`${n},${m}`];
  }
  results.unshift(startNode.value);
  return results;
}

function bfs(startNode, target, adjacencyList) {
  const queue = [startNode];
  const visited = [];
  const parents = {};

  if (startNode.value === target) {
    return startNode.value;
  }

  while (queue.length > 0) {
    const nextNode = queue.shift();
    const [x, y] = nextNode.coordinates;
    const neighbors = adjacencyList[`${x},${y}`];

    for (let thisNeighbor of neighbors) {
      const alreadyVisited = visited.some(v => arrayEqual(v.coordinates, thisNeighbor.coordinates) && v.value === thisNeighbor.value);
      const [n, m] = thisNeighbor.coordinates;
      if (thisNeighbor.value === target) {
        parents[`${n},${m}`] = nextNode;
        const path = findPath(thisNeighbor, startNode, parents);
        return path.join('');
      } else if (!alreadyVisited) {
        queue.push(thisNeighbor);
        visited.push(thisNeighbor);
        parents[`${n},${m}`] = nextNode;
      }
    }
  }
}

function gridSearch(board, start, target) {
  const adjacencyList = buildAdjacencyList(board);
  let shortestPath;
  for (let i = 0; i < board.length; i++) {
    const thisRow = board[i];
    for (let j = 0; j < board.length; j++) {
      const thisChar = board[i][j];
      const thisNode = {
        coordinates: [i, j],
        value: thisChar
      };
      if (thisChar === start) {
        const path = bfs(thisNode, target, adjacencyList);
        if (path !== undefined && (shortestPath === undefined || path.length < shortestPath.length)) {
          shortestPath = path;
        }
      }
    }
  }

  return shortestPath;
}

const board = [
  ['A', 'B', 'C', 'F'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'X'],
];

assertEqual('A', gridSearch(board, 'A', 'A'), 'Identity');
assertEqual('ADEX', gridSearch(board, 'A', 'X'), 'Given example');
assertEqual('BCCE', gridSearch(board, 'B', 'E'), 'Multiple matches');
