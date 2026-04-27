import React, { useState, useMemo, memo } from "react";

// 1. React.memo: Protects the Component from unnecessary re-renders
const ThemeChild = memo(({ theme }) => {
  console.log(`🟦 CHILD RENDERED! (Received theme: ${theme})`);

  return (
    <div
      style={{ border: "2px solid blue", padding: "10px", marginTop: "10px" }}
    >
      <h3>Theme Child</h3>
      <p>Current Theme: {theme}</p>
    </div>
  );
});

const MemoAndUseMemo = () => {
  const [multiplier, setMultiplier] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  console.log(`🟥 PARENT RENDERED!`);

  // 2. useMemo: Protects the heavy calculation from running on every render
  const expensiveMathResult = useMemo(() => {
    // Imagine this is a massive loop or a huge array filter that takes 3 seconds
    console.log("⏳ OUCH! RUNNING SUPER HEAVY CALCULATION...");
    return multiplier * 1000;
  }, [multiplier]); // ONLY re-run this math if 'multiplier' changes

  return (
    <div
      style={{
        border: "2px solid red",
        padding: "20px",
        backgroundColor: isDarkMode ? "#333" : "#FFF",
        color: isDarkMode ? "#FFF" : "#000",
      }}
    >
      <h2>Parent Calculator</h2>
      <p>Result of heavy math: {expensiveMathResult}</p>

      {/* Button A: Changes the 'multiplier' state */}
      <button onClick={() => setMultiplier(multiplier + 1)}>
        Increase Multiplier
      </button>

      {/* Button B: Changes the 'isDarkMode' state */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{ marginLeft: "10px" }}
      >
        Toggle Theme
      </button>

      {/* Passing the theme state to the protected child */}
      <ThemeChild theme={isDarkMode ? "DARK" : "LIGHT"} />
    </div>
  );
};

export default MemoAndUseMemo;
