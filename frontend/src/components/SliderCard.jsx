import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { formatPrice } from '../utils/format';
import { Link } from "react-router-dom";

const SliderCard = ({ image, title, desc, price, id, _id, stock }) => {
  const { currency } = useContext(ShopContext);
  const pid = id ?? _id;

  const productStock = stock ?? 0;
  const isOutOfStock = productStock === 0;
  const isLowStock = productStock > 0 && productStock <= 5;

  return (
    <Link
      to={pid ? `/product/${_id}` : '#'}
      className={`relative product-card block w-[100%] p-4 m-4 bg-white cursor-pointer group transition-all duration-300 ${
        isOutOfStock ? 'opacity-70 hover:opacity-100' : ''
      }`}
      onClick={(e) => { if (!pid) e.preventDefault(); }}
      aria-disabled={!pid}
    >
      {/* Изображение */}
      <img 
        src={image} 
        alt={title} 
        className={`w-full p-0 m-0 transition-all duration-300 ${
          isOutOfStock ? 'grayscale group-hover:grayscale-0' : ''
        }`} 
      />

      <div className="card-info-container flex flex-col gap-1">
        <h3 className="text-[clamp(0.875rem,2.5vw,1.125rem)] font-semibold font-literata text-primary">
          {title}
        </h3>
        <p className="text-sm font-normal font-literata text-primary">{desc}</p>
        
        {/* Цена и статус наличия */}
        <div className="flex justify-between items-end mt-2">
          <strong className={`text-lg font-extrabold font-literata ${
            isOutOfStock ? 'text-gray-400' : 'text-primary'
          }`}>
            {formatPrice(price)} {currency}
          </strong>

          {isOutOfStock && (
            <span className="text-xs font-semibold text-red-500">
              Нет в наличии
            </span>
          )}
          {isLowStock && (
            <span className="text-xs font-semibold text-yellow-600">
              Осталось {productStock} шт.
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SliderCard;