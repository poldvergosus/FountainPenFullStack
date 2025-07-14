import React, { useState } from 'react'



const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }
  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-primary'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-primary' />
      </div>

      {currentState === 'Login' ? '' : (
        <input
          type="text"
          className='w-full px-3 py-2 border border-primary'
          placeholder='Имя'
          required
        />
      )}

      <input
        type="email"
        className='w-full px-3 py-2 border border-primary'
        placeholder='Email'
        required
      />

      <input
        type="password"
        className='w-full px-3 py-2 border border-primary'
        placeholder='Пароль'
        required
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Забыли пароль?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer'>Создать аккаунт</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Войти</p>
        )}
      </div>

      <button
        type="submit"
        className='bg-primary text-white font-light px-8 py-2 mt-4'
      >
        {currentState === 'Login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}

export default Login