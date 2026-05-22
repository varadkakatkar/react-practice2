import { useState } from "react";

function CharacterCount() {
  const [input, setInput] = useState("");
  const [maxLimit, setMaxLimit] = useState(50);

  const charCount = input.length;
  const warningLimit = Math.floor(maxLimit * 0.9);
  const overLimit = charCount > maxLimit;
  const warning = charCount >= warningLimit;
  return (
    <div className="characterCount">
      <h1>Character Count</h1>
      <p>Track your input length with live character warnings.</p>

      <div className="container">
        <div className="inputs">
          <label>
            Max length:
            <input
              type="number"
              min="0"
              max="1000"
              data-testid="maxlength"
              value={maxLimit}
              onChange={(e) => {
                setMaxLimit(e.target.value);
              }}
            />
          </label>
        </div>
        <textarea
          className="text"
          placeholder="Start Typing"
          data-testid="textarea"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></textarea>

        <div data-testid="char-info" className="char-info">
          {charCount} / {maxLimit}
        </div>

        <div className="warnings">
          {overLimit && (
            <p
              className="warning-text"
              data-testid="error-text"
            >{`Limit exceeded by ${charCount - maxLimit} characters`}</p>
          )}

          {warning && !overLimit && (
            <p
              className="error-message"
              data-testid="error-text"
              data-testid="warning-text"
            >
              You are close to the limit!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default CharacterCount;
