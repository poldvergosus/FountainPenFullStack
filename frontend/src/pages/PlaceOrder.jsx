import React, { useContext, useEffect, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);

  return (
    <div className='mx-auto max-w-3xl flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480-px]'>

        <div className='text-xl sm:text-2xl my-3'>
          sdfsdf asdasd
        </div>

        <div className='flex gap-3'>
          <input className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='Имя' />
          <input className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='Фамилия' />
        </div>
        <input className='border border-primary rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email' />
        <input className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='Город' />
          <input className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='район' />
        </div>

        <div className='flex gap-3'>
          <input className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='Город' />
          <input className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='район' />
        </div>
        <input className='border border-primary rounded py-1.5 px-3.5 w-full' type="number" placeholder='Телефон' />
      </div>

      <div className=' mt-8 '>
        <div className=' mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <div className='text-xl sm:text-2xl my-3'>
            sdfsdf asdasd
          </div>
          {/* PAYMENT SELECTION */}
          <div className='flex gap-3 flex-col lg:flex-row'></div>
          <div onClick={() => setMethod('fuck.pay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'fuck.pay' ? 'bg-primary' : ''}`}>   </p>
            <img className='h-5 mx-4' src={assets.social.vkIcon} alt="" />
          </div>
          <div onClick={() => setMethod('vk.pay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'vk.pay' ? 'bg-primary' : ''}`}></p>
            <img className='h-5 mx-4' src={assets.social.vkIcon} alt="" />
          </div>
          <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-primary' : ''}`}></p>
            <img className='h-5 mx-4' src={assets.social.vkIcon} alt="" />
          </div>
        </div>
        <div className='w-full text-end mt-8'>
          <button onClick={()=>navigate('/orders')} className='bg-primary text-white px-16 py-3 text-sm'> Place order</button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder