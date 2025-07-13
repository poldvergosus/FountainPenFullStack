import React from 'react'

const PlaceOrder = () => {
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
    </div>
  )
}

export default PlaceOrder