import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const BlogList = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/blog/list')
      if (response.data.success) {
        setList(response.data.blogs)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeBlog = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту статью?')) return;
    
    try {
      const response = await axios.post(
        backendUrl + '/api/blog/remove', 
        { id }, 
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className='text-2xl font-bold text-gray-800'>Статьи блога</h1>
        <span className="text-sm text-gray-600">Всего: {list.length}</span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {list.map((item, index) => (
          <div key={index} className='border rounded-lg overflow-hidden hover:shadow-lg transition'>
            <img 
              className='w-full h-48 object-cover' 
              src={item.image} 
              alt={item.title} 
            />
            <div className='p-4'>
              <p className='text-xs text-gray-500 mb-2'>{formatDate(item.date)}</p>
              <h3 className='font-bold text-lg mb-2 line-clamp-2'>{item.title}</h3>
              <p className='text-sm text-gray-600 mb-3 line-clamp-3'>{item.excerpt}</p>
              <p className='text-xs text-gray-500 mb-3'>Автор: {item.author}</p>
              
              <div className='flex gap-2'>
                <button
                  onClick={() => removeBlog(item._id)}
                  className='flex-1 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm'
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">Статей пока нет</p>
          <p className="text-sm">Добавьте первую статью</p>
        </div>
      )}
    </>
  )
}

export default BlogList