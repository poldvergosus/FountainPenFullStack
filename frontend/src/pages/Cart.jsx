import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal';
import { formatPrice } from '../utils/format';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate, getAvailableStock, cartLoading } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          tempData.push({
            _id: items,
            quantity: cartItems[items]
          })
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  const handleQuantityChange = (itemId, newQuantity) => {
    const stock = getAvailableStock(itemId);
    
    if (newQuantity > stock) {
      newQuantity = stock;
    }
    
    if (newQuantity < 0) {
      newQuantity = 0;
    }

    updateQuantity(itemId, newQuantity);
  }

  if (cartLoading) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-primary text-sm">Загрузка корзины...</p>
    </div>
  );
}

  if (cartData.length === 0) {
    return (
      <div className="mx-auto max-w-5xl p-10 text-center">
        <h2 className="text-2xl font-bold text-primary">Ваша корзина пуста</h2>
        <p className="mt-4 text-primary">Добавьте товары в корзину, чтобы оформить заказ.</p>
        <button 
          onClick={() => navigate('/collection')}
          className='mt-6 px-6 py-3 bg-primary text-white hover:bg-accent transition'
        >
          Перейти к покупкам
        </button>
      </div>
    );
  }

  
  return (
    <div className='mx-auto max-w-5xl border-t pt-14 p-4'>
      <div className='text-2xl mb-3'>
        <h1 className='font-bold text-primary'>Корзина</h1>
      </div>
      
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id.toString() === item._id.toString()
          );

          if (!productData) return null;

          const stock = productData.stock ?? 0;
          const isOverStock = item.quantity > stock;
          const isOutOfStock = stock === 0;

          return (
            <div 
              key={index} 
              className={`py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 ${
                isOutOfStock ? 'bg-red-50' : isOverStock ? 'bg-yellow-50' : ''
              }`}
            >
              <div className='flex items-start gap-6'>
                <div className="relative">
                  <img 
                    className={`w-16 sm:w-20 ${isOutOfStock ? 'opacity-50' : ''}`} 
                    src={productData.image} 
                    alt={productData.title} 
                  />
        
                  {isOutOfStock && (
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-[8px] px-1 py-0.5 font-bold">
                      Нет
                    </div>
                  )}
                </div>
                
                <div>
                  <p className='text-xs sm:text-lg font-medium text-primary'>
                    {productData.title}
                  </p>
                  <p className='text-xs text-gray-500'>{productData.desc}</p>
                  
                  <div className='flex items-center gap-5 mt-2'>
                    <p className='font-semibold text-primary'>
                      {formatPrice(productData.price)}{currency}
                    </p>
                  </div>

  
                  {isOutOfStock ? (
                    <p className='text-red-500 text-xs mt-1 font-semibold'>
                      Товар закончился — удалите из корзины
                    </p>
                  ) : isOverStock ? (
                    <p className='text-yellow-600 text-xs mt-1 font-semibold'>
                       Доступно только {stock} шт.
                    </p>
                  ) : stock <= 5 ? (
                    <p className='text-yellow-600 text-xs mt-1'>
                      Осталось {stock} шт.
                    </p>
                  ) : (
                    <p className='text-green-600 text-xs mt-1'>
                      В наличии
                    </p>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-1 sm:gap-2'>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  disabled={isOutOfStock}
                  className={`w-6 h-6 sm:w-8 sm:h-8 border border-primary rounded flex items-center justify-center text-sm transition ${
                    isOutOfStock 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-primary hover:text-white'
                  }`}
                >
                  −
                </button>
                
                <input 
                  type="number"
                  min={1}
                  max={stock}
                  value={isOutOfStock ? 0 : item.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      handleQuantityChange(item._id, value);
                    }
                  }}
                  disabled={isOutOfStock}
                  className={`border w-10 sm:w-14 px-1 sm:px-2 py-1 text-center text-sm ${
                    isOverStock 
                      ? 'border-red-500 text-red-500 bg-red-50' 
                      : 'border-primary'
                  } ${isOutOfStock ? 'bg-gray-100 text-gray-400' : ''}`}
                />
                
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  disabled={isOutOfStock || item.quantity >= stock}
                  className={`w-6 h-6 sm:w-8 sm:h-8 border border-primary rounded flex items-center justify-center text-sm transition ${
                    isOutOfStock || item.quantity >= stock 
                      ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                      : 'hover:bg-primary hover:text-white'
                  }`}
                  title={item.quantity >= stock ? `Максимум ${stock} шт.` : ''}
                >
                  +
                </button>
              </div>

         
              <div className="flex justify-end">
                <svg 
                  onClick={() => updateQuantity(item._id, 0)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700 transition"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  title="Удалить из корзины"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          )
        })}
      </div>

  
      {cartData.some(item => {
        const product = products.find(p => p._id === item._id);
        return product && (product.stock === 0 || item.quantity > product.stock);
      }) && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700 text-sm font-medium">
             Некоторые товары недоступны в указанном количестве. 
            Пожалуйста, измените количество или удалите товары.
          </p>
        </div>
      )}

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
    
            <button 
              onClick={() => navigate('/place-order')} 
              disabled={cartData.some(item => {
                const product = products.find(p => p._id === item._id);
                return product && (product.stock === 0 || item.quantity > product.stock);
              })}
              className={`text-sm my-8 px-8 py-3 transition ${
                cartData.some(item => {
                  const product = products.find(p => p._id === item._id);
                  return product && (product.stock === 0 || item.quantity > product.stock);
                })
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-accent'
              }`}
            >
              Заказать
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart