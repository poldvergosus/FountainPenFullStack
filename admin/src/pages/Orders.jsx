import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets.js'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
  <>
    <p className="mb-2">Список всех заказов</p>

    <div className="flex flex-col gap-2">
      <div className="hidden lg:grid grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
        <b>Заказ</b>
        <b>Товары и адрес</b>
        <b>Детали</b>
        <b>Сумма</b>
        <b>Статус</b>
      </div>

      {orders.map((order, index) => (
        <div
          className="grid grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] items-start gap-2 py-2 px-2 border text-sm"
          key={index}
        >
          <div className="flex items-center gap-2">
            <img className="w-8" src={assets.parcel_icon} alt="" />
          </div>

          <div>
            <div>
              {order.items.map((item, i) => (
                <span key={i}>
                  {item.title} × {item.quantity}
                  {i < order.items.length - 1 && ", "}
                </span>
              ))}
            </div>
            <p>{order.address.name}, {order.address.phone}</p>
            <p>{order.address.city}, {order.address.street}</p>
          </div>

          <div>
            <p>Товаров: {order.items.length}</p>
            <p>Оплата: {order.paymentMethod}</p>
            <p>Дата: {order.date}</p>
          </div>

          <p>{order.amount}{currency}</p>

          <select
            className="border p-1 text-sm"
            defaultValue={order.status}
          >
            <option value="OrderPlaced">Заказ сформирован</option>
            <option value="PackingOrder">Собираем заказ</option>
            <option value="ShippedOrder">Заказ в пути</option>
            <option value="Delivered">Заказ доставлен</option>
          </select>
        </div>
      ))}
    </div>
  </>
)
}

export default Orders
