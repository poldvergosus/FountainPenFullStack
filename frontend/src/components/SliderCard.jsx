import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { formatPrice } from '../utils/format';
import {Link } from "react-router-dom";

const SliderCard = ({ image, title, desc, price, id, _id }) => {
  const { currency } = useContext(ShopContext);
  const pid = id ?? _id;

  return (
    <Link
      to={pid ? `/product/${_id}` : '#'}
      className="relative product-card block w-[90%] p-4 m-4 bg-white cursor-pointer"
      onClick={(e) => { if (!pid) e.preventDefault(); }}
      aria-disabled={!pid}
    >
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
    </Link>
  );
};

export default SliderCard;
