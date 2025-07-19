import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./slider.css";
import SliderCard from "./SliderCard";
import { ShopContext } from "../context/ShopContext";

const PopularSlider = () => {
  
  const { products = [], currency } = useContext(ShopContext) || {};
  const popularProducts = products.filter(product => product.popular);

//   useEffect(() => {
//   if (Array.isArray(products)) {
//     setPopularProducts(products.filter(product => product.popular === true));
//   } else {
//     setPopularProducts([]); 
//   }
// }, [products]);
  
  return (
    <section
      className="-my-8 w-full"
      id="popular"
    >
      {/* Заголовок */}
      <h2 className="section-title flex items-center justify-center font-literata font-bold text-primary text-[clamp(1.8rem,4vw,2.5rem)] leading-[71px] gap-8 relative max-w-[90%] mx-auto mb-2">
        <span className="flex-1 h-[3px] bg-primary"></span>
        Популярные товары
        <span className="flex-1 h-[3px] bg-primary"></span>
      </h2>

      {/* Контейнер с рамкой */}
      <div className="border-4 border-primary p-1 relative w-full box-border">
        {/* Swiper с внутренней рамкой */}
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={0}
          loop
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="swiper-padding border-2 border-primary w-full relative overflow-hidden"
        >

          <div className="carousel-fade-left z-[1] pointer-events-none"></div>
          <div className="carousel-fade-right z-[1] pointer-events-none"></div>

          {popularProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <SliderCard {...product}  currency={currency} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Стрелки навигации */}
        <div className="swiper-button-prev absolute left-[-10px] z-20 w-10 h-10 text-primary" />
<div className="swiper-button-next absolute right-[-10px] z-20 w-10 h-10 text-primary" />
      </div>
    </section>
  );
};

export default PopularSlider;
