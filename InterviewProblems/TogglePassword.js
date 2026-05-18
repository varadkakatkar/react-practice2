import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
function TogglePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <h1 className="title">Toggle Password</h1>

      <div className="password-wrapper">
        <input
          data-testid="password-input"
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Enter password"
          className="password-input"
        />

        <button
          type="button"
          className="toggle-icon"
          data-testid="toggle-icon"
          onClick={toggleVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <span className="visibility-label" data-testid="visibility-label">
        {!showPassword ? "Password Hidden" : "Password Visible"}
      </span>
    </div>
  );
}

export default TogglePassword;
