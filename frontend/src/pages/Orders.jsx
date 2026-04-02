import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { formatPrice } from '../utils/format';

const Orders = () => {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrderData = async (isRefresh = false) => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  useEffect(() => {
    if (!loading && !token) {
      navigate('/login');
    }
  }, [loading, token]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary text-sm">Загрузка заказов...</p>
      </div>
    );
  }

  const currentOrders = orders.filter(order =>
    order.status !== "Заказ доставлен" && order.status !== "Отменён"
  );

  const completedOrders = orders.filter(order =>
    order.status === "Заказ доставлен" || order.status === "Отменён"
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Заказ доставлен":
        return "bg-green-500";
      case "Отменён":
        return "bg-red-500";
      case "Заказ в пути":
        return "bg-blue-500";
      case "Собираем заказ":
        return "bg-yellow-500";
      default:
        return "bg-primary";
    }
  };

  const OrderCard = ({ order, showRefreshButton = false }) => (
    <div className="mb-6 border overflow-hidden">
      <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h4 className="font-bold text-primary">
              Заказ #{order._id.slice(-6)}
            </h4>
            <p className="text-sm text-gray-600">
              {formatDate(order.date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 ${getStatusStyle(order.status)}`}></span>
            <span className="font-medium text-primary">
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {order.items.map((item, index) => (
          <div
            key={`${order._id}-item-${index}`}
            className={`flex items-start gap-4 sm:gap-6 py-4 ${index > 0 ? 'border-t' : ''}`}
          >
            <img
              className='w-16 sm:w-20'
              src={item.image}
              alt={item.title}
            />
            <div className="flex-1 min-w-0">
              <p className='font-medium text-primary truncate'>{item.title}</p>
              <div className='flex items-center gap-3 mt-2'>
                <p className='font-semibold'>
                  {formatPrice(item.price)} {currency}
                </p>
                <p className='text-sm text-gray-600'>× {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4 pt-4 border-t">
          <div>
            <p className="font-semibold text-primary text-lg">
              Итого: {formatPrice(order.amount)} {currency}
            </p>
            <p className="text-sm text-gray-600">
              Оплата: {order.paymentMethod === 'COD' ? 'При получении' : order.paymentMethod}
            </p>
          </div>
          {showRefreshButton && (
            <button
              onClick={() => loadOrderData(true)}
              disabled={refreshing}
              className='px-4 py-2 text-sm font-medium bg-primary hover:bg-accent text-white transition disabled:opacity-50'
            >
              {refreshing ? 'Обновление...' : 'Обновить статус'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className='border-t pt-10 sm:pt-16 px-4 max-w-5xl mx-auto pb-10'>
      <h2 className='text-2xl font-bold mb-6 text-primary'>Мои заказы</h2>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-primary mb-4">У вас пока нет заказов</p>
          <button
            onClick={() => navigate('/collection')}
            className="px-6 py-3 bg-primary text-white hover:bg-accent transition"
          >
            Перейти к покупкам
          </button>
        </div>
      ) : (
        <>
          {currentOrders.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Текущие заказы ({currentOrders.length})
              </h3>
              {currentOrders.map((order) => (
                <OrderCard key={order._id} order={order} showRefreshButton={true} />
              ))}
            </div>
          )}

          {completedOrders.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                История заказов ({completedOrders.length})
              </h3>
              {completedOrders.map((order) => (
                <OrderCard key={order._id} order={order} showRefreshButton={false} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;