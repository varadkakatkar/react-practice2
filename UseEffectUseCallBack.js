import React, { useState, useEffect, useCallback } from "react";

const UseEffectUseCallBack = () => {
  const [resource, setResource] = useState("Users");
  const [likes, setLikes] = useState(0);

  console.log(`🟥 COMPONENT RENDERED (Resource: ${resource}, Likes: ${likes})`);

  // 1. The Function (Protected by useCallback)
  const fetchData = useCallback(() => {
    // Imagine this is a real fetch() call to a server
    console.log(
      `📡 API CALL EXECUTED: Downloading ${resource} from database...`,
    );
  }, [resource]); // ONLY recreate this function if 'resource' changes

  // 2. The Effect
  useEffect(() => {
    console.log("⚙️ useEffect triggered!");
    fetchData();
  }, [fetchData]); // React forces us to put fetchData here!

  return (
    <div style={{ border: "2px solid red", padding: "20px" }}>
      <h2>Dashboard</h2>

      {/* Button A: Changes the Resource */}
      <button
        onClick={() => setResource(resource === "Users" ? "Posts" : "Users")}
      >
        Switch to {resource === "Users" ? "Posts" : "Users"}
      </button>

      {/* Button B: Completely unrelated state */}
      <button
        onClick={() => setLikes(likes + 1)}
        style={{ marginLeft: "10px" }}
      >
        ❤️ Like Page ({likes})
      </button>
    </div>
  );
};

export default UseEffectUseCallBack;
