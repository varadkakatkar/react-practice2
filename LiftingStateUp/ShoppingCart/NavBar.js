import React, { useContext } from "react";
import UserContext from "../../utils/userContext";

const NavBar = ({ cartCount }) => {
  const user = useContext(UserContext);
  return (
    <div className="navbar-container border border-gray-300 p-2">
      <div className="logo-container">
        <h1>Logo</h1> {user.loggedInUser}
      </div>
      <div className="cart-container">
        <h1 className="text-2xl font-bold">Cart</h1>
        <span className="text-2xl font-bold">{cartCount}</span>
      </div>
    </div>
  );
};

export default NavBar;
