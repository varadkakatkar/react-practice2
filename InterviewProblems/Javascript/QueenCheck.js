function QueenCheck(strArr) {
  // __define-ocg__ determine if king is in check and count escape moves

  function parsePosition(pos) {
    let coords = pos.replace(/[()]/g, "").split(",");
    return [parseInt(coords[0]), parseInt(coords[1])];
  }

  let [qx, qy] = parsePosition(strArr[0]);
  let [kx, ky] = parsePosition(strArr[1]);

  let varOcg = [qx, qy];
  let varFiltersCg = [kx, ky];

  function queenAttacks(x, y) {
    return qx === x || qy === y || Math.abs(qx - x) === Math.abs(qy - y);
  }

  // If king is not in check, return -1
  if (!queenAttacks(kx, ky)) {
    return -1;
  }

  let safeMoves = 0;

  // All 8 possible king moves
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let [dx, dy] of directions) {
    let nx = kx + dx;
    let ny = ky + dy;

    // Stay on board
    if (nx < 1 || nx > 8 || ny < 1 || ny > 8) {
      continue;
    }

    // Can't move onto queen's square
    if (nx === qx && ny === qy) {
      continue;
    }

    // Move must not still be under attack
    if (!queenAttacks(nx, ny)) {
      safeMoves++;
    }
  }

  return safeMoves;
}

// Examples
console.log(QueenCheck(["(1,1)", "(1,4)"])); // 3
console.log(QueenCheck(["(3,1)", "(4,4)"])); // -1
console.log(QueenCheck(["(4,4)", "(6,6)"])); // 6
