import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { InputMask } from '@react-input/mask';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = () => phone.replace(/\D/g, '').length === 11;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    try {
      if (currentState === 'Sign Up') {
        if (password !== confirmPassword) {
          toast.error('Пароли не совпадают');
          return;
        }
        if (password.length < 8) {
          toast.error('Пароль должен быть минимум 8 символов');
          return;
        }
        if (phone && !isPhoneValid()) {
          toast.error('Введите корректный номер телефона');
          return;
        }
        if (!agreeToPolicy) {
          toast.error('Необходимо согласие на обработку данных');
          return;
        }

        const response = await axios.post(backendUrl + '/api/user/register', { 
          name, 
          email, 
          password,
          phone
        })

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Регистрация успешна!')
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const switchState = (newState) => {
    setCurrentState(newState);
    setPassword('');
    setConfirmPassword('');
    setAgreeToPolicy(false);
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-primary'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-bold'>
          {currentState === 'Login' ? 'Вход' : 'Регистрация'}
        </p>
        <hr className='border-none h-[1.5px] w-8 bg-primary' />
      </div>

      {currentState === 'Sign Up' && (
        <div className='w-full'>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className='w-full px-3 py-2 border border-primary'
            placeholder='ФИО *'
            required
          />
        </div>
      )}

      <div className='w-full'>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className={`w-full px-3 py-2 border ${
            email && !isEmailValid() ? 'border-red-500' : 'border-primary'
          }`}
          placeholder='Email *'
          required
        />
        {email && !isEmailValid() && (
          <p className="text-red-500 text-xs mt-1">Введите корректный email</p>
        )}
      </div>

      {currentState === 'Sign Up' && (
        <div className='w-full'>
          <InputMask
            mask="+7 (___) ___-__-__"
            replacement={{ _: /\d/ }}
            showMask
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder='+7 (___) ___-__-__'
            className={`w-full px-3 py-2 border ${
              phone && phone.length > 3 && !isPhoneValid() ? 'border-red-500' : 'border-primary'
            }`}
          />
          {phone && phone.length > 3 && !isPhoneValid() && (
            <p className="text-red-500 text-xs mt-1">Введите полный номер телефона</p>
          )}
        </div>
      )}

      <div className='w-full'>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className='w-full px-3 py-2 border border-primary'
          placeholder='Пароль *'
          required
        />
        {currentState === 'Sign Up' && password && password.length < 8 && (
          <p className="text-red-500 text-xs mt-1">Минимум 8 символов</p>
        )}
      </div>

      {currentState === 'Sign Up' && (
        <>
          <div className='w-full'>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              className={`w-full px-3 py-2 border ${
                confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-primary'
              }`}
              placeholder='Повторите пароль *'
              required
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-xs mt-1">Пароли не совпадают</p>
            )}
          </div>

          <label className="w-full flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="mt-1 w-4 h-4 accent-primary"
            />
            <span className="text-xs text-gray-600">
              <span className="font-semibold text-primary">Получать уведомления о заказе</span>
              <br />
              С помощью уведомлений можно получать актуальную информацию по заказу
            </span>
          </label>

          <label className="w-full flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeToPolicy}
              onChange={(e) => setAgreeToPolicy(e.target.checked)}
              className="mt-1 w-4 h-4 accent-primary"
              required
            />
            <span className="text-xs text-gray-600">
              Я согласен на обработку моих персональных данных *
            </span>
          </label>
        </>
      )}

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {currentState === 'Login' && (
          <p className='cursor-pointer hover:text-accent'>Забыли пароль?</p>
        )}
        {currentState === 'Login' ? (
          <p onClick={() => switchState('Sign Up')} className='cursor-pointer hover:text-accent ml-auto'>
            Создать аккаунт
          </p>
        ) : (
          <p onClick={() => switchState('Login')} className='cursor-pointer hover:text-accent ml-auto'>
            Уже есть аккаунт? Войти
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={currentState === 'Sign Up' && !agreeToPolicy}
        className={`w-full py-2 px-8 mt-4 transition ${
          currentState === 'Sign Up' && !agreeToPolicy
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-accent'
        }`}
      >
        {currentState === 'Login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}

export default Login