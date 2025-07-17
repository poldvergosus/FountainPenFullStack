import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'

const List = () => {

  const [list, setList] = useState([])

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

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2'>
        Список всех товаров
      </p>
      <div className='flex flex-col gap-2' >
        <div className='hidden lg:grid grid-cols-[1fr_2fr_1fr_2fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
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
        </div>

        {/* Список */}

        {
          list.map((item, index) => (
            <div key={index}>
              <img className='w-24' src={item.image} alt="" />
              <p>{item.title}</p>

              <p>{item.desc}</p>

              <p>{item.price}{currency}</p>

              <p>{item.popular ? "Да" : "Нет"}</p>

              <p>{item.category}</p>

              <p>{item.brand}</p>

              <p>{item.nibmaterial ? "Да" : "Нет"}</p>

              <p>{item.size}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List
