import React from "react";
import BlogCard from "./BlogCard";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const blogData = [
  {
    image: "/images/blog_1.png",
    title: "Как выбрать свою первую перьевую ручку",
    date: "6 июля 2022",
  },
  {
    image: "/images/blog_2.png",
    title: "Заправка чернил через конвертер — просто!",
    date: "6 июля 2022",
  },
  {
    image: "/images/blog_3.png",
    title: "Почему бумага имеет значение",
    date: "6 июля 2022",
  },
];

const SidebarTop = () => {
  return (
    <aside className=" flex 
  flex-col 
  justify-center 
  h-full 
  px-[1.2rem] 
  py-4 
  bg-secondary 
  text-primary 
  border-l-[3px] 
  border-t-[3px] 
  border-primary 
  basis-[23%] 
  flex-[0_0_20%]">
      <img
        src={assets.blogLogo}
        alt="Блог логотип"
        className="w-[clamp(100px,20vw,200px)] pb-4 px-4 mx-auto"
      />

      <div className="flex flex-col gap-3">
        {blogData.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}

      <Link
  to="/Blog"
  className="flex items-center justify-center gap-4 text-[clamp(16px,1.4vw,20px)] font-literata font-medium text-primary hover:text-accent transition-colors"
>
  <span className="flex-1 h-[3px] bg-current transition-all duration-300"></span>
  Еще
  <span className="flex-1 h-[3px] bg-current transition-all duration-300"></span>
</Link>
      </div>
    </aside>
  );
};

export default SidebarTop;