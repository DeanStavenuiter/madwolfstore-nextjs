import { getCart } from '@/lib/db/cart';
import React from 'react';
import CartEntry from '../cart/CartEntry';
import setProductQuantity from '../cart/actions';
import { formatPrice } from '@/lib/format';
import { getUser } from '../User/user';
import UserDetailForm from '../mollie/UserDetailForm';

const CheckOutPage = async () => {
  //get cart
  const cart = await getCart();

  //get session and user information
  const user = await getUser();
  const email = user?.email;
  // console.log('user in checkout page', user);
  // console.log('userWithAddress in checkout page', user);

  // price calculations
  const subTotal = cart?.subtotal || 0;
  const shippingCost = subTotal < 10000 ? 500 : 0;
  const totalPrice = subTotal === 0 ? 0 : shippingCost + subTotal;

  return (
    <div className='flex flex-col gap-4 sm:flex-row'>
      <UserDetailForm totalPrice={totalPrice} email={email} />

      <div className='bg-neutral form-control rounded-md p-4 sm:w-1/3'>
        <h1 className='text-xl font-bold'>Your Cart</h1>
        <div className='divider'></div>
        <div className='flex flex-col gap-4'>
          <div>
            {cart?.items.map((cartItem) => (
              <CartEntry
                cartItem={cartItem}
                key={cartItem.id}
                setProductQuantity={setProductQuantity}
              />
            ))}
          </div>
          {cart?.subtotal === 0 ? (
            <div>
              <p>Your cart is still empty..</p>
            </div>
          ) : (
            <>
              <div className='flex justify-between'>
                <p>Subtotal: </p>
                <p>{formatPrice(cart?.subtotal || 0)}</p>
              </div>

              <div className='divider pl-5 pr-5 before:bg-coolGray-100 after:bg-coolGray-100 sm:pl-0 sm:pr-0'></div>
              <div className='flex justify-between'>
                <p>Shipping: </p>
                <p>{formatPrice(shippingCost)}</p>
              </div>
              <div className='divider pl-5 pr-5 before:bg-coolGray-100 after:bg-coolGray-100 sm:pl-0 sm:pr-0'></div>
              <div className='flex justify-between'>
                <p>Total: </p>
                <p>{formatPrice(shippingCost + subTotal)}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
