import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    street: '',
    phone: '',
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      console.log('Заказ уже отправляется');
      return;
    }

    setIsSubmitting(true);

    console.log('=== НАЧАЛО ОТПРАВКИ ЗАКАЗА ===');
    console.log('Token:', token);
    console.log('Backend URL:', backendUrl);
    console.log('Form data:', formData);
    console.log('Cart items:', cartItems);

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

      console.log('Order items:', orderItems);

      if (orderItems.length === 0) {
        toast.error('Корзина пуста');
        console.log('Корзина пуста');
        setIsSubmitting(false);
        return;
      }

      const totalAmount = getCartAmount() + delivery_fee;
      console.log('Total amount:', totalAmount);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount
      }

      console.log('Order data to send:', orderData);

      switch (method) {
        case 'cod':
          const headers = {};
          if (token) {
            headers.token = token;
          }

          console.log('Request headers:', headers);
          console.log('Request URL:', backendUrl + '/api/order/place');

          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers }
          );

          console.log('Server response:', response.data);

          if (response.data.success) {
            toast.success('Заказ успешно оформлен!');

            setCartItems({});

            if (!token) {
              localStorage.removeItem('cartItems');
            }

            if (response.data.isGuest) {
              toast.info('Заказ №' + response.data.orderId.slice(-6) + '. Мы свяжемся с вами по указанным контактам.');
              console.log('Гостевой заказ успешно создан');


              setTimeout(() => {
                navigate('/order-success', {
                  state: { orderId: response.data.orderId }
                });
              }, 1000);
            } else {
              console.log('Заказ авторизованного пользователя создан');

              setTimeout(() => {
                navigate('/orders');
              }, 1000);
            }
          } else {
            console.log('Ошибка от сервера:', response.data.message);
            toast.error(response.data.message || 'Ошибка при оформлении заказа');
            setIsSubmitting(false);
          }
          break;

        default:
          setIsSubmitting(false);
          break;
      }

    } catch (error) {
      console.error('ОШИБКА:', error);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        toast.error(error.response.data.message || 'Ошибка сервера');
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('Нет связи с сервером');
      } else {
        console.error('Error message:', error.message);
        toast.error('Ошибка при оформлении заказа');
      }

      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='mx-auto max-w-3xl flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3 text-primary'>
          Оформление заказа
        </div>

        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='name'
            value={formData.name}
            className='border border-primary rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='ФИО'
            disabled={isSubmitting}
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='border border-primary rounded py-1.5 px-3.5 w-full'
          type="email"
          placeholder='Email'
          disabled={isSubmitting}
        />

        <input
          required
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='border border-primary rounded py-1.5 px-3.5 w-full'
          type="tel"
          placeholder='Телефон'
          disabled={isSubmitting}
        />

        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            className='border border-primary rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='Город'
            disabled={isSubmitting}
          />
          <input
            required
            onChange={onChangeHandler}
            name='street'
            value={formData.street}
            className='border border-primary rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='Адрес'
            disabled={isSubmitting}
          />
        </div>

        <div className='flex gap-3'>
          <input
            onChange={onChangeHandler}
            name='comment'
            value={formData.comment}
            className='border border-primary rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='Комментарий'
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <div className='text-xl sm:text-2xl my-3 text-primary'>
            Способ оплаты
          </div>

          <div className='flex gap-3 flex-col lg:flex-row'>
            <div
              onClick={() => !isSubmitting && setMethod('cod')}
              className={`flex items-center gap-3 border p-2 px-3 ${!isSubmitting ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-primary' : ''}`}></p>
              <img className='h-5' src={assets.cash} alt="" />
              <span className="text-primary">Оплата при получении</span>
            </div>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`bg-primary text-white px-16 py-3 text-sm transition ${isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-opacity-90'
              }`}
          >
            {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder