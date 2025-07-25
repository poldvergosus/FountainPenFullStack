import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className='border-t pt-16 px-4 max-w-5xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6 text-primary'>Ваши заказы</h2>

      {
        products.slice(1, 4).map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-primary flex flex-col md:flex-row md:justify-between gap-4'>
            
            {/* Левая часть */}
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image} alt={item.title} />
              <div>
                <p className='sm:text-base font-medium'>{item.title}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-primary'>
                  <p className='text-lg'>{item.price} {currency}</p>
                  <p className='text-sm'>Кол-во:1</p> 
                </div>
                <p className='mt-2'>Дата: <span className='text-primary'>21.03.2024</span></p>
              </div>
            </div>

            {/* Правая часть */}
            <div className='md:w-1/2 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-primary'></span>
                <span className='text-sm md:text-base text-primary'>Готово к отправке</span>
              </div>
              <button className='border px-4 py-2 text-sm font-medium rounded-sm bg-primary hover:bg-accent text-white transition'>
                Отследить заказ
              </button>
            </div>

          </div>
        ))
      }
    </div>
  )
}

export default Orders;