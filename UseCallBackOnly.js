/***3. The Trap: Completely Alone (No React.memo, No useEffect)
What happens if you use useCallback on a function, but you don't pass it to a React.memo child, AND you don't put it in a useEffect? */

import React, { useCallback, useState } from "react";

const UseCallBackOnly = () => {
  const [text, setText] = useState("");

  // 🚨 THE TRAP: Using useCallback completely alone
  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <div>
      {/* Passing it to a native HTML input, which doesn't use React.memo! */}
      <input type="text" onChange={handleChange} />
    </div>
  );
};

export default UseCallBackOnly;

/**
 * 
 * This is considered bad practice. If you use useCallback completely on its own, it is worse than not using it at all. React has to do extra work to set up the cache, check the dependency array, and store the memory address. Because the <input> element doesn't care about memory addresses, all of React's hard work is completely wasted!

The Golden Rule Answer
If an interviewer asks you, "Can we use useCallback without useEffect?"

You say:

"Yes. Its primary purpose is actually used without useEffect. We use it alongside React.memo to keep function memory addresses stable, preventing unnecessary re-renders of child components. We only use it with useEffect if we need to prevent a function from causing an infinite loop inside an effect array."
 */
