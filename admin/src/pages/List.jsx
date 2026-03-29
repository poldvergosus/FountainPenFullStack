import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import EditProductModal from '../components/EditProductModal'

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.products) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот товар?')) return;
    
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
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

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className='text-2xl font-bold text-gray-800'>Список товаров</h1>
        <span className="text-sm text-gray-600">Всего: {list.length}</span>
      </div>

      {/* Desktop Table */}
      <div className='hidden lg:block overflow-x-auto'>
        <div className="min-w-[1200px]">
          {/* Header */}
          <div className='grid grid-cols-[80px_2fr_2fr_1fr_1fr_1.5fr_1fr_100px] gap-3 items-center py-3 px-4 bg-gray-100 border rounded-t-lg text-sm font-semibold text-gray-700'>
            <div>Фото</div>
            <div>Название</div>
            <div>Описание</div>
            <div>Цена</div>
            <div>Бренд</div>
            <div>Категория</div>
            <div className="text-center">Теги</div>
            <div className="text-center">Действия</div>
          </div>

          {/* Rows */}
          {list.map((item, index) => (
            <div 
              className='grid grid-cols-[80px_2fr_2fr_1fr_1fr_1.5fr_1fr_100px] gap-3 items-center py-3 px-4 border-x border-b text-sm hover:bg-gray-50 transition' 
              key={index}
            >
              {/* Изображение */}
              <img 
                className='w-16 h-16 object-cover rounded border' 
                src={item.image} 
                alt={item.title} 
              />

              {/* Название + подзаголовок */}
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>

              {/* Детали (сокращенные) */}
              <p
                className={`text-gray-600 text-xs cursor-pointer ${
                  expandedIndex === index ? 'whitespace-normal' : 'line-clamp-2'
                }`}
                title="Нажмите чтобы развернуть"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                {item.details}
              </p>

              {/* Цена */}
              <p className="font-semibold text-gray-800">{item.price}{currency}</p>

              {/* Бренд */}
              <p className="text-gray-600">{item.brand}</p>

              {/* Категория */}
              <p className="text-gray-600 text-xs">{item.category}</p>

              {/* Теги (компактные) */}
              <div className="flex flex-col gap-1 items-center text-xs">
                {item.popular && (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-[10px]">
                    ⭐ Топ
                  </span>
                )}
                {item.nibmaterial && (
                  <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px]">
                    🏆 Золото
                  </span>
                )}
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px]">
                  {item.size}
                </span>
                {item.colors && item.colors.length > 0 && (
                  <div className="flex gap-1">
                    {item.colors.slice(0, 3).map((color, i) => (
                      <span
                        key={i}
                        title={color.name}
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{
                          background: color.hex === 'transparent'
                            ? 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 6px 6px'
                            : color.hex,
                        }}
                      />
                    ))}
                    {item.colors.length > 3 && (
                      <span className="text-[10px] text-gray-500">+{item.colors.length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Действия */}
              <div className='flex gap-2 justify-center'>
                <button
                  onClick={() => setEditingProduct(item)}
                  className='p-2 text-blue-600 hover:bg-blue-50 rounded transition'
                  title="Редактировать"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => removeProduct(item._id)}
                  className='p-2 text-red-600 hover:bg-red-50 rounded transition'
                  title="Удалить"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className='lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {list.map((item, index) => (
          <div key={index} className='border rounded-lg overflow-hidden hover:shadow-lg transition'>
            <img 
              className='w-full h-48 object-cover' 
              src={item.image} 
              alt={item.title} 
            />
            <div className='p-4'>
              <h3 className='font-semibold text-lg mb-1'>{item.title}</h3>
              <p className='text-sm text-gray-600 mb-2'>{item.desc}</p>
              
              <div className='flex justify-between items-center mb-3'>
                <span className='text-lg font-bold'>{item.price}{currency}</span>
                <span className='text-sm text-gray-500'>{item.brand}</span>
              </div>

              <div className='flex flex-wrap gap-1 mb-3'>
                {item.popular && (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                    ⭐ Популярный
                  </span>
                )}
                {item.nibmaterial && (
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
                    🏆 Золотое перо
                  </span>
                )}
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {item.size}
                </span>
              </div>

              {item.colors && item.colors.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {item.colors.map((color, i) => (
                    <span
                      key={i}
                      title={color.name}
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{
                        background: color.hex === 'transparent'
                          ? 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 8px 8px'
                          : color.hex,
                      }}
                    />
                  ))}
                </div>
              )}

              <div className='flex gap-2'>
                <button
                  onClick={() => setEditingProduct(item)}
                  className='flex-1 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm'
                >
                  Редактировать
                </button>
                <button
                  onClick={() => removeProduct(item._id)}
                  className='py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm'
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {list.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">Товары не найдены</p>
          <p className="text-sm">Добавьте первый товар</p>
        </div>
      )}

      {/* Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          token={token}
          onClose={() => setEditingProduct(null)}
          onSuccess={fetchList}
        />
      )}
    </>
  )
}

export default List