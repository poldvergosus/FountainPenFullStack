import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const brands = [
  { name: "kaweco", image: "/images/brand_1.png" },
  { name: "lamy", image: "/images/brand_2.png" },
  { name: "pilot", image: "/images/brand_3.png" },
  { name: "diamine", image: "/images/brand_4.png" },
  { name: "twsbi", image: "/images/brand_5.png" },
  { name: "pelican", image: "/images/brand_6.png" },
  { name: "sailor", image: "/images/brand_7.png" },
  { name: "platinum", image: "/images/brand_8.png" },
  { name: "diplomat", image: "/images/brand_9.png" },
  { name: "herbin", image: "/images/brand_10.png" },
  { name: "rhodia", image: "/images/brand_11.png" },
  { name: "visconti", image: "/images/brand_12.png" },
  { name: "cross", image: "/images/brand_13.png" },
  { name: "waterman", image: "/images/brand_14.png" },
  { name: "carandache", image: "/images/brand_15.png" },
  { name: "parker", image: "/images/brand_16.png" },
  { name: "lechtturm", image: "/images/brand_17.png" },
  { name: "moleskine", image: "/images/brand_18.png" },
  { name: "atramentis", image: "/images/brand_19.png" },
];
const InfiniteScroll = () => {
  return (
    <div className="overflow-hidden border-b-[2px] border-brand whitespace-nowrap group">
      {[0, 1].map((_, i) => (
        <div
          key={i}
          className="inline-block animate-slide will-change-transform group-hover:[animation-play-state:paused]"
        >
          <div className="flex h-[60px] items-stretch">
            {brands.map((brand, index) => (
              <Link
                to={`/collection/${brand.name}`}
                key={`${i}-${brand.name}`}
                className="flex items-center px-[10px] border-r-[3px] border-brand h-full"
              >
                <img
                  src={brand.image}
                  alt={`Логотип ${brand.name}`}
                  className="h-[50px] object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfiniteScroll;
