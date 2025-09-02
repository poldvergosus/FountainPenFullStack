import React from "react";
import { assets } from "../assets/assets";
import { Disclosure } from '@headlessui/react'

const navLinks = [
  { label: "Каталог", href: "#" },
  { label: "Новинки", href: "#" },
  { label: "Бестселлеры", href: "#" },
];

const infoLinks = [
  { label: "О нас", href: "/about" },
  { label: "F.A.Q", href: "#" },
  { label: "Статьи", href: "#" },
  { label: "Контакты", href: "/contact" },
  { label: "Возврат", href: "" },
];

const Footer = () => {
  return (
    <footer className="py-4 font-literata">
      <div className="mb-8 mt-5">
        <img
          src={assets.footerLogo}
          alt="Ручк"
          className="block w-1/4 mx-auto"
        />
      </div>

      <div className="px-0 py-4">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-8 md:gap-[10rem] text-[color:var(--color-primary)]">

            {/* Колонка с логотипом и контактами */}
            <div className="flex-[0_1_auto] w-full md:w-auto flex flex-col items-center md:items-start text-center md:text-left">
              {/* Заголовок + перо: в строку и по центру на мобиле; на десктопе — как раньше */}
              <div className="uppercase md:relative md:inline-block">
                <div className="flex items-center justify-center gap-2 md:block">
                  <h1 className="text-base md:mb-[-1rem] font-literata italic font-extrabold text-[color:var(--color-primary)] m-0">
                    ЧЕРНИЛЬНАЯ ЛАВКА
                  </h1>
                  <img
                    src={assets.logo}
                    alt="Перо"
                    className="
          w-[18px] h-auto
          md:w-[32px] md:absolute md:left-[102%] md:top-[45%] md:-translate-y-[65%]
        "
                  />
                </div>
              </div>

              {/* Контакты: на мобиле — в одну строку (с переносами по ширине), на десктопе — как было */}
              <div className="md:hidden flex flex-wrap items-center justify-center gap-x-4 gap-y-1 my-4 text-[color:var(--color-primary)]">
                <span>Москва: +7 (495) 210-99-81</span>
                <span>СПБ: +7 (495) 210-99-81</span>
                <a href="mailto:info@pens.ru" className="underline decoration-inherit">info@pens.ru</a>
              </div>

              <div className="hidden md:block">
                <p className="my-[1em]">
                  Москва<br />+7 (495) 210-99-81
                </p>
                <p className="my-[1em]">
                  СПБ<br />+7 (495) 210-99-81
                </p>
                <p className="my-[1em]">
                  <a href="mailto:info@pens.ru" className="text-[color:var(--color-primary)]">info@pens.ru</a>
                </p>
              </div>

              {/* Соцсети: центр на мобиле, слева на десктопе */}
              <div className="inline-flex gap-[10px] items-center justify-center md:justify-start mt-2">
                <a href="#"><img src={assets.social.vkIcon} alt="VK" /></a>
                <a href="#"><img src={assets.social.tgIcon} alt="Telegram" /></a>
              </div>
            </div>

            {/* Навигация */}
            <div className="flex-[0_1_auto] w-full md:w-auto">
              {/* Десктопная версия */}
              <div className="hidden md:block">
                <h3 className="text-[1.17em] font-bold m-0">Навигация</h3>
                <ul className="list-none p-0">
                  {navLinks.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Мобильная версия: Disclosure */}
              <div className="md:hidden">
                <Disclosure>
                  {({ open }) => (
                    <div className="border-b border-[#ddd] pb-2">
                      <Disclosure.Button className="w-full flex items-center justify-between py-3 font-bold">
                        Навигация
                        <span>{open ? "−" : "+"}</span>
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <ul className="list-none p-0">
                          {navLinks.map((l) => (
                            <li key={l.label}>
                              <a
                                href={l.href}
                                className="no-underline text-[color:var(--color-primary)] block py-2"
                              >
                                {l.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              </div>
            </div>

            {/* Информация */}
            <div className="flex-[0_1_auto] w-full md:w-auto">
              {/* Десктопная версия */}
              <div className="hidden md:block">
                <h3 className="text-[1.17em] font-bold m-0">Информация</h3>
                <ul className="list-none p-0">
                  {infoLinks.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="no-underline text-[color:var(--color-primary)] block my-[1em]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Мобильная версия: Disclosure */}
              <div className="md:hidden">
                <Disclosure>
                  {({ open }) => (
                    <div className="border-b border-[#ddd] pb-2">
                      <Disclosure.Button className="w-full flex items-center justify-between py-3 font-bold">
                        Информация
                        <span>{open ? "−" : "+"}</span>
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <ul className="list-none p-0">
                          {infoLinks.map((l) => (
                            <li key={l.label}>
                              <a
                                href={l.href}
                                className="no-underline text-[color:var(--color-primary)] block py-2"
                              >
                                {l.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              </div>
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
