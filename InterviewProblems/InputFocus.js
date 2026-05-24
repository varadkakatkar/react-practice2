import React, { useRef } from "react";
import "./InputFocus.css";

function InputFocus() {
  const ref = useRef(null);

  const handleFocus = () => {
    if (ref.current) ref.current.focus();
  };

  return (
    <div className="input-focus">
      <div className="input-focus__card">
        <div className="input-focus__icon" aria-hidden="true">
          ⌨️
        </div>
        <h2 className="input-focus__title">Input Focus</h2>
        <p className="input-focus__subtitle">
          Click the button to programmatically focus the input using{" "}
          <code className="input-focus__code">useRef</code>
        </p>

        <div className="input-focus__controls">
          <input
            ref={ref}
            type="text"
            className="input-focus__input"
            placeholder="Type here..."
          />
          <button
            type="button"
            className="input-focus__btn"
            onClick={handleFocus}
          >
            Focus Input
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputFocus;
