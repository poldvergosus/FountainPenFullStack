import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const Blog = () => {
  const { blogs } = useContext(ShopContext);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <div className="w-full px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 font-literata">
          Блог о перьевых ручках
        </h1>

        {blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Статьи загружаются...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link 
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="group border-2 border-primary rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-accent"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-primary">
                    {formatDate(blog.date)}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-primary mb-3 font-literata group-hover:text-accent transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Автор: {blog.author}</span>
                    <span className="text-accent font-semibold group-hover:underline">
                      Читать далее →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog