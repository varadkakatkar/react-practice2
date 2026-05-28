import React, { useMemo, useState } from "react";
import "./SumReduce.css";

export function sum(...args) {
  return args.reduce((accumulator, current) => accumulator + current, 0);
}

function SumReduce() {
  const [input, setInput] = useState("100, 200, 300, 400");

  const numbers = useMemo(() => {
    return input
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "")
      .map(Number)
      .filter((value) => !Number.isNaN(value));
  }, [input]);

  const total = useMemo(() => {
    if (numbers.length === 0) return 0;
    return sum(...numbers);
  }, [numbers]);

  return (
    <div className="sum-reduce">
      <div className="sum-reduce__card">
        <div className="sum-reduce__icon" aria-hidden="true">
          ∑
        </div>
        <h2 className="sum-reduce__title">Sum with Reduce</h2>
        <p className="sum-reduce__subtitle">
          Enter numbers separated by commas. The total is calculated using{" "}
          <code className="sum-reduce__code">Array.reduce()</code>
        </p>

        <label className="sum-reduce__label" htmlFor="numbers-input">
          Numbers
        </label>
        <input
          id="numbers-input"
          type="text"
          className="sum-reduce__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 100, 200, 300, 400"
        />

        {numbers.length > 0 && (
          <div className="sum-reduce__chips">
            {numbers.map((num, index) => (
              <span key={`${num}-${index}`} className="sum-reduce__chip">
                {num}
              </span>
            ))}
          </div>
        )}

        <div className="sum-reduce__result">
          <span className="sum-reduce__result-label">Total</span>
          <span className="sum-reduce__result-value">{total}</span>
        </div>

        {numbers.length > 0 && (
          <p className="sum-reduce__formula">
            {numbers.join(" + ")} = {total}
          </p>
        )}
      </div>
    </div>
  );
}

export default SumReduce;
