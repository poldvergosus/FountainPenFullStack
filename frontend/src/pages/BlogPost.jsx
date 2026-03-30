import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

const BlogPost = () => {
  const { slug } = useParams();
  const { backendUrl, blogs } = useContext(ShopContext);
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.post(backendUrl + '/api/blog/single', { slug });
        if (response.data.success) {
          setBlog(response.data.blog);
          
          const related = blogs
            .filter(b => b._id !== response.data.blog._id)
            .slice(0, 3);
          setRelatedBlogs(related);
        } else {
          navigate('/blog');
        }
      } catch (error) {
        console.log(error);
        navigate('/blog');
      }
    }

    if (slug) {
      fetchBlog();
    }
  }, [slug, backendUrl, blogs, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (!blog) {
    return (
      <div className="w-full px-4 py-20 text-center">
        <p className="text-lg text-gray-500">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-600 font-literata">
          <Link to="/" className="hover:text-accent transition-colors">Главная</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-accent transition-colors">Блог</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{blog.title}</span>
        </div>

        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-literata leading-tight">
          {blog.title}
        </h1>

        {/* Мета-информация */}
        <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600 font-literata">
          <span className="flex items-center gap-1">
            {formatDate(blog.date)}
          </span>
          <span className="flex items-center gap-1">
            {blog.author}
          </span>
        </div>

        {/* Изображение */}
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full max-h-[500px] object-cover rounded-lg border-2 border-primary mb-8 shadow-md"
        />

        {/* Excerpt */}
        <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed font-literata italic border-l-4 border-primary pl-4 py-2 bg-gray-50">
          {blog.excerpt}
        </p>

        {/* Markdown Content */}
        <article className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              // Заголовки
              h1: ({node, ...props}) => (
                <h1 className="text-3xl font-bold mt-8 mb-4 text-primary font-literata border-b-2 border-gray-200 pb-2" {...props} />
              ),
              h2: ({node, ...props}) => (
                <h2 className="text-2xl font-bold mt-8 mb-4 text-primary font-literata" {...props} />
              ),
              h3: ({node, ...props}) => (
                <h3 className="text-xl font-bold mt-6 mb-3 text-primary font-literata" {...props} />
              ),
              h4: ({node, ...props}) => (
                <h4 className="text-lg font-semibold mt-4 mb-2 text-primary font-literata" {...props} />
              ),

              // Параграфы
              p: ({node, ...props}) => (
                <p className="mb-4 text-gray-700 leading-relaxed text-base" {...props} />
              ),

              // Списки
              ul: ({node, ...props}) => (
                <ul className="list-disc list-inside mb-4 ml-4 space-y-2" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="list-decimal list-inside mb-4 ml-4 space-y-2" {...props} />
              ),
              li: ({node, ...props}) => (
                <li className="text-gray-700 leading-relaxed" {...props} />
              ),

              // Ссылки
              a: ({node, ...props}) => (
                <a className="text-accent hover:underline font-medium transition-colors" {...props} target="_blank" rel="noopener noreferrer" />
              ),

              // Блоки кода
              code: ({node, inline, ...props}) => 
                inline ? (
                  <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                ) : (
                  <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono" {...props} />
                ),
              pre: ({node, ...props}) => (
                <pre className="mb-4 overflow-x-auto" {...props} />
              ),

              // Цитаты
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-accent pl-4 py-2 my-4 italic text-gray-600 bg-gray-50" {...props} />
              ),

              // Таблицы (GFM)
              table: ({node, ...props}) => (
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full border-collapse border border-gray-300" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => (
                <thead className="bg-gray-100" {...props} />
              ),
              tbody: ({node, ...props}) => (
                <tbody {...props} />
              ),
              tr: ({node, ...props}) => (
                <tr className="border-b border-gray-300" {...props} />
              ),
              th: ({node, ...props}) => (
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-primary" {...props} />
              ),
              td: ({node, ...props}) => (
                <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props} />
              ),

              // Горизонтальная линия
              hr: ({node, ...props}) => (
                <hr className="my-8 border-t-2 border-gray-200" {...props} />
              ),

              // Изображения
              img: ({node, ...props}) => (
                <img className="max-w-full h-auto rounded-lg my-4 shadow-md" {...props} />
              ),

              // Зачеркнутый текст (GFM)
              del: ({node, ...props}) => (
                <del className="text-gray-500" {...props} />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </article>

        {/* Разделитель */}
        <div className="my-12 border-t-2 border-gray-200"></div>

        {/* Похожие статьи */}
        {relatedBlogs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6 font-literata">
              Читайте также
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  to={`/blog/${relatedBlog.slug}`}
                  className="group border-2 border-primary rounded-lg overflow-hidden hover:border-accent transition-all hover:shadow-lg"
                >
                  <img 
                    src={relatedBlog.image} 
                    alt={relatedBlog.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-2 font-literata">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-literata">
                      {formatDate(relatedBlog.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Кнопка назад */}
        <div className="mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors font-literata shadow-md hover:shadow-lg"
          >
            ← Вернуться к блогу
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogPost