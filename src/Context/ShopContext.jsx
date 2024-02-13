import React, { createContext, useState, useEffect } from "react";
import all_product from "../components/Assets/all_product";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  // First, try to get the cart from localStorage
  const localCart = localStorage.getItem('cartItems');
  if(localCart) {
    return JSON.parse(localCart); // Parse stored json or if none return initial value
  }

  // If not found in localStorage, initialize it
  let cart = {};
  for (let index = 0; index < all_product.length; index++) { // removed +1 to match the product index correctly
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // UseEffect hook to update localStorage when cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: Math.max(prev[itemId] - 1, 0)})); // Prevent negative values
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
