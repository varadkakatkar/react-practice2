import { useState } from "react";
import "./AcronymGenerator.css";

function AcronymGenerator() {
  const [input, setInput] = useState("");
  const [acronym, setAcronym] = useState("");

  function toAcronym(text) {
    // Implement acronym logic here
    const result = text
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0].toUpperCase())
      .join("");

    console.log("res", result);
    return result;
  }

  const handleClick = () => {
    setAcronym(toAcronym(input));
  };

  return (
    <div className="acronym-generator">
      <div className="acronym-generator__card">
        <h1 className="acronym-generator__title">Acronym Generator</h1>
        <p className="acronym-generator__description">
          An acronym is formed by taking the first letter of each word in a
          phrase and converting them to uppercase.
        </p>

        <div className="acronym-generator__input-section">
          <input
            type="text"
            className="acronym-generator__input"
            value={input}
            placeholder="Enter a phrase..."
            onChange={(e) => setInput(e.target.value)}
            data-testid="input"
          />
          <button
            className="acronym-generator__btn"
            onClick={handleClick}
            data-testid="generate-button"
          >
            Generate
          </button>
        </div>

        <p className="acronym-generator__result" data-testid="result">
          <span className="acronym-generator__result-label">Result :</span>
          <span
            className={`acronym-generator__result-value${
              acronym ? "" : " acronym-generator__result-value--empty"
            }`}
          >
            {acronym}
          </span>
        </p>
      </div>
    </div>
  );
}
export default AcronymGenerator;
