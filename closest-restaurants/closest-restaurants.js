// Given a list of 100 million (n) restaurants, write a function that takes a user's location, and
// returns to the 10 (k) nearest restaurants


// Approach
// figure out how to calculate the distance from a to b
// write a function that takes two locations and finds the distance
// initialize an array or set of the four smallest distances
// initialize a map of distances => locations
// go through the restaurants array. for each
//   - find the distance between this location and the userLocation
//   - if the result array size is < 4, add this location
//   - else remove the max distance and replace it with this distance
//   - update the map with this distance => location
//     EDGE CASE: multiple locations at the same distance
// after the full loop, use the four saved smallest distances to look up the locations

const restaurants = [
  { x: 12, y: 34 },
  { x: 19, y: 24 },
  { x: 92, y: 29 },
  { x: 48, y: 10 },
  { x: 19, y: 94 },
  { x: 01, y: 82 },
  { x: 84, y: 88 },
  { x: 40, y: 64 },
  { x: 77, y: 64 },
  { x: 74, y: 62 },
  { x: 99, y: 23 },
  { x: 40, y: 24 },
  { x: 55, y: 28 },
  { x: 76, y: 12 },
  { x: 12, y: 28 },
  { x: 32, y: 48 },
  { x: 12, y: 68 }
]

function getDistanceBetweenPoints(pointA, pointB) {
  const { x: x1, y: y1 } = pointA;
  const { x: x2, y: y2 } = pointB;
  return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

function maybeUpdateSmallestDistances(distanceFromUser, smallestDistances) {
  for (let i = 0; i < smallestDistances.length; i++) {
    const savedDistance = smallestDistances[i];
    if (distanceFromUser < savedDistance) {
      smallestDistances[i] = distanceFromUser;
      i = smallestDistances.length;
    }
  }
}


function findRestaurants(userLocation, numToFind, restaurantsList) {
  const smallestDistances = [];
  const distanceToLocationMap = {};
  restaurantsList.forEach((restaurantLocation) => {
    const distanceFromUser = getDistanceBetweenPoints(userLocation, restaurantLocation);
    distanceToLocationMap[distanceFromUser] = restaurantLocation;

    if (smallestDistances.length < numToFind) {
      smallestDistances.push(distanceFromUser);
    } else {
      maybeUpdateSmallestDistances(distanceFromUser, smallestDistances);
    }
  });
  return smallestDistances.sort().map(distance => distanceToLocationMap[distance]);
}

console.log('none', findRestaurants({x: 0, y: 0}, 0, restaurants));
console.log('bottom', findRestaurants({x: 0, y: 0}, 4, restaurants));
console.log('top', findRestaurants({x: 99, y: 99}, 4, restaurants));
console.log('exact', findRestaurants({x: 77, y: 64}, 1, restaurants));
console.log('k > n', findRestaurants({x: 55, y: 28}, 20, restaurants));
