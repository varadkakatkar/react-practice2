import React from "react";

const MenuCategory = ({ title, items, isOpen, toggleCategory }) => {
  return (
    <div className="category-card border border-gray-300 my-2">
      <div
        className="category-header cursor-pointer flex justify-between py-2 px-10 border-b border-gray-300"
        onClick={toggleCategory}
      >
        <h2>{title}</h2>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <ul className="category-items py-2 px-7 list-disc list-inside">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuCategory;
