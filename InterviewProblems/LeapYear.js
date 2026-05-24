import React, { useState } from "react";
import "./LeapYear.css";

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function LeapYear() {
  const [yearInput, setYearInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const checkLeapYear = () => {
    const trimmed = yearInput.trim();

    if (!trimmed) {
      setError("Please enter a year");
      setResult("");
      return;
    }

    const year = Number(trimmed);

    if (!Number.isInteger(year)) {
      setError("Please enter a year");
      setResult("");
      return;
    }

    setError("");

    if (isLeapYear(year)) {
      setResult(`${year} is a Leap Year`);
    } else {
      setResult(`${year} is not a Leap Year`);
    }
  };

  const handleReset = () => {
    setYearInput("");
    setResult("");
    setError("");
  };

  const getResultClass = () => {
    if (!result) return "";
    if (result.includes("is a Leap Year")) return "leap-year__result--leap";
    return "leap-year__result--common";
  };

  return (
    <div className="leap-year">
      <div className="leap-year__card">
        <div className="leap-year__icon" aria-hidden="true">
          📅
        </div>
        <h2 className="leap-year__title">Leap Year Checker</h2>
        <p className="leap-year__subtitle">
          Enter a year to see if February has 29 days
        </p>

        <label className="leap-year__label" htmlFor="year-input" data-testid="label-date">
          Enter a year:
        </label>

        <input
          id="year-input"
          className="leap-year__input"
          type="text"
          placeholder="e.g. 2024"
          value={yearInput}
          data-testid="year-input"
          onChange={(e) => setYearInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkLeapYear()}
        />

        <div className="leap-year__actions">
          <button
            className="leap-year__btn leap-year__btn--primary"
            data-testid="check-btn"
            onClick={checkLeapYear}
          >
            Check
          </button>
          <button
            className="leap-year__btn leap-year__btn--secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {error && (
          <p className="leap-year__error" data-testid="error-msg">
            {error}
          </p>
        )}

        {result && (
          <p
            className={`leap-year__result ${getResultClass()}`}
            data-testid="result"
          >
            {result}
          </p>
        )}

        <div className="leap-year__rules">
          <p className="leap-year__rules-title">Quick rules</p>
          <ul className="leap-year__rules-list">
            <li>Divisible by 4 → leap year</li>
            <li>Divisible by 100 → not a leap year</li>
            <li>Divisible by 400 → leap year again</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeapYear;
