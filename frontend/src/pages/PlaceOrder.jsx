import React, { useContext, useEffect, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import  axios  from 'axios';
import { toast } from 'react-toastify';


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    street: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const productId in cartItems) {
        const quantity = cartItems[productId];
        if (quantity > 0) {
          const product = products.find(p => p._id === productId);
          if (product) {
            const itemInfo = structuredClone(product);
            itemInfo.quantity = quantity;
            orderItems.push(itemInfo);
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }

          break;

        default:
          break;
      }

    } catch (error) {
      console.error(error);
      toast.error('Ошибка при оформлении заказа');
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='mx-auto max-w-3xl flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480-px]'>

        <div className='text-xl sm:text-2xl my-3 text-primary'>
          Оформение заказа
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='name' value={formData.name} className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='ФИО' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-primary rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email' />
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-primary rounded py-1.5 px-3.5 w-full' type="number" placeholder='Телефон' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='Город' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='Адрес' />
        </div>

        <div className='flex gap-3'>
          <input className='border border-primary rounded py-1.5 px-3.5 w-full' type="text" placeholder='Комментарий' />
        </div>

      </div>

      <div className=' mt-8 '>
        <div className=' mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <div className='text-xl sm:text-2xl my-3 text-primary'>
            Способ оплаты
          </div>
          {/* PAYMENT SELECTION */}
          <div className='flex gap-3 flex-col lg:flex-row'></div>
          <div onClick={() => setMethod('Test.pay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'Test.pay' ? 'bg-primary' : ''}`}>   </p>
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
          <button type='submit' className='bg-primary text-white px-16 py-3 text-sm'> Оформить заказ</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder