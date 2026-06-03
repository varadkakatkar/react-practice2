import { useState } from "react";
import "./LuckeyNumber.css";

function LuckyNumber() {
  // Write logic to check if the number is lucky or not
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const isPrime = (num) => {
    if (num < 2) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }

    return true;
  };

  const checkLuckey = (num) => {
    if (!num) return "";

    const sum = num.split("").reduce((acc, curr) => acc + Number(curr), 0);

    return isPrime(sum) ? "Lucky Number" : "Not a Lucky Number";
  };

  const result = checkLuckey(number);
  const resultModifier = result
    ? result === "Lucky Number"
      ? "result--lucky"
      : "result--unlucky"
    : "";
  return (
    <div className="lucky-app">
      <div className="lucky-card">
        <h1 className="lucky-title">Lucky Number</h1>
        <p className="lucky-subtitle">
          A number is Lucky if the sum of its digits is a Prime Number
        </p>

        <div className="container">
          {/* Add Input and Result */}
          <input
            type="number"
            value={number}
            placeholder="Enter a Number"
            className="input-box"
            data-testid="input-box"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <p className={`result ${resultModifier}`} data-testid="result">
            {result}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LuckyNumber;
