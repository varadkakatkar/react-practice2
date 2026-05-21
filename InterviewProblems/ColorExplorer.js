import React, { useState } from "react";
import { colorNameToHex } from "./colorData";
import "./ColorExplorer.css";

const ColorExplorer = () => {
  const [input, setInput] = useState("");
  const [color, setColor] = useState({
    name: "",
    hex: "",
  });
  const [error, setError] = useState("");

  const handleSearch = () => {
    const hex = colorNameToHex(input.trim().toLowerCase());
    if (hex) {
      console.log("hex ", hex);
      setError("");
      setColor({ name: input, hex });
    } else {
      setError("Sorry, I couldn't recognize that color.");
      setColor({
        name: "",
        hex: "",
      });
    }
  };

  return (
    <div className="color-explorer">
      <div className="color-explorer__card">
        <h1 className="color-explorer__title">Color Explorer</h1>
        <div className="color-explorer__input-section">
          <input
            type="text"
            className="color-explorer__input"
            data-testid="color-input"
            placeholder="Type a color name e.g. lavender"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="color-explorer__search-btn"
            data-testid="search-button"
            onClick={handleSearch}
            aria-label="Search color"
          >
            🔍
          </button>
        </div>
        {error && (
          <p className="color-explorer__error" data-testid="error-msg">
            {error}
          </p>
        )}
        {color && (
          <div className="color-explorer__result" data-testid="color-box">
            <div
              className="color-explorer__preview"
              role="presentation"
              data-testid="color-preview"
              style={{ backgroundColor: `${color.hex}` }}
            ></div>
            <div className="color-explorer__details">
              <p className="color-explorer__detail" data-testid="color-name">
                <strong>Name:</strong> {color.name}
              </p>
              <p
                className="color-explorer__detail color-explorer__hex"
                data-testid="color-hex"
              >
                <strong>Hex:</strong> {color.hex}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorExplorer;
