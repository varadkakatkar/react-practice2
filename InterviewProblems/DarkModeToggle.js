import React, { useState } from "react";
import "./DarkModeToggle.css";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`dark-mode-toggle ${
        isDarkMode ? "dark-mode-toggle--dark" : "dark-mode-toggle--light"
      }`}
    >
      <h1 className="dark-mode-toggle__title">Dark Mode Toggle</h1>
      <div className="dark-mode-toggle__controls">
        <label className="dark-mode-toggle__switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleMode}
          />
          <span className="dark-mode-toggle__slider" />
        </label>
        <span className="dark-mode-toggle__label">
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
    </div>
  );
}

export default DarkModeToggle;
