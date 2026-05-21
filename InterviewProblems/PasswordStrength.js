import React, { useState } from "react";
import "./styles.css";

// ✅ Export this so it can be tested
export const checkPasswordStrength = (pwd) => {
  const checks = [
    pwd.length >= 8,
    /[A-Z]/.test(pwd),
    /[a-z]/.test(pwd),
    /[0-9]/.test(pwd),
    /[^A-Za-z0-9]/.test(pwd),
  ];

  const passed = checks.filter(Boolean).length;

  if (passed == 1) return "Level 1";
  if (passed >= 2 && passed <= 3) return "Level 2";
  if (passed >= 4 && passed <= 5) return "Level 3";
  return "Weak Password";
};

const PasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");

  const handleCheck = () => {
    setLevel(checkPasswordStrength(password));
  };

  return (
    <div>
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCheck}>Check Strenght</button>

      {level && (
        <p>
          Strength : <h1>{level}</h1>
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;
