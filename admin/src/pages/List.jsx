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

  const updateStock = async (id, newStock) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/update-stock',
        { id, stock: Number(newStock) },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Количество обновлено')
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

  const totalStock = list.reduce((sum, item) => sum + (item.stock || 0), 0);
  const outOfStock = list.filter(item => (item.stock || 0) === 0).length;
  const lowStock = list.filter(item => (item.stock || 0) > 0 && (item.stock || 0) <= (item.lowStockAlert || 5)).length;

  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className='text-2xl font-bold text-gray-800'>Список товаров</h1>
        <div className="flex gap-4 text-sm">
          <span className="text-gray-600">Всего: {list.length}</span>
          <span className="text-green-600">На складе: {totalStock} шт.</span>
          {lowStock > 0 && (
            <span className="text-yellow-600">⚠️ Заканчиваются: {lowStock}</span>
          )}
          {outOfStock > 0 && (
            <span className="text-red-600">❌ Нет в наличии: {outOfStock}</span>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className='hidden lg:block overflow-x-auto'>
        <div className="min-w-[1200px]">
          <div className='grid grid-cols-[80px_2fr_1fr_1fr_1fr_1fr_120px_100px] gap-3 items-center py-3 px-4 bg-gray-100 border rounded-t-lg text-sm font-semibold text-gray-700'>
            <div>Фото</div>
            <div>Название</div>
            <div>Цена</div>
            <div>Бренд</div>
            <div>Категория</div>
            <div>Теги</div>
            <div className="text-center">Склад</div>
            <div className="text-center">Действия</div>
          </div>

          {list.map((item, index) => {
            const stock = item.stock || 0;
            const isOutOfStock = stock === 0;
            const isLowStock = stock > 0 && stock <= (item.lowStockAlert || 5);

            return (
              <div 
                className={`grid grid-cols-[80px_2fr_1fr_1fr_1fr_1fr_120px_100px] gap-3 items-center py-3 px-4 border-x border-b text-sm transition
                  ${isOutOfStock ? 'bg-red-50' : isLowStock ? 'bg-yellow-50' : 'hover:bg-gray-50'}
                `}
                key={index}
              >
                <img className='w-16 h-16 object-cover rounded border' src={item.image} alt={item.title} />

                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>

                <p className="font-semibold">{item.price}{currency}</p>
                <p className="text-gray-600">{item.brand}</p>
                <p className="text-gray-600 text-xs">{item.category}</p>

                <div className="flex flex-col gap-1 text-xs">
                  {item.popular && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full w-fit">⭐ Топ</span>
                  )}
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full w-fit">{item.size}</span>
                </div>

        
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateStock(item._id, Math.max(0, stock - 1))}
                      className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center text-xs font-bold"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={stock}
                      min="0"
                      className={`w-14 text-center border rounded py-1 text-sm font-bold
                        ${isOutOfStock ? 'text-red-600 border-red-300 bg-red-50' : 
                          isLowStock ? 'text-yellow-600 border-yellow-300 bg-yellow-50' : 
                          'text-green-600 border-green-300'}
                      `}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val) && val >= 0) {
                          updateStock(item._id, val);
                        }
                      }}
                    />
                    <button
                      onClick={() => updateStock(item._id, stock + 1)}
                      className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                  {isOutOfStock && (
                    <span className="text-red-600 text-[10px] font-semibold">Нет в наличии</span>
                  )}
                  {isLowStock && (
                    <span className="text-yellow-600 text-[10px] font-semibold">Заканчивается</span>
                  )}
                </div>

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
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className='lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {list.map((item, index) => {
          const stock = item.stock || 0;
          const isOutOfStock = stock === 0;
          const isLowStock = stock > 0 && stock <= (item.lowStockAlert || 5);

          return (
            <div key={index} className={`border rounded-lg overflow-hidden ${isOutOfStock ? 'border-red-300' : ''}`}>
              <div className="relative">
                <img className='w-full h-48 object-cover' src={item.image} alt={item.title} />
                {isOutOfStock && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    Нет в наличии
                  </div>
                )}
              </div>
              <div className='p-4'>
                <h3 className='font-semibold text-lg mb-1'>{item.title}</h3>
                <p className='text-sm text-gray-600 mb-2'>{item.desc}</p>
                <div className='flex justify-between items-center mb-3'>
                  <span className='text-lg font-bold'>{item.price}{currency}</span>
                  <span className={`text-sm font-bold ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-yellow-600' : 'text-green-600'}`}>
                    {stock} шт.
                  </span>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => setEditingProduct(item)}
                    className='flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm'
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
          );
        })}
      </div>

      {list.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">Товары не найдены</p>
        </div>
      )}

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