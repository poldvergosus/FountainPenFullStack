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

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
  }

const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemId in cartItems) {
    const quantity = cartItems[itemId];
    if (quantity > 0) {
      const itemInfo = products.find(
        (product) => product.id.toString() === itemId.toString()
      );
      if (itemInfo) {
        totalAmount += itemInfo.price * quantity;
      }
    }
  }
  return totalAmount;
};


  const value = {
    products, currency,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart,
    getCartCount, updateQuantity,
    getCartAmount
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
