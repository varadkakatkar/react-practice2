import React, { useState } from "react";
import "./GuessTheNumber.css";

function GuessTheNumber() {
  const [inputNumber, setInputNumber] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState("");

  const handleGuess = () => {
    const guess = Number(inputNumber);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      setResult("Please enter a number between 1 and 100.");
      return;
    }

    const currentAttempts = attempts + 1;
    setAttempts(currentAttempts);

    const randomNum = Math.floor(Math.random() * 100) + 1;

    if (guess < randomNum) {
      setResult("Too low! Try again.");
    } else if (guess > randomNum) {
      setResult("Too high! Try again.");
    } else {
      setResult(
        `Congratulations! You guessed the number in ${currentAttempts} attempts.`,
      );
    }
  };

  const resetGame = () => {
    setAttempts(0);
    setInputNumber("");
    setResult("");
  };

  const getResultClass = () => {
    if (!result) return "guess-the-number__result--empty";
    if (result.startsWith("Congratulations"))
      return "guess-the-number__result--success";
    if (result.startsWith("Please enter"))
      return "guess-the-number__result--error";
    return "guess-the-number__result--hint";
  };

  return (
    <div className="guess-the-number">
      <div className="guess-the-number__card">
        <h2 className="guess-the-number__title">Guess the Number</h2>
        <p className="guess-the-number__subtitle">
          Pick a number between 1 and 100
        </p>

        <input
          id="guess-input"
          className="guess-the-number__input"
          placeholder="Enter a number between 1 and 100"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
        />

        <div className="guess-the-number__actions">
          <button
            className="guess-the-number__btn guess-the-number__btn--primary"
            onClick={handleGuess}
          >
            Check Guess
          </button>
          <button
            className="guess-the-number__btn guess-the-number__btn--secondary"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>

        <p className={`guess-the-number__result ${getResultClass()}`}>
          {result}
        </p>
      </div>
    </div>
  );
}

export default GuessTheNumber;
