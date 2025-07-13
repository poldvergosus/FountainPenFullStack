import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = 'р.';
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    }

    else {
      cartData[itemId] = 1
    }

    setCartItems(cartData);
  }

const getCartCount = () => {
  let totalCount = 0;
  Object.values(cartItems).forEach(qty => {
    if (qty > 0) totalCount += qty;
  });
  return totalCount;
};

  const value = {
    products, currency,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart,
    getCartCount
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
