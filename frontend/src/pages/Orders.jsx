import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            
            const newItem = {
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            };
            allOrdersItem.push(newItem);
          });
        });

        setorderData(allOrdersItem.reverse());
        console.log("Orders loaded:", allOrdersItem);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16 px-4 max-w-5xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6 text-primary'>Ваши заказы</h2>

      {orderData.length === 0 ? (
        <p>У вас пока нет заказов</p>
      ) : (
        orderData.map((item, index) => {
          return (
            <div
              key={`${item._id}-${index}`}
              className='py-4 border-t border-b text-primary flex flex-col md:flex-row md:justify-between gap-4'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img
                  className='w-16 sm:w-20'
                  src={item.image}
                  alt={item.title}
                />
                <div>
                  <p className='sm:text-base font-medium'>{item.title}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-primary'>
                    <p className='text-lg'>
                      {item.price} {currency}
                    </p>
                    <p className='text-sm'>Кол-во: {item.quantity}</p>
                  </div>
                  <p className='mt-2'>
                    Дата: <span className='text-primary'>
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className='mt-2'>
                    Оплата: <span className='text-primary'>
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-primary'></span>
                  <span className='text-sm md:text-base text-primary'>
                    {item.status}
                  </span>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm bg-primary hover:bg-accent text-white transition'>
                  Отследить заказ
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;