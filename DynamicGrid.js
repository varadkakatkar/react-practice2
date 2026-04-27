import { useState, useMemo, useCallback } from "react";

function DynamicGrid({ initialRows = 4, initialCols = 4 }) {
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  // key: "r,c" -> selected
  const [selected, setSelected] = useState(() => new Set());

  const cellKey = (r, c) => `${r},${c}`;

  const toggleCell = useCallback((r, c) => {
    setSelected((prev) => {
      const next = new Set(prev);
      const k = cellKey(r, c);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }, []);

  const grid = useMemo(() => {
    const out = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push({ r, c });
      }
      out.push(row);
    }
    return out;
  }, [rows, cols]);

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
        <label>
          Rows:{" "}
          <input
            type="number"
            min={1}
            max={20}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value) || 1)}
          />
        </label>
        <label>
          Columns:{" "}
          <input
            type="number"
            min={1}
            max={20}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value) || 1)}
          />
        </label>
        <button
          type="button"
          onClick={() => setSelected(new Set())}
        >
          Clear selection
        </button>
      </div>

      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: `repeat(${cols}, 48px)`,
          gap: 4,
          border: "1px solid #ccc",
          padding: 8,
          background: "#eee",
        }}
      >
        {grid.map((row) =>
          row.map(({ r, c }) => {
            const k = cellKey(r, c);
            const isOn = selected.has(k);
            return (
              <button
                key={k}
                type="button"
                onClick={() => toggleCell(r, c)}
                style={{
                  width: 48,
                  height: 48,
                  border: "1px solid #bbb",
                  cursor: "pointer",
                  background: isOn ? "#ffeb3b" : "#ffffff",
                  padding: 0,
                }}
                aria-pressed={isOn}
              >
                {/* optional: {r},{c} */}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DynamicGrid;