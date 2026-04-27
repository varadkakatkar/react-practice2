import React from "react";

const UserProfile = ({ name, email }) => {
  return (
    <div>
      <p>Name : {name} </p>
      <p>email : {email} </p>
    </div>
  );
};

export default UserProfile;
