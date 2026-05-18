import React, { useEffect, useState } from "react";
import "./styles.css";

function EvenOrOddChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkOddEven = () => {
    setResult("");
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      const parsed = parseInt(number, 10);

      if (Number.isNaN(parsed)) {
        setResult("Please enter a valid number.");
      } else if (parsed % 2 === 0) {
        setResult(`The number ${parsed} is even.`);
      } else {
        setResult(`The number ${parsed} is odd.`);
      }

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoading, number]);

  return (
    <div className="even-odd-container">
      <h1 className="title">Even or Odd Checker</h1>

      <input
        data-testid="number-input"
        className="number-input"
        value={number}
        type="text"
        placeholder="Enter a number"
        onChange={(e) => setNumber(e.target.value)}
      />

      <button
        className="check-button"
        data-testid="check-button"
        onClick={checkOddEven}
      >
        Check
      </button>

      <div className="result-area" data-testid="result-area">
        {isLoading ? (
          <div className="loading" data-testid="loading">
            Checking...
          </div>
        ) : result !== "" ? (
          <div className="result" data-testid="result">
            {result}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default EvenOrOddChecker;
