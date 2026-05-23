import { useState } from "react";
import usePrevious from "./usePrevious";
import "./Counter.css";

export default function Counter() {
  const [currentCount, setCurrentCount] = useState(0);
  const previousCount = usePrevious(currentCount);

  return (
    <div className="counter">
      <div className="counter__card">
        <h2 className="counter__title">Counter</h2>

        <div className="counter__stats">
          <p className="counter__stat">
            <span className="counter__stat-label">Current Count</span>
            <span className="counter__stat-value">{currentCount}</span>
          </p>
          <p className="counter__stat">
            <span className="counter__stat-label">Previous Count</span>
            <span className="counter__stat-value counter__stat-value--previous">
              {previousCount}
            </span>
          </p>
        </div>

        <div className="counter__actions">
          <button
            className="counter__btn counter__btn--decrement"
            onClick={() => setCurrentCount(currentCount - 1)}
          >
            Decrement
          </button>
          <button
            className="counter__btn counter__btn--reset"
            onClick={() => setCurrentCount(0)}
          >
            Reset
          </button>
          <button
            className="counter__btn counter__btn--increment"
            onClick={() => setCurrentCount(currentCount + 1)}
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
}
