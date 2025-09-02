import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "./slider.css"
import { formatPrice } from '../utils/format';

const SimilarProducts = ({
  category,
  brand,              
  subCategory,
   currentId,
  colorNames = [],   
  limit = 5
}) => {
  const { products, currency } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  const normColors = useMemo(() => new Set(
    (colorNames || []).map(c => (c || '').toString().toLowerCase())
  ), [colorNames]);

  const effectiveBrand = brand ?? subCategory;

  const hasCommonColor = (p) => {
    const arr = Array.isArray(p.colors)
      ? p.colors.map(c => (c?.name ?? c)?.toString().toLowerCase())
      : (p.color ? [p.color.toString().toLowerCase()] : []);
    return arr.some(name => normColors.has(name));
  };

  useEffect(() => {
    if (!products?.length) { setRelated([]); return; }

    const list = products.filter(p => p?._id?.toString() !== currentId?.toString());

    const sameBrandAndCategory = list.filter(p =>
      p.category === category && p.brand === effectiveBrand
    );

    const sameColorInCategory = list.filter(p =>
      p.category === category && normColors.size > 0 && hasCommonColor(p)
    );

    const sameCategory = list.filter(p => p.category === category);
    const seen = new Set();
    const uniq = (arr) => arr.filter(p => {
      const key = p?._id?.toString();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const combined = uniq([
      ...sameBrandAndCategory,
      ...sameColorInCategory,
      ...sameCategory,
    ]).slice(0, limit);

    setRelated(combined);
  }, [products, category, effectiveBrand, normColors, currentId, limit]);

  if (!related.length) return null;

  const loopEnabled = related.length > 3;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold text-primary mb-4 text-center">Похожие товары</h2>

      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={15}
        loop={loopEnabled}
        navigation
        breakpoints={{
          0:   { slidesPerView: 2 },
          1024:{ slidesPerView: 3 },
        }}
        className="overflow-hidden"
      >
        {related.map((product) => (
          <SwiperSlide key={product._id}>
            <Link
              to={`/product/${product._id}`}
              className="border-[4px] border-primary p-[0.2rem] w-full h-full flex flex-col"
            >
              <div className="border-[2px] border-primary p-4 flex flex-col flex-grow relative">
                <span
                  className="absolute top-4 left-4 border-[0.2em] border-primary rounded-full text-primary text-xs font-regular flex items-center justify-center"
                  style={{ width: '2.5rem', height: '1.8rem' }}
                >
                  {product.size}
                </span>

                <img src={product.image} alt={product.title} className="w-full mb-4 mt-7" />
                <div className="flex flex-col flex-grow">
                  <h3 className="font-literata font-semibold text-lg text-primary mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="font-literata text-sm text-primary mb-1 flex-grow">
                    {product.desc}
                  </p>
                  <strong className="text-lg font-extrabold font-literata text-primary mt-3">
                    {formatPrice(product.price)} {currency}
                  </strong>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default SimilarProducts