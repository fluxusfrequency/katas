/*
 * From
 * https://start.interviewing.io/interview/Lcq10f9WJSlU/replay
 *
 *
 */

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
      const passed = arrayEqual(thisItem, otherItem);
      if (!passed) {
        result = false;
      }
    } else if (arr[i] !== other[i]) {
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

// Point = int x, int y
// List<Point> points = {{0,1},{1,-3},{2,4},{1,1},{13,-2}}
// Point origin = {1,1}
// int k = 2
//
// Given an origin point x,y, a list of points, and a number k, find the k points that is closest to the origin
//
  // case 0, k = 0
  //   return an empty array
  // case 1, k = 1
  //   initialize a hashmap { distance: [points] }
  //   for each point, calculate the distance from it to origin
  //   call math.min on Object.keys of the hashmap
  //   return that point
  // case 2, k > 1
  //   same as above, except instead of math.min, sort the keys, take k, and grab their values from
  //   the map
  //
  // distance between two points
  //        |
  //        |
  //        |   y
  //        |x
  // ----------------
  //        |
  //        |
  //        |
  //        |
  // x = 1, 1
  // y = 4, 2
  // a = x2 - x1 = 4 - 1 = 3
  // b = y2 - y1 = 2 - 1 = 1
  // c = sqrt(3^2 + 1^2) = sqrt(10)


const points = [[0, 1], [1, -3], [2, 4], [1, 1], [13, -2]];
const points2 = [[4, 2], [-2, 2], [3, 5]];

function getDistanceBetweenTwoPoints(p1, p2) {
  const horizontalDistance = Math.abs(p2[0] - p1[0]);
  const verticalDistance = Math.abs(p2[1] - p1[1]);
  return Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2);
}

function findClosestPoints(origin, pointList, k) {
  if (k < 1) {
    return [];
  }
  if (k > points.length) {
    return points;
  }

  const distanceToPoints = {};
  for (let i = 0; i < pointList.length; i++) {
    const thisPoint = pointList[i];
    const distance = getDistanceBetweenTwoPoints(origin, thisPoint);
    distanceToPoints[distance] = distanceToPoints[distance] || [];
    distanceToPoints[distance].push(thisPoint);
  }
  const distancesAsFloats = Object.keys(distanceToPoints).map(s => Number(s));
  const sortedKeys = distancesAsFloats.sort((a, b) => a - b);
  const closestKeys = sortedKeys.slice(0, k);

  let numPointsLeftToFind = k;
  let result = [];
  while (numPointsLeftToFind > 0) {
    const nextKey = sortedKeys.shift();
    const foundPoints = distanceToPoints[nextKey.toString()];
    result = result.concat(foundPoints);
    numPointsLeftToFind = numPointsLeftToFind - foundPoints.length;
  }

  return result;
}

assertEqual([], findClosestPoints([0, 0], points, 0), 'k < 1');
assertEqual(points, findClosestPoints([1, 1], points, 20), 'k > points.length');
assertEqual([[0, 1]], findClosestPoints([0, 0], points, 1), 'closest to origin');
assertEqual([[1, 1], [0, 1]], findClosestPoints([1, 2], points, 2), 'k > 1');
assertEqual([[4, 2], [-2, 2]], findClosestPoints([1, 1], points2, 2), 'two points equidistant');
assertEqual([[1,1],[0,1],[2,4],[1,-3]], findClosestPoints([1, 1], points, 4), 'bigger chunk');

