import React, { useState } from "react";
import NavBar from "./NavBar";
import Product from "./Product";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState({
    product1: 0,
    product2: 0,
    product3: 0,
  });

  const cartCount = Object.values(cartItems).reduce(
    (total, count) => total + count,
    0
  );

  const addToCart = (productId) => {
    setCartItems((items) => ({
      ...items,
      [productId]: items[productId] + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCartItems((items) => ({
      ...items,
      [productId]: Math.max(items[productId] - 1, 0),
    }));
  };

  return (
    <div className="shopping-cart-container border border-gray-300 p-2">
      <NavBar cartCount={cartCount} />
      <Product
        quantity={cartItems.product1}
        name="Product 1"
        price={100}
        addToCart={() => addToCart("product1")}
        removeFromCart={() => removeFromCart("product1")}
      />
      <Product
        quantity={cartItems.product2}
        name="Product 2"
        price={200}
        addToCart={() => addToCart("product2")}
        removeFromCart={() => removeFromCart("product2")}
      />
      <Product
        quantity={cartItems.product3}
        name="Product 3"
        price={300}
        addToCart={() => addToCart("product3")}
        removeFromCart={() => removeFromCart("product3")}
      />
    </div>
  );
};

export default ShoppingCart;
