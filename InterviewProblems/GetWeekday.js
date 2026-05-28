import React, { useState } from "react";
import "./GetWeekday.css";

function GetWeekday() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (!date || Number.isNaN(new Date(date).getTime())) {
      setResult("");
      return;
    }

    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    setResult(`That date falls on ${day}`);
  };

  return (
    <div className="get-weekday">
      <div className="get-weekday__card">
        <h1 className="get-weekday__title">Get Weekday</h1>
        <p className="get-weekday__subtitle">
          Pick a date to find which day of the week it is.
        </p>

        <input
          type="date"
          className="get-weekday__input"
          data-testid="date-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          type="button"
          className="get-weekday__btn"
          data-testid="find-day-btn"
          onClick={handleSubmit}
        >
          Find Day
        </button>

        {result && (
          <p className="get-weekday__result" data-testid="result">
            {result}
          </p>
        )}
      </div>
    </div>
  );
}

export default GetWeekday;
