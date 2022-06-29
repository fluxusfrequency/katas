function arrayEqual(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    const thisItem = arr1[i];
    const otherItem = arr2[i];
    if (Array.isArray(thisItem) && Array.isArray(otherItem)) {
      return arrayEqual(thisItem, otherItem);
    } else if (thisItem !== otherItem) {
      return false;
    }
  }

  return true;
}

function assertEqual(expected, actual, title) {
  let passed = true;
  if (typeof expected === 'object' && typeof actual === 'object') {
    for (let key in expected) {
      const thisValue = expected[key];
      const otherValue = actual[key];
      if (Array.isArray(thisValue) && Array.isArray(otherValue)) {
        if (!arrayEqual(thisValue, otherValue)) {
          passed = false;
        }
      } else if (thisValue !== otherValue) {
        passed = false;
      }
    }
  } else if (expected !== actual) {
    passed = false;
  }

  if (passed) {
    console.log(`Passed: ${title}\n`);
  } else {
    console.log(`Failed: ${title}. Expected ${actual} to be ${expected}\n`);
  }
}

const users = 'bob alice jim jane ben sarah dave kiran phillip lumin'.split(' ');

const follows = [
  ['ben', 'kiran'],
  ['kiran', 'ben'],
  ['bob', 'jim'],
  ['jane', 'sarah'],
  ['phillip', 'dave'],
  ['lumin', 'ben'],
  ['kiran', 'lumin'],
  ['jane', 'jim'],
  ['lumin', 'jane'],
  ['dave', 'phillip'],
  ['jane', 'alice'],
  ['ben', 'bob'],
  ['bob', 'jane']
];

// DFS: Does ben have a path to alice?
// BFS: What is the shortest path from ben to alice


const adjacencyList = {
  // ben: ['kiran', 'bob'], etc
};

function addNode(user) {
  adjacencyList[user] = [];
}

function addEdge(follow) {
  const [follower, followee] = follow;
  adjacencyList[follower].push(followee);
}

users.forEach(addNode);

assertEqual({
  bob: [],
  alice: [],
  jim: [],
  jane: [],
  ben: [],
  sarah: [],
  dave: [],
  kiran: [],
  phillip: [],
  lumin: []
}, adjacencyList, 'adding users');

follows.forEach(addEdge);

assertEqual({
  bob: [ 'jim', 'jane' ],
  alice: [],
  jim: [],
  jane: [ 'sarah', 'jim', 'alice' ],
  ben: [ 'kiran', 'bob' ],
  sarah: [],
  dave: [ 'phillip' ],
  kiran: [ 'ben', 'lumin' ],
  phillip: [ 'dave' ],
  lumin: [ 'ben', 'jane' ]
}, adjacencyList, 'adding edges');

// use the adjacency list to see who follower follows
// start with the first person in that list
// check if they are alice
// if so, return true
// if not, add this person to the visited list
// recursively call dfs on this person
// once we have checked all the leaf people,
// continue with the next person in the list

// Returns a boolean telling whether the follower has an edge to the followee
function dfs(graph, follower, followee, checked = [follower]) {
  const followees = graph[follower];

  if (followees.indexOf(followee) >= 0) {
    return true;
  }

  for (let f of followees) {
    if (!checked.includes(f)) {
      checked.push(f);
      return dfs(graph, f, followee, checked);
    }
  };

  return false;
}

assertEqual(true, dfs(adjacencyList, 'ben', 'alice'), 'ben n-follows alice');
assertEqual(false, dfs(adjacencyList, 'ben', 'dave'), 'ben does not n-follow dave');

// initialize a path variable with the follower in it
// initialize a queue with the follower in it
// use the adjacency list to see who follower follows
// start with the first person in that list
// check if they are the target
// if so, add them to the path and return it
// if not, add this person to the queue and the path
// go to the next person in the initial follower list
// once we have checked all the people in the first list, clear the path, dequeue the next person and continue
//
// bob: [ 'jim', 'jane' ],
// alice: [],
// jim: [],
// jane: [ 'sarah', 'jim', 'alice' ],
// ben: [ 'kiran', 'bob' ],
// sarah: [],
// dave: [ 'phillip' ],
// kiran: [ 'ben', 'lumin' ],
// phillip: [ 'dave' ],
// lumin: [ 'ben', 'jane' ]

// r1 currentUser = ben, queue = [ben], path = [ben]
//   check kiran, false, queue = [kiran], path = [ben, kiran]
//   check bob, false, queue = [kiran, bob], path = [ben, bob]
// r2 currentUser = kiran, queue = [bob], path = [ben, kiran]
//   check ben, false, queue = [bob], path = [ben, kiran, ben]
//   check lumin, false, queue = [bob, lumin], path = [ben, kiran, lumin]
// r3 currentUser = bob, queue = [lumin], path = [ben, bob]
//   check jim, false, queue = [lumin, jim], path = [ben, bob, jim]
//   check jane, true, path = [ben, bob, jane]

// Returns the shortest follow path from the follower to the followee
function bfs(graph, follower, followee) {
  const queue = [follower];
  const checked = [];
  const path = [];
  let n = 0; // number of levels deep

  while (queue.length > 0) {
    const currentUser = queue.shift();
    const followees = graph[currentUser];
    path.push(currentUser);

    for (let f of followees) {
      if (f === followee) { // Found the target
        path.push(followee);
        return path;
      } else if (!checked.includes(f)) { // Have not yet checked this followee
        path.push(f);
        queue.push(f);
        checked.push(f);
      }
      // Remove the current user, as their path did not lead to a solution
      path.pop();
    }

    // Remove n users from the end of the path, one for each level deep
    // This leaves behind the original follower and whichever users we have gone down the tree with
    path.splice(path.length - n, n);
    n++;
  }
  return [];
}

assertEqual(['ben', 'bob', 'jane'], bfs(adjacencyList, 'ben', 'jane'), 'shortest path from ben to jane');
assertEqual(['lumin', 'jane'], bfs(adjacencyList, 'lumin', 'jane'), 'shortest path from lumin to jane');
assertEqual(['lumin', 'jane', 'jim'], bfs(adjacencyList, 'lumin', 'jim'), 'shortest path from lumin to jim');

