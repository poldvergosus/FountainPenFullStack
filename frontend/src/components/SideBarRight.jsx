import React from "react";
import { assets } from "../assets/assets";

const SidebarRight = () => {
  return (
    <aside className="
         order-last w-full basis-full mt-8 px-6 py-6
        bg-secondary text-primary
        border-t-[3px] border-primary
        flex flex-col justify-start

        /* с 2xl: обычный сайдбар справа */
        2xl:order-none
        2xl:w-auto 2xl:px-[1.2rem] 2xl:py-4 2xl:mt-0
        2xl:border-r-[3px]
        2xl:grow-0 2xl:shrink-0 2xl:basis-[clamp(200px,24vw,260px)]
        2xl:self-start
">
      <img
        src={assets.newsletterLogo}
        alt="Подписка"
        className="hidden 2xl:block w-full pb-4"
        loading="lazy"
      />
      <div className="card-info-container mb-4">
        <h3 className="font-literata text-primary text-xl mb-2">
          Подпишитесь на нашу рассылку
        </h3>
        <p className="font-literata text-textbg text-base leading-relaxed">
          Новинки, обзоры, советы, специальные предложения
        </p>
      </div>

      <input
        type="text"
        placeholder="Email"
        className="outline-none w-full text-[20px] border-0 border-b-[2px] border-primary font-thin font-literata text-textbg p-[0.4em] mb-4 bg-transparent bg-white"
      />

      <button className="border-2 border-primary bg-primary text-white cursor-pointer px-4 py-2 text-[20px] font-thin font-literata transition duration-400 hover:bg-accent hover:border-accent">
        Подписаться
      </button>
    </aside>
  );
};

export default SidebarRight;
