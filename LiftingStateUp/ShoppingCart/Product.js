import React from "react";

const Product = ({ name, price, addToCart, removeFromCart, quantity }) => {
  return (
    <div className="product-container border border-gray-300 p-2">
      <h1>{name}</h1>
      <p>{price}</p>
      <p>Quantity: {quantity}</p>
      <button
        className={`bg-blue-500 text-white p-2 rounded-sm btn-sm text-sm mx-2  ${
          quantity >= 10 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={addToCart}
        type="button"
      >
        Add to Cart +
      </button>
      <button
        className={`bg-red-500 text-white p-2 rounded-sm btn-sm text-sm  ${
          quantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={removeFromCart}
        type="button"
        disabled={quantity <= 0}
      >
        Remove from Cart -
      </button>
    </div>
  );
};

export default Product;
