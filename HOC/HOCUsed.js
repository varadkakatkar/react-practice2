import React from "react";
import withLoading from "./withLoading";
import UserProfile from "./UserProfile";

const UserProfileWithLoading = withLoading(UserProfile);

const HOCUsed = () => {
  return (
    <div>
      <h3>User( Still loading.... ) </h3>
      <UserProfileWithLoading
        isLoading={true}
        name={"Alice"}
        email={"abc@example.com"}
      />
      <h3>User( Loaded) </h3>
      <UserProfileWithLoading
        isLoading={false}
        name={"Bob"}
        email={"pqr@example.com"}
      />
    </div>
  );
};

export default HOCUsed;
