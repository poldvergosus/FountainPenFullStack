import React, { useContext } from "react";
import BlogCard from "./BlogCard";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const SidebarTop = () => {
  const { blogs } = useContext(ShopContext);

  const recentBlogs = blogs.slice(0, 3);

  return (
    <aside className="
    hidden 2xl:flex flex-col justify-start
    px-[1.2rem] py-4
    bg-secondary text-primary
    border-t-[3px] border-l-[3px] border-primary
    grow-0 shrink-0
    basis-[clamp(200px,24vw,260px)]
    self-start">
      <img
        src={assets.blogLogo}
        alt="Блог логотип"
        className="w-full pb-4 px-4 mx-auto"
      />

      <div className="flex flex-col gap-3">
        {recentBlogs.length > 0 ? (
          recentBlogs.map((blog) => (
            <BlogCard 
              key={blog._id} 
              slug={blog.slug}
              image={blog.image}
              title={blog.title}
              date={new Date(blog.date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 font-literata">Статьи загружаются...</p>
        )}

        <Link
          to="/blog"
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