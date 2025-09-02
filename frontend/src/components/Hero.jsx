import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import "./Hero.css"

const Hero = () => {
  return (
    <>

      <section className="block xl:hidden bg-[var(--color-primary)] w-full pt-10 flex flex-col items-center">
        <div className="max-w-[600px] px-4 text-center">
          <h1
            className="font-black font-literata text-white tracking-[-0.03em] mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              lineHeight: "1.2",
            }}
          >
            ЧЕРНИЛА.ПЕРО.ВЫ.
          </h1>

          <p
            className="font-literata font-semibold text-white tracking-[0.05em] mb-6"
            style={{
              fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
              lineHeight: "1.4",
            }}
          >
            Найдите свою идеальную перьевую ручку и начните писать новую главу
          </p>

          <Link
            to="/collection"
            className="
              relative w-[167px] 
              inline-block
              bg-white text-[#072556]
              font-literata font-semibold text-xl
              rounded-[2px] cursor-pointer
              z-[1] px-4 py-2 no-underline
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

          {/* heroPen прямо под текстом */}
          <div className="mt-8 flex justify-center">
            <img
              src={assets.heroPen}
              alt="Перо"
              className="w-[320px] max-w-[80%] h-auto"
            />
          </div>
        </div>
      </section>

      <section
        className="hidden xl:flex items-stretch relative justify-center text-center mt-[10px] bg-no-repeat bg-top bg-contain bg-[var(--color-primary)]"
        style={{
          backgroundImage: `url(${assets.heroPage})`,
          minHeight: "clamp(350px, calc((100vw - 1870px) * 0.3 + 500px), 500px)",
        }}
      >
        <div
          className="absolute h-[231px] left-[282px] m-auto flex flex-col items-start p-0 box-border"
          style={{
            top: "var(--hero-top, 10%)",
            left: "max(282px, calc((100vw - 1700px)/2 + 282px))",
            width: "clamp(100px, calc((100vw - 1645px) * 0.4 + 500px), 500px)",
            maxWidth: "20%",
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
    </>
  );
};

export default Hero;
