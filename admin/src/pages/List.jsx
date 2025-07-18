import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      setList(response.data.products);
      if (response.data.products) {
        setList(response.data.products)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
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
      <p className='mb-2'>
        Список всех товаров
      </p>
      <div className='flex flex-col gap-2' >
        <div className='hidden lg:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Изображение</b>
          <b>Название</b>
          <b>Подзаголовок</b>
          <b>Цена</b>
          <b>Популярный</b>
          <b>Категория</b>
          <b>Бренд</b>
          <b>Золотое перо</b>
          <b>Размер пера</b>
          <b>Цвета</b>
          <b>Детали</b>
          <b>Удалить</b>
        </div>

        {/* Список */}

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_1fr_1fr_1fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-24' src={item.image} alt="" />
              <p>{item.title}</p>
              <p>{item.desc}</p>
              <p>{item.price}{currency}</p>
              <p>{item.popular ? "Да" : "Нет"}</p>
              <p>{item.category}</p>
              <p>{item.brand}</p>
              <p>{item.nibmaterial ? "Да" : "Нет"}</p>
              <p>{item.size}</p>
              {/* Цвета */}
              <div className="flex gap-1">
                {item.colors && item.colors.length > 0
                  ? item.colors.map((color, i) => (
                    <span
                      key={i}
                      title={color.name}
                      style={{
                        display: 'inline-block',
                        background: color.hex === 'transparent'
                          ? 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 10px 10px'
                          : color.hex,
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        border: '1px solid #999',
                        marginRight: 2,
                        verticalAlign: 'middle'
                      }}
                    />
                  ))
                  : <span>—</span>
                }
              </div>
              <p
                className={`max-w-[180px] cursor-pointer ${expandedIndex === index ? 'whitespace-normal' : 'truncate whitespace-nowrap'}`}
                title={item.details}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                {item.details}
              </p>
              <p
                className='text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700'
                onClick={() => removeProduct(item._id)}
                title="Удалить"
              >×</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List
