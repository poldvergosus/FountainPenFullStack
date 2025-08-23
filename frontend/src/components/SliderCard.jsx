import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { formatPrice } from '../utils/format';

const SliderCard = ({ image, title, desc, price, id }) => {
  const { currency, addToCart } = useContext(ShopContext);

  const handleAdd = () => {
    if (addToCart && id !== undefined) {
      addToCart(id);
    } else {
      console.warn("Функция addToCart не определена или не указан id товара.");
    }
  };
  return (
    <div className="relative product-card w-[90%] p-4 m-4 bg-white">
      <img src={image} alt={title} className="w-full p-0 m-0" />
      <div className="card-info-container flex flex-col gap-1">
        <h3 className="text-[clamp(0.875rem,2.5vw,1.125rem)] font-semibold font-literata text-primary">
          {title}
        </h3>
        <p className="text-sm font-normal font-literata text-primary">{desc}</p>
        <strong className="text-lg font-extrabold font-literata text-primary mt-2">
          {formatPrice(price)} {currency}
        </strong>
      </div>
      <div className="ribbon">+Добавить</div>
    </div>
  );
};

export default SliderCard;
