import React, { useContext, useState, useMemo } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { InputMask } from '@react-input/mask';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, getAvailableStock } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    street: '',
    phone: '',
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  const cartProblems = useMemo(() => {
    const problems = [];
    for (const productId in cartItems) {
      const quantity = cartItems[productId];
      if (quantity > 0) {
        const product = products.find(p => p._id === productId);
        if (product) {
          const stock = product.stock ?? 0;
          if (stock === 0) {
            problems.push(`"${product.title}" — нет в наличии`);
          } else if (quantity > stock) {
            problems.push(`"${product.title}" — доступно только ${stock} шт.`);
          }
        }
      }
    }
    return problems;
  }, [cartItems, products]);

  const orderSummary = useMemo(() => {
    let totalItems = 0;
    let totalQuantity = 0;
    for (const productId in cartItems) {
      if (cartItems[productId] > 0) {
        totalItems++;
        totalQuantity += cartItems[productId];
      }
    }
    return { totalItems, totalQuantity };
  }, [cartItems]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const isPhoneValid = () => {
    const digits = formData.phone.replace(/\D/g, '');
    return digits.length === 11;
  }

  const isEmailValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!isPhoneValid()) {
      toast.error('Введите корректный номер телефона');
      return;
    }

    if (!isEmailValid()) {
      toast.error('Введите корректный email');
      return;
    }

    if (cartProblems.length > 0) {
      toast.error('Исправьте проблемы с наличием товаров');
      return;
    }

    if (orderSummary.totalQuantity === 0) {
      toast.error('Корзина пуста');
      return;
    }

    setIsSubmitting(true);

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

      if (orderItems.length === 0) {
        toast.error('Корзина пуста');
        setIsSubmitting(false);
        return;
      }

      const totalAmount = getCartAmount() + delivery_fee;

      let orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount
      }

      switch (method) {
        case 'cod':
          const headers = {};
          if (token) {
            headers.token = token;
          }

          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers }
          );

          if (response.data.success) {
            toast.success('Заказ успешно оформлен!');
            setCartItems({});

            if (!token) {
              localStorage.removeItem('cartItems');
            }

            if (response.data.isGuest) {
              setTimeout(() => {
                navigate('/order-success', {
                  state: { orderId: response.data.orderId }
                });
              }, 1000);
            } else {
              setTimeout(() => {
                navigate('/orders');
              }, 1000);
            }
          } else {
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

      if (error.response) {
        toast.error(error.response.data.message || 'Ошибка сервера');
      } else if (error.request) {
        toast.error('Нет связи с сервером');
      } else {
        toast.error('Ошибка при оформлении заказа');
      }

      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='mx-auto max-w-4xl flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4'>
      
      {/* Левая часть — форма */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <h1 className='text-xl sm:text-2xl my-3 text-primary font-bold'>
          Оформление заказа
        </h1>

        {/* Предупреждение о проблемах с наличием */}
        {cartProblems.length > 0 && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-red-700 font-semibold text-sm mb-2">
              Проблемы с наличием:
            </p>
            {cartProblems.map((problem, i) => (
              <p key={i} className="text-red-600 text-sm">• {problem}</p>
            ))}
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="mt-2 text-red-700 underline text-sm hover:text-red-800"
            >
              Вернуться в корзину
            </button>
          </div>
        )}

        {/* Контактные данные */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">Контактные данные</p>
          <div className="h-[1px] bg-primary/20"></div>
        </div>

        <div className='flex flex-col gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='name'
            value={formData.name}
            className='border border-primary rounded py-2 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition'
            type="text"
            placeholder='ФИО *'
            disabled={isSubmitting}
          />

          <div>
            <input
              required
              onChange={onChangeHandler}
              name='email'
              value={formData.email}
              className={`border rounded py-2 px-3.5 w-full focus:outline-none focus:ring-2 transition ${
                formData.email && !isEmailValid() 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-primary focus:ring-primary/30'
              }`}
              type="email"
              placeholder='Email *'
              disabled={isSubmitting}
            />
            {formData.email && !isEmailValid() && (
              <p className="text-red-500 text-xs mt-1">Введите корректный email</p>
            )}
          </div>

          <div>
            <InputMask
              mask="+7 (___) ___-__-__"
              replacement={{ _: /\d/ }}
              showMask
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              required
              disabled={isSubmitting}
              type="tel"
              placeholder="+7 (___) ___-__-__"
              className={`border rounded py-2 px-3.5 w-full focus:outline-none focus:ring-2 transition ${
                formData.phone && formData.phone.length > 3 && !isPhoneValid()
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-primary focus:ring-primary/30'
              }`}
            />
            {formData.phone && formData.phone.length > 3 && !isPhoneValid() && (
              <p className="text-red-500 text-xs mt-1">Введите полный номер телефона</p>
            )}
          </div>
        </div>

        {/* Адрес доставки */}
        <div className="space-y-1 mt-2">
          <p className="text-sm font-medium text-primary">Адрес доставки</p>
          <div className="h-[1px] bg-primary/20"></div>
        </div>

        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            className='border border-primary rounded py-2 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition'
            type="text"
            placeholder='Город *'
            disabled={isSubmitting}
          />
          <input
            required
            onChange={onChangeHandler}
            name='street'
            value={formData.street}
            className='border border-primary rounded py-2 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition'
            type="text"
            placeholder='Адрес *'
            disabled={isSubmitting}
          />
        </div>

        {/* Комментарий */}
        <div className="space-y-1 mt-2">
          <p className="text-sm font-medium text-primary">Дополнительно</p>
          <div className="h-[1px] bg-primary/20"></div>
        </div>

        <textarea
          onChange={onChangeHandler}
          name='comment'
          value={formData.comment}
          className='border border-primary rounded py-2 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none'
          rows="3"
          placeholder='Комментарий к заказу (необязательно)'
          disabled={isSubmitting}
        />

        <p className="text-xs text-gray-500">* — обязательные поля</p>
      </div>

      {/* Правая часть — итого */}
      <div className='mt-8 w-full sm:max-w-[380px]'>
        <div className='min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-8'>
          <div className='text-xl sm:text-2xl my-3 text-primary font-bold'>
            Способ оплаты
          </div>

          <div className='flex gap-3 flex-col lg:flex-row'>
            <div
              onClick={() => !isSubmitting && setMethod('cod')}
              className={`flex items-center gap-3 border-2 p-3 px-4 rounded transition ${
                !isSubmitting ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
              } ${method === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
            >
              <p className={`min-w-3.5 h-3.5 border-2 rounded-full transition ${
                method === 'cod' ? 'bg-primary border-primary' : 'border-gray-400'
              }`}></p>
              <img className='h-5' src={assets.cash} alt="" />
              <span className="text-primary text-sm">Оплата при получении</span>
            </div>
          </div>
        </div>

        {/* Согласие с политикой */}
        <label className="flex items-start gap-3 mt-6 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreeToPolicy}
            onChange={(e) => setAgreeToPolicy(e.target.checked)}
            className="mt-1 w-4 h-4 accent-primary cursor-pointer"
            disabled={isSubmitting}
          />
          <span className="text-xs text-gray-600 group-hover:text-gray-800 transition">
            Я согласен с условиями обработки персональных данных
          </span>
        </label>

        <div className='w-full text-end mt-6'>
          <button
            type='submit'
            disabled={isSubmitting || cartProblems.length > 0 || !agreeToPolicy}
            className={`w-full sm:w-inherit bg-primary text-white px-16 py-3 text-sm transition ${
              isSubmitting || cartProblems.length > 0 || !agreeToPolicy
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-accent'
            }`}
          >
            {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
          </button>
          
          {!agreeToPolicy && !isSubmitting && (
            <p className="text-xs text-gray-500 mt-2">
              Для оформления примите условия
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder