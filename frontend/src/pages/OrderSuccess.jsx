import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const OrderSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const orderId = location.state?.orderId

  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center px-4'>
      <div className='text-center max-w-md'>
        <div className='text-6xl mb-4'></div>
        <h1 className='text-3xl font-bold text-primary mb-4'>
          Спасибо за заказ!
        </h1>
        <p className='text-gray-600 mb-2'>
          Ваш заказ успешно оформлен
        </p>
        {orderId && (
          <p className='text-sm text-gray-500 mb-6'>
            Номер заказа: <span className='font-mono font-semibold'>#{orderId.slice(-6)}</span>
          </p>
        )}
        <p className='text-gray-600 mb-8'>
          Мы свяжемся с вами в ближайшее время для подтверждения заказа
        </p>
        <button
          onClick={() => navigate('/')}
          className='bg-primary text-white px-8 py-3 rounded hover:bg-opacity-90 transition'
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  )
}

export default OrderSuccess