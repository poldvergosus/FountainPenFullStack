import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = 'р.';
  const delivery_fee = 300;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);

  const getUserProfile = async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/user/profile',
        {},
        { headers: { token: userToken } }
      );
      if (response.data.success) {
        setUserProfile(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addToCart = async (itemId, quantity = 1) => {
    const product = products.find(p => p._id === itemId);

    if (!product) {
      toast.error('Товар не найден');
      return false;
    }

    const stock = product.stock ?? 0;
    const currentInCart = cartItems[itemId] || 0;
    const newQuantity = currentInCart + quantity;

    if (stock === 0) {
      toast.error('Товар закончился');
      return false;
    }

    if (newQuantity > stock) {
      toast.error(`Доступно только ${stock} шт.`);
      return false;
    }

    let cartData = structuredClone(cartItems);
    cartData[itemId] = newQuantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId }, { headers: { token } })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    return true;
  }

  const getCartCount = () => {
    let totalCount = 0;
    Object.values(cartItems).forEach(qty => {
      if (qty > 0) totalCount += qty;
    });
    return totalCount;
  };

  const updateQuantity = async (itemId, quantity) => {
    const product = products.find(p => p._id === itemId);

    if (!product) {
      toast.error('Товар не найден');
      return false;
    }

    const stock = product.stock ?? 0;

    if (quantity > stock) {
      toast.error(`Доступно только ${stock} шт.`);
      quantity = stock;
    }

    if (quantity <= 0) {
      quantity = 0;
    }

    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;

    if (quantity === 0) {
      delete cartData[itemId];
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token } })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    return true;
  }

  const getAvailableStock = (itemId) => {
    const product = products.find(p => p._id === itemId);
    return product ? (product.stock ?? 0) : 0;
  }

  const validateCart = () => {
    let cartData = structuredClone(cartItems);
    let hasChanges = false;

    for (const itemId in cartData) {
      const product = products.find(p => p._id === itemId);

      if (!product) {
        delete cartData[itemId];
        hasChanges = true;
        continue;
      }

      const stock = product.stock ?? 0;

      if (cartData[itemId] > stock) {
        if (stock === 0) {
          delete cartData[itemId];
          toast.warning(`"${product.title}" закончился и удален из корзины`);
        } else {
          cartData[itemId] = stock;
          toast.warning(`"${product.title}" — количество уменьшено до ${stock} шт.`);
        }
        hasChanges = true;
      }
    }

    if (hasChanges) {
      setCartItems(cartData);
    }
  }

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];

      if (quantity > 0) {
        const itemInfo = products.find(
          (product) => product._id.toString() === itemId.toString()
        );

        if (itemInfo) {
          const price = Number(itemInfo.price);
          const qty = Number(quantity);

          if (!isNaN(price) && !isNaN(qty) && price > 0 && qty > 0) {
            totalAmount += price * qty;
          }
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        const productsWithNumericPrices = response.data.products.map(product => ({
          ...product,
          price: Number(product.price) || 0
        }));
        setProducts(productsWithNumericPrices);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getBlogsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/blog/list')
      if (response.data.success) {
        setBlogs(response.data.blogs)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getUserCart = async (userToken) => {
    try {
      setCartLoading(true);
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token: userToken } })
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setCartLoading(false);
    }
  }

  const refreshProducts = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        const productsWithNumericPrices = response.data.products.map(product => ({
          ...product,
          price: Number(product.price) || 0
        }));
        setProducts(productsWithNumericPrices);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductsData()
    getBlogsData()
  }, [])

  useEffect(() => {
    if (products.length > 0 && Object.keys(cartItems).length > 0) {
      validateCart();
    }
  }, [products])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      const savedToken = localStorage.getItem('token');
      setToken(savedToken);
      getUserCart(savedToken);
      getUserProfile(savedToken);
    } else {
      setCartLoading(false);
    }
  }, [])

  useEffect(() => {
    if (token) {
      getUserProfile(token);
    } else {
      setUserProfile(null);
    }
  }, [token])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    getAvailableStock,
    navigate,
    backendUrl,
    setToken,
    token,
    blogs,
    refreshProducts,
    userProfile,
    setUserProfile,
    getUserProfile,
    cartLoading,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;