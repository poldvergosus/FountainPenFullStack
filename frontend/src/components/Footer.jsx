import React from "react";
import { assets } from "../assets/assets"; 

const Footer = () => {
  return (
    <footer className="py-4 font-literata">
      <div className="mb-8 mt-5">
        <img
          src={assets.footerLogo}
          alt="Ручк "
          className="block w-1/4 mx-auto"
        />
      </div>

      <div className="px-0 py-4">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex justify-center items-start gap-[10rem] text-[color:var(--color-primary)]">
            <div className="flex-[0_1_auto]">
              <div className="relative inline-block text-[1.5rem] uppercase">
                <h1 className="text-base mb-[-1rem] font-literata italic font-extrabold text-center text-[color:var(--color-primary)] m-0">
                  ЧЕРНИЛЬНАЯ ЛАВКА
                </h1>
                <img
                  src={assets.logo}
                  alt="Перо"
                  className="absolute left-[102%] top-[45%] translate-y-[-65%] w-[32px]"
                />
              </div>

              <p className="my-[1em]">
                Москва
                <br />
                +7 (495) 210-99-81
              </p>
              <p className="my-[1em]">
                СПБ
                <br />
                +7 (495) 210-99-81
              </p>
              <p className="my-[1em]">
                <a
                  href="mailto:info@pens.ru"
                  className="text-[color:var(--color-primary)]"
                >
                  info@pens.ru
                </a>
              </p>
              <div className="inline-flex gap-[10px] items-center">
                <a href="#">
                  <img src={assets.social.vkIcon} alt="VK" />
                </a>
                <a href="#">
                  <img src={assets.social.tgIcon} alt="Telegram" />
                </a>
              </div>
            </div>

            <div className="flex-[0_1_auto]">
              <h3 className="text-[1.17em] font-bold m-0 ">Навигация</h3>
              <ul className="list-none p-0">
                <li>
                  <a
                    href="#"
                    className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                  >
                    Каталог
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                  >
                    Новинки
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                  >
                    Новые товары
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                  >
                    Бестселлеры
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex-[0_1_auto]">
              <h3 className="text-[1.17em] font-bold m-0">Информация</h3>
              <ul className="list-none p-0">
                <li>
                  <a
                    href="#"
                    className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                  >
                    О нас
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                  >
                    F.A.Q
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                  >
                    Статьи
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                  >
                    Доставка
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                  >
                    Возврат
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 pt-4 border-t border-[#ddd]">
        © 2025
      </div>
    </footer>
  );
};

export default Footer;
