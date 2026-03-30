import React, { useContext, useState, useMemo, useEffect } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { InputMask } from '@react-input/mask';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { 
    navigate, backendUrl, token, cartItems, setCartItems, 
    getCartAmount, delivery_fee, products, currency
  } = useContext(ShopContext);
  
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
  const [stockErrors, setStockErrors] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const hasItems = Object.values(cartItems).some(qty => qty > 0);
    if (!hasItems) {
      navigate('/cart');
    }
  }, []);

  const cartProblems = useMemo(() => {
    const problems = [];
    for (const productId in cartItems) {
      const quantity = cartItems[productId];
      if (quantity > 0) {
        const product = products.find(p => p._id === productId);
        if (product) {
          const stock = product.stock ?? 0;
          if (stock === 0) {
            problems.push({ productId, title: product.title, issue: 'Нет в наличии', available: 0 });
          } else if (quantity > stock) {
            problems.push({ productId, title: product.title, issue: `Доступно ${stock} шт.`, available: stock });
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

  const fixCartQuantity = (productId, newQuantity) => {
    const newCart = { ...cartItems };
    if (newQuantity <= 0) {
      delete newCart[productId];
    } else {
      newCart[productId] = newQuantity;
    }
    setCartItems(newCart);
    setStockErrors([]);
    toast.success('Количество обновлено');
  }

  const removeFromCart = (productId) => {
    const newCart = { ...cartItems };
    delete newCart[productId];
    setCartItems(newCart);
    setStockErrors([]);
    toast.info('Товар удален из корзины');
    
    if (Object.keys(newCart).length === 0) {
      navigate('/cart');
    }
  }

  const refreshProductData = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        // Обновляем локальные данные о наличии
        const updatedProducts = response.data.products;
        
        // Проверяем корзину на актуальность
        const newCart = { ...cartItems };
        let hasChanges = false;
        const newErrors = [];

        for (const productId in newCart) {
          const quantity = newCart[productId];
          const product = updatedProducts.find(p => p._id === productId);
          
          if (!product) {
            delete newCart[productId];
            hasChanges = true;
            newErrors.push(`Товар больше не доступен`);
          } else if (product.stock === 0) {
            newErrors.push(`"${product.title}" — закончился, удалите из корзины`);
          } else if (quantity > product.stock) {
            newErrors.push(`"${product.title}" — доступно только ${product.stock} шт.`);
          }
        }

        if (hasChanges) {
          setCartItems(newCart);
        }

        if (newErrors.length > 0) {
          setStockErrors(newErrors);
          toast.warning('Наличие товаров изменилось');
        } else {
          setStockErrors([]);
          toast.success('Данные обновлены, можете оформить заказ');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Не удалось обновить данные');
    } finally {
      setIsRefreshing(false);
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    // Валидация
    if (!isPhoneValid()) {
      toast.error('Введите корректный номер телефона');
      return;
    }

    if (!isEmailValid()) {
      toast.error('Введите корректный email');
      return;
    }

    if (orderSummary.totalQuantity === 0) {
      toast.error('Корзина пуста');
      navigate('/cart');
      return;
    }

    setIsSubmitting(true);
    setStockErrors([]);

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
        navigate('/cart');
        return;
      }

      const totalAmount = getCartAmount() + delivery_fee;

      let orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount
      }

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
          }, 500);
        } else {
          setTimeout(() => {
            navigate('/orders');
          }, 500);
        }
      } else {
        if (response.data.stockErrors && response.data.stockErrors.length > 0) {
          setStockErrors(response.data.stockErrors);
        } else {
          toast.error(response.data.message || 'Ошибка при оформлении заказа');
        }
        setIsSubmitting(false);
      }

    } catch (error) {
      console.error('ОШИБКА:', error);

      if (error.response?.data?.stockErrors) {
        setStockErrors(error.response.data.stockErrors);
      } else if (error.response) {
        toast.error(error.response.data.message || 'Ошибка сервера');
      } else {
        toast.error('Ошибка при оформлении заказа');
      }

      setIsSubmitting(false);
    }
  }

  const canSubmit = 
    !isSubmitting && 
    !isRefreshing &&
    stockErrors.length === 0 && 
    cartProblems.length === 0 && 
    agreeToPolicy && 
    orderSummary.totalQuantity > 0;

  return (
    <form onSubmit={onSubmitHandler} className='mx-auto max-w-4xl flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4'>
      
      {/* Левая часть — форма */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <h1 className='text-xl sm:text-2xl my-3 text-primary font-bold'>
          Оформление заказа
        </h1>

        {stockErrors.length > 0 && (
          <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <p className="text-red-700 font-bold text-sm mb-3">
              Проблемы с наличием товаров:
            </p>
            {stockErrors.map((error, i) => (
              <p key={i} className="text-red-600 text-sm mb-1">• {error}</p>
            ))}
            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
              >
                Изменить корзину
              </button>
              <button
                type="button"
                onClick={refreshProductData}
                disabled={isRefreshing}
                className="px-4 py-2 border border-red-600 text-red-600 text-sm rounded hover:bg-red-50 transition disabled:opacity-50"
              >
                {isRefreshing ? 'Обновление...' : 'Проверить наличие'}
              </button>
            </div>
          </div>
        )}

        {cartProblems.length > 0 && stockErrors.length === 0 && (
          <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <p className="text-yellow-700 font-semibold text-sm mb-2">
               Исправьте количество товаров:
            </p>
            {cartProblems.map((problem, i) => (
              <div key={i} className="flex justify-between items-center text-sm mb-2 py-1 border-b border-yellow-200 last:border-0">
                <span className="text-yellow-700">"{problem.title}" — {problem.issue}</span>
                <div className="flex gap-1">
                  {problem.available > 0 && (
                    <button
                      type="button"
                      onClick={() => fixCartQuantity(problem.productId, problem.available)}
                      className="text-xs px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Взять {problem.available}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFromCart(problem.productId)}
                    className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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

        <textarea
          onChange={onChangeHandler}
          name='comment'
          value={formData.comment}
          className='border border-primary rounded py-2 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none'
          rows="3"
          placeholder='Комментарий к заказу'
          disabled={isSubmitting}
        />

        <p className="text-xs text-gray-500">* — обязательные поля</p>
      </div>

      <div className='mt-8 w-full sm:max-w-[380px]'>
      
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm font-medium text-primary mb-2">
            Ваш заказ ({orderSummary.totalQuantity} шт.)
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {Object.entries(cartItems).map(([productId, quantity]) => {
              if (quantity <= 0) return null;
              const product = products.find(p => p._id === productId);
              if (!product) return null;
              
              const hasIssue = cartProblems.some(p => p.productId === productId);
              
              return (
                <div 
                  key={productId} 
                  className={`flex justify-between text-sm py-1 ${hasIssue ? 'text-red-500 bg-red-50 px-2 rounded' : ''}`}
                >
                  <span className="truncate mr-2">
                    {product.title} × {quantity}
                    {hasIssue && ' ⚠️'}
                  </span>
                  <span className="font-medium whitespace-nowrap">
                    {(product.price * quantity).toLocaleString('ru-RU')} {currency}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <CartTotal />

        <div className='mt-8'>
          <p className='text-xl font-bold text-primary mb-3'>Способ оплаты</p>
          <div
            onClick={() => !isSubmitting && setMethod('cod')}
            className={`flex items-center gap-3 border-2 p-3 rounded cursor-pointer transition ${
              method === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}
          >
            <div className={`w-4 h-4 border-2 rounded-full ${method === 'cod' ? 'bg-primary border-primary' : 'border-gray-400'}`} />
            <img className='h-5' src={assets.cash} alt="" />
            <span className="text-primary text-sm">Оплата при получении</span>
          </div>
        </div>

        <label className="flex items-start gap-3 mt-6 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeToPolicy}
            onChange={(e) => setAgreeToPolicy(e.target.checked)}
            className="mt-1 w-4 h-4 accent-primary"
            disabled={isSubmitting}
          />
          <span className="text-xs text-gray-600">
            Я согласен с условиями обработки персональных данных
          </span>
        </label>

        <button
          type='submit'
          disabled={!canSubmit}
          className={`w-full mt-6 py-3 text-sm rounded transition ${
            !canSubmit
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-accent'
          }`}
        >
          {isSubmitting ? 'Оформление...' : isRefreshing ? 'Обновление...' : 'Оформить заказ'}
        </button>

        {!canSubmit && !isSubmitting && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            {orderSummary.totalQuantity === 0 && 'Корзина пуста'}
            {orderSummary.totalQuantity > 0 && !agreeToPolicy && 'Примите условия'}
            {orderSummary.totalQuantity > 0 && agreeToPolicy && (stockErrors.length > 0 || cartProblems.length > 0) && 'Исправьте проблемы с наличием'}
          </p>
        )}
      </div>
    </form>
  )
}

export default PlaceOrder