import React, { useState } from "react";
import MenuCategory from "./MenuCategory";
const MENU_DATA = require("./restaurantCategoriesData.json");

const RestaurantMenu = () => {
  const [openCategoryId, setOpenCategoryId] = useState("cat1");
  console.log("MENU_DATA", MENU_DATA);
  return (
    <div className="menu-container py-2 bg-gray-100 min-h-screen border border-gray-300">
      <h1 className="text-2xl font-bold">Our Menu</h1>
      {MENU_DATA.map((group) => (
        <MenuCategory
          key={group.id}
          title={group.category}
          items={group.items}
          // The child is open ONLY if its ID matches the state
          isOpen={openCategoryId === group.id}
          // We pass a function that allows the child to change the parent's state
          toggleCategory={() => {
            // If it's already open, close it; otherwise, open it.
            setOpenCategoryId(openCategoryId === group.id ? null : group.id);
          }}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
