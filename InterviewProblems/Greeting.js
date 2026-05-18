import React, { useEffect, useState } from "react";

export default function Greeting() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getMessage = (hour) => {
    if (hour >= 5 && hour < 12) {
      return "Good Morning! ☀️";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon! 🌤️";
    } else if (hour >= 17 && hour < 21) {
      return "Good Afternoon! 🌤️";
    } else {
      return "Good Night! 🌙✨";
    }
  };

  const greeting = getMessage(time.getHours());
  const formattedTime = time.toLocaleTimeString();
  return (
    <div
      className="modal-content"
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        color: "#333",
      }}
    >
      <h1 data-testid="greeting">{greeting}</h1>
      <p data-testid="time" className="updated-time">
        {formattedTime}
      </p>
    </div>
  );
}
