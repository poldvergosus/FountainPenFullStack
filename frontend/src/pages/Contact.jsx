import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10'>
        Контакты
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 max-w-6xl mx-auto px-4'>
        <img className='w-full md:max-w-[480px] object-cover rounded' src={assets.aboutus} alt="О нас" />

        <div className='flex flex-col justify-center gap-6 text-primary'>
          <p className='font-semibold text-xl'>Наши магазины</p>
          <p className='font-regular text-l'>Улица Садовая 22</p>
               <p className='font-regular  text-l'>Улица Садовая 23</p>
          <p className='font-semibold text-xl'>
            Тел: 123123  
            <br />
            Email: info@pen.com
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact