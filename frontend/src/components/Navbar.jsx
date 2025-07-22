import React, { useContext, useEffect } from "react";
import "./navbar.css";
import { assets } from "../assets/assets.jsx";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    
  }

  useEffect(() => {
    // Для кнопки поиска
    document.documentElement.style.setProperty(
      "--search-sprite-url",
      `url(${assets.ui.searchSprite})`
    );

    // Для корзины
    document.documentElement.style.setProperty(
      "--cart-sprite-url",
      `url(${assets.ui.cartSprite})`
    );
  }, []);

  console.log('LOGIN CLOSED URL:', assets.login_closed);

  return (
    <>
      <header className="relative py-5 max-w-[1700px] mx-auto">
        <div className="preload-images"></div>

        {/* Основной контент */}
        <div className="header-wrapper">
          {/* Левая иконка */}
          <img src={assets.handLeft} alt="Левая рука" className="arm-icon" />

          {/* Центр */}
          <div className="header-center">
            <div className="relative">
              <NavLink to="/">
                <h1 className="font-literata italic font-extrabold text-[length:var(--font-size-h1)] leading-[var(--line-height-title)] text-center text-primary m-0">
                  ЧЕРНИЛЬНАЯ ЛАВКА
                </h1>
                <img
                  src={assets.logo}
                  alt="Логотип"
                  className="absolute left-[101%] top-1/2 -translate-y-[65%] w-8 h-auto"
                />
              </NavLink>
            </div>

            <nav className=" flex flex-row justify-center items-center gap-[0.9375rem] font-literata font-normal  text-[length:var(--font-size-regular)]  leading-6 text-center">
              <NavLink
                to="/collection"
                className="text-primary hover:text-accent"
              >
                Перьевые ручки
              </NavLink>
              <NavLink
                to="/collection"
                className="text-primary hover:text-accent"
              >
                Чернила
              </NavLink>
              <NavLink
                to="/collection"
                className="text-primary hover:text-accent"
              >
                Бумага
              </NavLink>
              <NavLink
                to="/collection"
                className="text-primary hover:text-accent"
              >
                Аксессуары
              </NavLink>
            </nav>
          </div>

          {/* Правая иконка */}
          <img src={assets.handRight} alt="Правая рука" className="arm-icon" />
        </div>

        {/* Кнопки справа */}
        <div className="main-actions">
          <button onClick={() => setShowSearch(prev => !prev)} className="search-button" aria-label="Поиск"></button>
          <NavLink to="/login" className="group relative">
            <div className="flex flex-col items-center justify-end w-[100px] h-[100%] text-primary ml-[30px] mr-[30px]">
              <img src={assets.login_closed} alt="Логин" className="w-[65px] h-[65px] m-3" />
              <span className="text-sm leading-[18px] font-semibold ">Войти</span>
              <div className="group-hover:block hidden absolute dropdown-menu right-0 top-full  pt-4">
                <div className=" flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100">
                  <p className=" cursor-pointer hover:text-accent">Профиль</p>
                  <p className=" cursor-pointer hover:text-accent">Заказы</p>
                  <p onClick={logout} className=" cursor-pointer hover:text-accent">Выйти</p>
                </div>
              </div>
            </div>
          </NavLink>

          <div className="cart-button-wrapper">
            <NavLink to="/cart">
              <div className="cart-button">
                <div className="cart-icon">
                  <span className="cart-count">{getCartCount()}</span>
                </div>
                <div className="cart-price">1200 р.</div>
              </div>
            </NavLink>
          </div>
        </div>
      </header>
      <div className="w-[80%] mx-auto mt-[2px] border-t-[3px] border-primary h-0"></div>
    </>
  );
};

export default Navbar;
