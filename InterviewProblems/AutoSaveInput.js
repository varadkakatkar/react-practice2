import { useEffect, useState } from "react";

function AutoSaveInput() {
  const [text, setText] = useState("");

  // Load saved value on component mount
  useEffect(() => {
    const saved = localStorage.getItem("autosave-text");

    if (saved) {
      setText(saved);
    }
  }, []);

  // Save value whenever text changes
  useEffect(() => {
    localStorage.setItem("autosave-text", text);
  }, [text]);

  const clearText = () => {
    setText("");
    localStorage.removeItem("autosave-text");
  };

  return (
    <div>
      <h1>Auto Save Input</h1>
      Name:
      <input
        type="text"
        data-testid="input-field"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button data-testid="clear-btn" onClick={clearText}>
        Clear
      </button>
    </div>
  );
}

export default AutoSaveInput;
