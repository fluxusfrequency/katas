/*
Given the position of two queens on a chess board, indicate whether or not they are positioned so that they can attack each other.

In the game of chess, a queen can attack pieces which are on the same row, column, or diagonal.

A chessboard can be represented by an 8 by 8 array.

So if you're told the white queen is at (2, 3) and the black queen at (5, 6), then you'd know you've got a set-up like so:

_ _ _ _ _ _ _ _
_ _ _ _ _ _ _ _
_ _ _ W _ _ _ _
_ _ _ _ _ _ _ _
_ _ _ _ _ _ _ _
_ _ _ _ _ _ B _
_ _ _ _ _ _ _ _
_ _ _ _ _ _ _ _


You'd also be able to answer whether the queens can attack each other. In this case, that answer would be yes, they can, because both pieces share a diagonal.

A queen must be placed on a valid position on the board. Two queens cannot share the same position.

If a position has not been given, the queens are at their default starting positions. That's the bottom row (1) for the white queen and the top row (8) for the black queen. Both queens start in the fourth column (d).

  a b c d e f g h
8 _ _ _ B _ _ _ _ 8
7 _ _ _ _ _ _ _ _ 7
6 _ _ _ _ _ _ _ _ 6
5 _ _ _ _ _ _ _ _ 5
4 _ _ _ _ _ _ _ _ 4
3 _ _ _ _ _ _ _ _ 3
2 _ _ _ _ _ _ _ _ 2
1 _ _ _ W _ _ _ _ 1
  a b c d e f g h
 */

function assertEqual(actual, expected, title) {
  if (actual === expected) {
    console.log(`Passed: ${title}\n`);
  } else {
    console.log(`Failed: ${title}. Expected ${actual} to equal ${expected}.\n`);
  }
}

function queenAttack(placements) {
  const { black, white } = placements;
  const board = buildBoard(black, white);
  console.log(board.join('\n'));
  const sameRow = black[0] === white[0];
  const sameColumn = black[1] === white[1];
  const sameDiagonal = Math.abs(black[1] - white[1]) === Math.abs(black[0] - white[0]);
  return sameRow || sameColumn || sameDiagonal;
}

function buildBoard(blackPlacement, whitePlacement) {
  const rows = [];
  for (let i = 0; i < 8; i++) {
    const col = []
    for (let j = 0; j < 8; j++) {
      if (whitePlacement[0] === i && whitePlacement[1] === j) {
        col.push('W');
      } else if (blackPlacement[0] === i && blackPlacement[1] === j) {
        col.push('B');
      } else {
        col.push('_');
      }
    }
    rows.push(col);
  }
  return rows;
}

assertEqual(false, queenAttack({ white: [2, 4], black: [6, 6] }), 'cannot attack');
assertEqual(true, queenAttack({ white: [2, 4], black: [2, 6] }), 'can attack in same row');
assertEqual(true, queenAttack({ white: [2, 5], black: [4, 5] }), 'can attack in same column');
assertEqual(true, queenAttack({ white: [2, 2], black: [0, 4] }), 'can attack diagonally');
assertEqual(true, queenAttack({ white: [2, 2], black: [3, 1] }), 'can attack diagonally 2');
assertEqual(true, queenAttack({ white: [2, 2], black: [1, 1] }), 'can attack diagonally 3');
assertEqual(true, queenAttack({ white: [1, 7], black: [0, 6] }), 'can attack diagonally 4');
assertEqual(true, queenAttack({ white: [7, 0], black: [0, 7] }), 'can attack NE to SW');
assertEqual(true, queenAttack({ white: [2, 6], black: [5, 3] }), 'can attack NE to SW 2');
