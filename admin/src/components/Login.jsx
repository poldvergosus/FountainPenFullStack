import React, { useContext, useEffect, useState } from 'react'

const Login = () => {

    
    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 ,ax-w-md '>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form>
                    <div className='mb-3 w-full'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>
                            Email
                        </p>
                        <input className='rounded-w-full px-3 py-2 border border-gray-300 outline-none ' type="email" placeholder='Email' required />
                    </div>
                       <div className='mb-3 w-full'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>
                            Введите пароль
                        </p>
                        <input className='rounded-w-full px-3 py-2 border border-gray-300 outline-none ' type="password" placeholder='Пароль' required />
                    </div>

                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login
