import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = 'р.';
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  const value = {
    products, currency,
    search, setSearch, showSearch, setShowSearch
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
