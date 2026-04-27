import React, { memo, useCallback, useState } from "react";

// 1. Child is protected by React.memo
const Child = memo(({ childClick }) => {
  console.log("🟦 CHILD Re-rendered!"); // We want to see this as little as possible

  return (
    <div style={{ border: "2px solid blue", padding: "10px", margin: "10px" }}>
      <h3>Child Component</h3>
      <button onClick={childClick}>Trigger Parent's Function</button>
    </div>
  );
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  console.log(
    `🟥 PARENT Re-rendered! (Count: ${count}, DarkMode: ${darkMode})`,
  );

  // 2. Function is protected by useCallback
  const handleChildClick = useCallback(() => {
    console.log("🟢 Child was clicked : count is " + count);
  }, [count]); // Only recreate this function if 'count' changes

  return (
    <div
      style={{
        border: "2px solid red",
        padding: "20px",
        backgroundColor: darkMode ? "#333" : "#FFF",
        color: darkMode ? "#FFF" : "#000",
      }}
    >
      <h2>Parent Component</h2>

      {/* Button A: Changes 'count' */}
      <button onClick={() => setCount(count + 1)}>
        Increment Count: {count}
      </button>

      {/* Button B: Changes 'darkMode' */}
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>

      <Child childClick={handleChildClick} />
    </div>
  );
};

export default Parent;
