function expect(actual) {
  return {
    toEqual: (expected) => {
      if (actual === expected) {
        console.log(`passed: ${expected}\n`);
      } else {
        console.log(`failed: expected ${actual} to be ${expected}\n`);
      }
    }
  };
}

function knapsack(maxWeight, items) {
  const memo = {};
  return processItem(maxWeight, items.length, items, memo);
}

function processItem(weightRemaining, idx, items, memo) {
  memo[idx] = memo[idx] || {};
  const maybeMemo = memo[idx][weightRemaining];
  if (maybeMemo !== undefined) {
    return maybeMemo;
  }

  const thisItem = items[idx - 1];
  let result;
  if (weightRemaining === 0 || idx === 0) {
    result = 0;
  } else if (thisItem.weight > weightRemaining) {
    result = processItem(weightRemaining, idx - 1, items, memo);
  } else {
    const tmp1 = processItem(weightRemaining, idx - 1, items, memo); // don't choose this one
    const tmp2 = thisItem.value + processItem(weightRemaining - thisItem.weight, idx - 1, items, memo); // do choose this one
    result = Math.max(tmp1, tmp2);
  }

  memo[idx][weightRemaining] = result;
  return result;
}

let items;
expect(knapsack(100, [])).toEqual(0);
items = [{ weight: 100, value: 1 }];
expect(knapsack(10, items)).toEqual(0);
items = [
  { weight: 2, value: 5 },
  { weight: 2, value: 5 },
  { weight: 2, value: 5 },
  { weight: 2, value: 5 },
  { weight: 10, value: 21 },
];
expect(knapsack(10, items)).toEqual(21);
items = [
  { weight: 2, value: 20 },
  { weight: 2, value: 20 },
  { weight: 2, value: 20 },
  { weight: 2, value: 20 },
  { weight: 10, value: 50 },
];
expect(knapsack(10, items)).toEqual(80);
items = [
  { weight: 5, value: 10 },
  { weight: 4, value: 40 },
  { weight: 6, value: 30 },
  { weight: 4, value: 50 },
];
expect(knapsack(10, items)).toEqual(90);
items = [
  { weight: 25, value: 350 },
  { weight: 35, value: 400 },
  { weight: 45, value: 450 },
  { weight: 5, value: 20 },
  { weight: 25, value: 70 },
  { weight: 3, value: 8 },
  { weight: 2, value: 5 },
  { weight: 2, value: 5 },
];
expect(knapsack(104, items)).toEqual(900);
items = [
  { weight: 70, value: 135 },
  { weight: 73, value: 139 },
  { weight: 77, value: 149 },
  { weight: 80, value: 150 },
  { weight: 82, value: 156 },
  { weight: 87, value: 163 },
  { weight: 90, value: 173 },
  { weight: 94, value: 184 },
  { weight: 98, value: 192 },
  { weight: 106, value: 201 },
  { weight: 110, value: 210 },
  { weight: 113, value: 214 },
  { weight: 115, value: 221 },
  { weight: 118, value: 229 },
  { weight: 120, value: 240 },
];
expect(knapsack(750, items)).toEqual(1458);
