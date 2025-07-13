import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        tempData.push({
          id: items,
          quantity: cartItems[items]
        })
      }
    }
    setCartData(tempData);
  }, [cartItems])

  return (
    <div className='mx-auto max-w-5xl border-t pt-14 p-4'>
      <div className='text-2x1 mb-3'>
        <title text1={'your'} text2={'cart'} />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product.id.toString() === item.id.toString()
            );
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_05fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.title}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{productData.price}{currency}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 1) {
                    updateQuantity(item.id, value);
                  }
                }} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                <div className="flex justify-end">
                  <svg onClick={() => updateQuantity(item.id, 0)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 cursor-pointer text-primary hover:text-accent transition"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
        </div>
      </div>
    </div>
  )
}

export default Cart