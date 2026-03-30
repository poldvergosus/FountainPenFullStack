import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ slug, image, title, date }) => {
  return (
    <Link 
      to={`/blog/${slug}`}
      className="group block border-t-4 border-primary transition-colors duration-300 hover:border-accent"
    >
      <div className="mb-2">
        <img
          src={image}
          alt={title}
          className="w-full max-w-[280px] object-contain pb-2"
        />
      </div>
      <div className="text-left text-[16px] font-normal leading-[1.4] text-primary group-hover:text-accent transition-colors">
        <div className="font-literata">{title}</div>
        <div className="text-sm text-textbg font-literata mt-1 group-hover:text-accent transition-colors">
          {date}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;