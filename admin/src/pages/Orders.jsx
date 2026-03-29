import React, { useEffect, useState } from 'react'
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

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status', 
        { orderId, status: event.target.value }, 
        { headers: { token } }
      )
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <>
      <p className="mb-2 text-xl font-semibold">Список всех заказов</p>

      <div className="flex flex-col gap-2">

        <div className="hidden lg:grid grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Заказ</b>
          <b>Товары и адрес</b>
          <b>Детали</b>
          <b>Сумма</b>
          <b>Статус</b>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Заказов пока нет
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              className="grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] items-start gap-2 py-3 px-3 border text-sm hover:bg-gray-50 transition"
              key={index}
            >
        
              <div className="flex items-center gap-2">
                <img className="w-8" src={assets.parcel_icon} alt="" />
                <span className="text-xs text-gray-500 lg:hidden">
                  #{order._id.slice(-6)}
                </span>
              </div>

              <div>
                <div className="font-medium mb-1">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.title} × {item.quantity}
                      {i < order.items.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">
                  {order.address.name}, {order.address.phone}
                </p>
                <p className="text-gray-600">
                  {order.address.email}
                </p>
                <p className="text-gray-600">
                  {order.address.city}, {order.address.street}
                </p>
                
  
                {order.comment && (
                  <p className="text-gray-700 mt-2 p-2 bg-yellow-50 border-l-2 border-yellow-400 text-sm">
                    <strong>Комментарий:</strong> {order.comment}
                  </p>
                )}
                
       
                {order.address.comment && !order.comment && (
                  <p className="text-gray-700 mt-2 p-2 bg-yellow-50 border-l-2 border-yellow-400 text-sm">
                    <strong>Комментарий:</strong> {order.address.comment}
                  </p>
                )}
              </div>

      
              <div>
                <p>Товаров: {order.items.length}</p>
                <p>Оплата: {order.paymentMethod}</p>
                <p>Дата: {formatDate(order.date)}</p>
                {!order.userId && (
                  <p className="text-orange-600 text-xs mt-1">
                    🔓 Гостевой заказ
                  </p>
                )}
              </div>

          
              <p className="font-semibold">{order.amount}{currency}</p>

      
              <select
                onChange={(event) => statusHandler(event, order._id)}
                className="border p-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={order.status}
              >
                <option value="Заказ сформирован">Заказ сформирован</option>
                <option value="Собираем заказ">Собираем заказ</option>
                <option value="Заказ в пути">Заказ в пути</option>
                <option value="Заказ доставлен">Заказ доставлен</option>
              </select>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Orders