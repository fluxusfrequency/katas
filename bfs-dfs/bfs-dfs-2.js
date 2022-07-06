// https://www.youtube.com/watch?v=cWNEl4HE2OE
function arrayEqual(a1, a2) {
  if (!Array.isArray(a1) || !Array.isArray(a2)) {
    return false;
  }
  if (a1.length !== a2.length) {
    return false;
  }
  let areEqual = true;
  for (let i = 0; i < a1.length; i++) {
    const thisItem = a1[0];
    const otherItem = a2[0];
    if (Array.isArray(thisItem) && Array.isArray(otherItem)) {
      return arrayEqual(thisItem, otherItem);
    }
    if (thisItem !== otherItem) {
      areEqual = false;
    }
    return areEqual;
  }
}
function assertEqual(actual, expected, title) {
  let passed = false;
  if (Array.isArray(actual) && Array.isArray(expected)) {
    passed = arrayEqual(actual, expected);
  } else if (actual === expected) {
    passed = true;
  }

  if (passed) {
    console.log(`passed: ${title}\n`);
  } else {
    console.log(`failed: ${title}, expected ${actual} to be ${expected}\n`);
  }
}

const airports = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ');

const routes = [
  ['PHX', 'LAX'],
  ['PHX', 'JFK'],
  ['JFK', 'OKC'],
  ['JFK', 'HEL'],
  ['JFK', 'LOS'],
  ['MEX', 'LAX'],
  ['MEX', 'BKK'],
  ['MEX', 'LIM'],
  ['MEX', 'EZE'],
  ['LIM', 'BKK']
];

// mutates adjacency list
function buildAdjacencyList(routes) {
  const adjacencyList = {};
  for (const route of routes) {
    const [origin, destination] = route;
    adjacencyList[origin] = adjacencyList[origin] || [];
    adjacencyList[destination] = adjacencyList[destination] || [];
    adjacencyList[origin].push(destination);
    adjacencyList[destination].push(origin);
  }
  return adjacencyList;
}

// create adjacency list
// add nodes
// add edges
// initialize visited array
// initialize parents object
// initialize queue

// while queue
  // dequeue an item
  // get the item's neighbors
  // for each neighbor
  // if it is visited do nothing
  // if it is the target
  //   add its parent to the parents
  //   find the path back and return it
  // if it isn't visited
  //   add its parent to the parents
  //   add it to the queue
  //   add it to visited
  // 
  
function rebuildPath(start, foundDestination, parents) {
  const path = [foundDestination];
  let nextParent = parents[foundDestination];
  while (nextParent !== undefined && nextParent !== start) {
    path.unshift(nextParent);
    nextParent = parents[nextParent];
  }
  path.unshift(start);
  return path;
}

function bfs(start, target, routes) {
  const adjacencyList = buildAdjacencyList(routes);
  const visited = [];
  const queue = [start];
  const parents = {};

  while (queue.length > 0) {
    const thisItem = queue.shift();
    
    const destinations = adjacencyList[thisItem];
    for (const destination of destinations) {
      if (destination === target) {
        parents[destination] = thisItem;
        return rebuildPath(start, destination, parents);
      } else if (!visited.includes(destination)) {
        visited.push(destination);
        queue.push(destination);
        parents[destination] = thisItem;
      }
    }
  }
  
}

assertEqual(['PHX', 'LAX', 'MEX', 'BKK'], bfs('PHX', 'BKK', routes), 'Search for Phoenix');
