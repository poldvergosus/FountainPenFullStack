import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./slider.css";
const SimilarProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);
      const { currency } = useContext(ShopContext);

    useEffect(() => {

        if (products.length > 0) {
      let productsCopy = [...products];

      productsCopy = productsCopy.filter(item => item.category === category);
      productsCopy = productsCopy.filter(item => item.brand === subCategory);

      const similar = productsCopy.slice(0, 5);

      setRelated(similar);
      console.log('Похожие товары:', similar); 
    }
  }, [products, category, subCategory]);

    return (
        <section className="mt-16">
      <h2 className="text-xl font-bold text-primary mb-4 text-center">Похожие товары</h2>

      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={16}
        loop
        navigation
        
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="overflow-hidden"
      >
        {related.map((product, index) => (
          <SwiperSlide key={index}>
             <Link
              to={`/product/${product.id}`} 
                        key={index}
                        className="border-[4px] border-primary p-[0.2rem] w-full h-full flex flex-col">
                        <div className="border-[2px] border-primary p-4 flex flex-col flex-grow relative">
            
                          <span
                            className="absolute top-4 left-4 border-[0.2em] border-primary rounded-full text-primary text-xs font-regular flex items-center justify-center"
                            style={{ width: '2.5rem', height: '1.8rem' }}
                          >
                            {product.size}
                          </span>
            
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full mb-4 mt-7"
                          />
                          <div className="flex flex-col flex-grow">
                            <h3 className="font-literata font-semibold text-lg text-primary mb-1 line-clamp-2">
                              {product.title}
                            </h3>
                            <p className="font-literata text-sm text-primary mb-1 flex-grow">
                              {product.desc}
                            </p>
                            <strong className="text-lg font-extrabold font-literata text-primary mt-3">
                              {product.price} {currency}
                            </strong>
                          </div>
                        </div>
                      </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Настраиваемые стрелки */}
      <div className="similar-button-prev absolute top-1/2 -left-4 z-10 w-8 h-8 bg-white border border-primary rounded-full flex items-center justify-center cursor-pointer text-primary" />
      <div className="similar-button-next absolute top-1/2 -right-4 z-10 w-8 h-8 bg-white border border-primary rounded-full flex items-center justify-center cursor-pointer text-primary" />
    </section>
    )
}

export default SimilarProducts
