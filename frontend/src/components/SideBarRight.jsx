import React from "react";
import { assets } from "../assets/assets";

const SidebarRight = () => {
  return (
    <aside className="flex flex-col justify-start
    h-[48%]
    px-[1.2rem] py-4
    bg-secondary text-primary
    border-t-[3px] border-r-[3px] border-primary
    flex-[0_0_23%]">
      <img
        src={assets.newsletterLogo}
        alt="Подписка"
        className="w-full pb-4 px-4"
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
