import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../assets/assets.jsx";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { formatPrice } from '../utils/format';


const Navbar = () => {

  const { currency, setShowSearch, getCartAmount, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = '' };
  }, [isMenuOpen]);

  const subtotal = getCartAmount();

  return (
    <>
      <header className="relative py-5 max-w-[1700px] mx-auto">
        <div className="preload-images"></div>

        {/* MOBILE */}
        <button
          className="burger-btn mobile-only"
          aria-label="Открыть меню"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen(v => !v)}
        >
          <span className="bar" />
        </button>

        {/* MOBILE: burger (left) */}
        <button
          className="burger-btn mobile-only"
          aria-label="Открыть меню"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen(v => !v)}
        >
          <span className="bar" />
        </button>

        {/* MOBILE: compact actions (right) */}
        <div className="mobile-actions mobile-only">
          <button
            className="icon-btn"
            onClick={() => setShowSearch(prev => !prev)}
            aria-label="Поиск"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            className="icon-btn"
            onClick={() => token ? navigate('/profile') : navigate('/login')}
            aria-label="Аккаунт"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          <NavLink to="/cart" className="icon-btn cart" aria-label="Корзина">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </NavLink>
        </div>


        {/* Основной контент */}
        <div className="header-wrapper">
          {/* Левая иконка */}
          <img src={assets.handLeft} alt="Левая рука" className="arm-icon" />

          {/* Центр */}
          <div className="header-center">
            <div className="relative">
              <NavLink to="/">
                <h1 className="font-literata italic font-extrabold text-[length:var(--font-size-h1)] leading-[var(--line-height-title)] text-center text-primary m-0" style={{
                  fontSize: "clamp(14px, 4vw, 40px)",
                  lineHeight: "clamp(18px, 5vw, 64px)"
                }}>
                  ЧЕРНИЛЬНАЯ ЛАВКА
                </h1>
                <img
                  src={assets.logo}
                  alt="Логотип"
                  className="absolute left-[101%] top-1/2 -translate-y-[65%] w-4 md:w-5 2xl:w-9 h-auto"
                />
              </NavLink>
            </div>

            <nav className="category-menu flex flex-row justify-center items-center gap-[0.9375rem] font-literata font-normal text-[length:var(--font-size-regular)] leading-6 text-center">
              <NavLink to="/collection" className="text-primary hover:text-accent">Перьевые ручки</NavLink>
              <NavLink to="/*" className="text-primary hover:text-accent">Чернила</NavLink>
              <NavLink to="/*" className="text-primary hover:text-accent">Бумага</NavLink>
              <NavLink to="/*" className="text-primary hover:text-accent">Аксессуары</NavLink>
            </nav>
          </div>

          {/* Правая иконка */}
          <img src={assets.handRight} alt="Правая рука" className="arm-icon" />
        </div>

        {/* Кнопки справа */}
        <div className="main-actions">
          <button onClick={() => setShowSearch(prev => !prev)} className="search-button" aria-label="Поиск"></button>

          <div className="group relative">
            <div className="flex flex-col items-center justify-end w-[100px] h-[100%] text-primary ml-[30px] mr-[30px]">
              <img
                onClick={() => token ? logout() : navigate('/login')}
                src={assets.login_closed}
                alt="Логин"
                className="cursor-pointer w-[65px] h-[65px] m-3"
              />
              <span className="text-sm leading-[18px] font-semibold">
                {token ? 'Выйти' : 'Войти'}
              </span>

              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu right-0 top-full pt-4">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100">
                    <p className="cursor-pointer hover:text-accent" onClick={() => navigate('/profile')}>Профиль</p>
                    <p className="cursor-pointer hover:text-accent" onClick={() => navigate('/orders')}>Заказы</p>
                    <p className="cursor-pointer hover:text-accent" onClick={logout}>Выйти</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="cart-button-wrapper">
            <NavLink to="/cart">
              <div className="cart-button">
                <div className="cart-icon">
                  <span className="cart-count">{getCartCount()}</span>
                </div>
                <div className="cart-price"><p>{formatPrice(subtotal)} {currency}</p></div>
              </div>
            </NavLink>
          </div>
        </div>

        {/* MOBILE slide-out menu */}
        <div
          id="mobile-nav"
          className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
        >
          <nav className="mobile-nav-links">
            <NavLink to="/collection" onClick={() => setIsMenuOpen(false)}>Перьевые ручки</NavLink>
            <NavLink to="/*" onClick={() => setIsMenuOpen(false)}>Чернила</NavLink>
            <NavLink to="/*" onClick={() => setIsMenuOpen(false)}>Бумага</NavLink>
            <NavLink to="/*" onClick={() => setIsMenuOpen(false)}>Аксессуары</NavLink>
            <hr />
            {!token ? (
              <button className="mobile-link-btn" onClick={() => { setIsMenuOpen(false); navigate('/login') }}>Войти</button>
            ) : (
              <>
                <button className="mobile-link-btn" onClick={() => { setIsMenuOpen(false); navigate('/orders') }}>Заказы</button>
                <button className="mobile-link-btn" onClick={() => { setIsMenuOpen(false); logout(); }}>Выйти</button>
              </>
            )}
          </nav>
        </div>
        <div
          className={`mobile-backdrop ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        />
      </header>
      <div className="w-[80%] mx-auto mt-[2px] border-t-[3px] border-primary h-0"></div>
    </>
  );
};

export default Navbar;
