import React from "react";
import "./category.css"; // кастомные спрайты
import { Link } from "react-router-dom";

const categories = [
  {
   name: "Чернила",
    icon: "icon-ink",
    link: "/collection/inks",
  },
  {
    name: "Перьевые ручки",
    icon: "icon-pen",
    link: "/collection/pens",
  },
  {
    name: "Ежедневники",
    icon: "icon-notebook",
    link: "/collection/notebooks",
  },
];

const CategorySection = () => {
  return (
    <div className="category-section w-full mt-12">
      <h2 className="section-title flex items-center justify-center font-literata font-bold text-primary text-[clamp(1.8rem,4vw,2.5rem)] leading-[71px] text-center gap-8 relative max-w-[90%] mx-auto mb-8">
        <span className="flex-1 h-[3px] bg-primary"></span>
        Топ категорий
        <span className="flex-1 h-[3px] bg-primary"></span>
      </h2>

      <div className="category-container flex items-baseline justify-center gap-[88.65px] text-center min-w-[860.63px] min-h-[231.08px] mx-auto">
        {categories.map((cat, index) => (
                   <Link
            to={cat.link}
            key={index}
            className="category-card text-primary hover:text-accent transition-colors duration-300"
          >
            <div className={`sprite-icon ${cat.icon}`}></div>
            <div className="category-info-container">
              <h3 className="font-literata font-medium text-[28px] leading-[41px] mt-4 transition-colors duration-300">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;