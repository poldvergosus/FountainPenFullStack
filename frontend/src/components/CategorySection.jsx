import React from "react";
import "./category.css"; // кастомные спрайты
import { Link } from "react-router-dom";

const categories = [
  {
   name: "Чернила",
    icon: "icon-ink",
    link: "/*",
  },
  {
    name: "Перьевые ручки",
    icon: "icon-pen",
    link: "/collection",
  },
  {
    name: "Ежедневники",
    icon: "icon-notebook",
    link: "/*",
  },
];

const CategorySection = () => {
  return (
    <section className="category-section w-full mt-12">
      <h2 className="section-title flex items-center justify-center font-literata font-bold text-primary
        text-[clamp(1.6rem,3.8vw,2.5rem)] leading-tight text-center gap-4 sm:gap-8 relative max-w-[95%] mx-auto mb-8">
        <span className="hidden sm:block flex-1 h-[3px] bg-primary"></span>
        Топ категорий
        <span className="hidden sm:block flex-1 h-[3px] bg-primary"></span>
      </h2>

      <div
        className="
    category-container
    flex flex-wrap justify-center
    gap-6 sm:gap-8 lg:gap-12 xl:gap-14 2xl:gap-16
    w-full max-w-[1100px] mx-auto px-2 sm:px-4
  "
      >
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.link}
            className="category-card group flex flex-col items-center text-center
              text-primary hover:text-accent transition-colors duration-300"
          >
            <div
              className={`sprite-icon ${cat.icon}
                w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-28 xl:h-28`}
            />
            <div className="category-info-container">
              <h3 className="font-literata font-medium
                text-[clamp(16px,2.5vw,28px)] leading-snug mt-3 sm:mt-4 transition-colors duration-300">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;