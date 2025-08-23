import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { currency, delivery_fee = 0, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className='w-full'>
      <div className='text-2xl mb-4'>
        <h2 className="font-bold text-primary">Сумма</h2>
      </div>

      <div className='flex flex-col gap-2 text-sm text-primary'>
        <div className='flex justify-between'>
          <p>Корзина</p>
          <p>{subtotal} {currency}</p>
        </div>

        <div className='flex justify-between'>
          <p>Стоимость доставки</p>
          <p>{delivery_fee}.00{currency} </p>
        </div>

        <hr className="my-2 border-gray-300" />

        <div className='flex justify-between text-base font-semibold'>
          <b>Всего</b>
          <b> {total}{currency}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;