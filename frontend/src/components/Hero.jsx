import React from "react";
import { assets } from "../assets/assets"; 
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="flex items-stretch justify-center text-center mt-[10px] bg-no-repeat bg-top bg-contain bg-[var(--color-primary)]"
      style={{
        backgroundImage: `url(${assets.heroPage})`,
        minHeight: "clamp(350px, calc((100vw - 1870px) * 0.3 + 500px), 500px)",
      }}
    >
      <div
        className="absolute  h-[231px] left-[282px] m-auto flex flex-col items-start p-0 box-border"
        style={{
          top: "clamp(200px, calc((100vw - 1645px) * 0.3 + 259px), 259px)",
          width: "clamp(100px, calc((100vw - 1645px) * 0.4 + 500px), 500px)",
          rowGap: "clamp(8px, calc((100vw - 480px) * 0.02), 25px)",
        }}
      >
        <h1
          className="font-black font-literata text-white text-start tracking-[-0.03em] leading-[59px]"
          style={{
            fontSize:
              "clamp(1.8rem, calc((100vw - 1645px) * 0.03 + 2.5rem), 2.5rem)",
            lineHeight: "clamp(2rem, 3vw, 2rem)",
          }}
        >
          ЧЕРНИЛА.ПЕРО.ВЫ.
        </h1>

        <p
          className="text-start font-literata font-semibold text-white tracking-[0.05em] leading-[36px]"
          style={{
            fontSize: "clamp(0.8rem, 0.879rem + 0.2vw, 1.5rem)",
          }}
        >
          Найдите свою идеальную перьевую ручку и начните писать новую главу
        </p>

        <Link
          to="/collection"
          className="
            relative w-[167px] 
            bg-white text-[#072556]
            font-literata font-semibold text-2xl
            rounded-[2px] border-none cursor-pointer
            z-[1] p-[10px] no-underline
            hover:text-accent
            before:content-[''] before:absolute 
            before:top-[3px] before:bottom-[3px] 
            before:left-[3px] before:right-[3px]
            before:border before:border-[#072556]
            before:rounded-[2px] before:z-[2]
            before:hover:border-accent
        "
        >
          Смотреть
        </Link>
      </div>
    </section>
  );
};

export default Hero;
