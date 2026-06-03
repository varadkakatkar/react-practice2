import React, { useMemo, useState } from "react";
import "./QueenCheckGame.css";

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

const BOARD_SIZE = 8;
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

// Helper: does the queen at (qx, qy) attack square (x, y)?
const queenAttacks = (qx, qy, x, y) =>
  qx === x || qy === y || Math.abs(qx - x) === Math.abs(qy - y);

const QueenCheckGame = () => {
  // Pieces stored as { x, y } using the same 1-8 coordinate system as QueenCheck
  const [queen, setQueen] = useState({ x: 4, y: 4 });
  const [king, setKing] = useState({ x: 6, y: 6 });
  const [placing, setPlacing] = useState("queen"); // "queen" | "king"

  const handleSquareClick = (x, y) => {
    if (placing === "queen") {
      if (king.x === x && king.y === y) return; // can't stack on king
      setQueen({ x, y });
      setPlacing("king");
    } else {
      if (queen.x === x && queen.y === y) return; // can't stack on queen
      setKing({ x, y });
      setPlacing("queen");
    }
  };

  const result = useMemo(
    () =>
      QueenCheck([
        `(${queen.x},${queen.y})`,
        `(${king.x},${king.y})`,
      ]),
    [queen, king]
  );

  const inCheck = result !== -1;

  // Compute which squares are safe escape squares for the king (for highlighting)
  const safeSquares = useMemo(() => {
    const set = new Set();
    if (!inCheck) return set;
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
    for (const [dx, dy] of directions) {
      const nx = king.x + dx;
      const ny = king.y + dy;
      if (nx < 1 || nx > 8 || ny < 1 || ny > 8) continue;
      if (nx === queen.x && ny === queen.y) continue;
      if (!queenAttacks(queen.x, queen.y, nx, ny)) set.add(`${nx},${ny}`);
    }
    return set;
  }, [queen, king, inCheck]);

  // Build the board rows. We render y from top (8) to bottom (1) like a real board.
  const rows = [];
  for (let y = BOARD_SIZE; y >= 1; y--) {
    const cells = [];
    for (let x = 1; x <= BOARD_SIZE; x++) {
      const isQueen = queen.x === x && queen.y === y;
      const isKing = king.x === x && king.y === y;
      const isAttacked =
        !isQueen && queenAttacks(queen.x, queen.y, x, y);
      const isSafe = safeSquares.has(`${x},${y}`);
      const isLight = (x + y) % 2 === 0;

      const classNames = ["qcg__square"];
      classNames.push(isLight ? "qcg__square--light" : "qcg__square--dark");
      if (isAttacked) classNames.push("qcg__square--attacked");
      if (isSafe) classNames.push("qcg__square--safe");

      cells.push(
        <button
          key={`${x}-${y}`}
          type="button"
          className={classNames.join(" ")}
          onClick={() => handleSquareClick(x, y)}
          aria-label={`Square ${FILES[x - 1]}${y}`}
        >
          {isQueen && <span className="qcg__piece qcg__piece--queen">♛</span>}
          {isKing && (
            <span
              className={`qcg__piece qcg__piece--king${
                inCheck ? " qcg__piece--king-check" : ""
              }`}
            >
              ♚
            </span>
          )}
          {isSafe && !isKing && <span className="qcg__dot" />}
        </button>
      );
    }
    rows.push(
      <div className="qcg__row" key={`row-${y}`}>
        <span className="qcg__rank-label">{y}</span>
        {cells}
      </div>
    );
  }

  return (
    <div className="qcg">
      <div className="qcg__card">
        <header className="qcg__header">
          <h1 className="qcg__title">♛ Queen Check</h1>
          <p className="qcg__subtitle">
            Place the queen and king, then see if the king is in check and how
            many safe squares it can escape to.
          </p>
        </header>

        <div className="qcg__toolbar">
          <button
            type="button"
            className={`qcg__mode-btn${
              placing === "queen" ? " qcg__mode-btn--active" : ""
            }`}
            onClick={() => setPlacing("queen")}
          >
            ♛ Place Queen
          </button>
          <button
            type="button"
            className={`qcg__mode-btn${
              placing === "king" ? " qcg__mode-btn--active" : ""
            }`}
            onClick={() => setPlacing("king")}
          >
            ♚ Place King
          </button>
        </div>

        <div className="qcg__board-wrap">
          <div className="qcg__board">{rows}</div>
          <div className="qcg__file-labels">
            <span className="qcg__rank-spacer" />
            {FILES.map((f) => (
              <span className="qcg__file-label" key={f}>
                {f}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`qcg__status${
            inCheck ? " qcg__status--check" : " qcg__status--safe"
          }`}
        >
          {inCheck ? (
            <>
              <span className="qcg__status-badge">CHECK!</span>
              <span className="qcg__status-text">
                The king is under attack with{" "}
                <strong>{result}</strong> safe escape{" "}
                {result === 1 ? "move" : "moves"}.
              </span>
            </>
          ) : (
            <>
              <span className="qcg__status-badge qcg__status-badge--safe">
                SAFE
              </span>
              <span className="qcg__status-text">
                The king is not in check.{" "}
                <code>QueenCheck</code> returns <strong>-1</strong>.
              </span>
            </>
          )}
        </div>

        <div className="qcg__legend">
          <span className="qcg__legend-item">
            <span className="qcg__swatch qcg__swatch--attacked" /> Attacked
          </span>
          <span className="qcg__legend-item">
            <span className="qcg__swatch qcg__swatch--safe" /> Safe escape
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueenCheckGame;
