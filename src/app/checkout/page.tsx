import { getCart } from '@/lib/db/cart';
import React from 'react';
import CartEntry from '../cart/CartEntry';
import setProductQuantity from '../cart/actions';
import { formatPrice } from '@/lib/format';

const CheckOutPage = async () => {
  const cart = await getCart();

  const subTotal = cart?.subtotal || 0
  const shippingCost = subTotal < 10000 ? 500 : 0;
  console.log(shippingCost)
  return (
    <div className='flex gap-4 flex-col sm:flex-row'>
      <div className='flex sm:w-2/3 flex-col gap-4 '>
        <div className='form-control rounded-md bg-neutral p-4'>
          <h1 className='text-xl font-bold'>Enter your detail!</h1>
          <div className='divider'></div>
          <div className='flex gap-4 flex-col sm:flex-row'>
            <div className='w-full'>
              {/* first name input */}
              <label className='label'>
                <span className='label-text'>First name</span>
              </label>
              <input
                type='text'
                placeholder='Your first name'
                className='input input-bordered w-full '
              />
            </div>
            <div className='w-full'>
              {/* last name input */}
              <label className='label'>
                <span className='label-text'>Last name</span>
              </label>
              <input
                type='text'
                placeholder='Your last name'
                className='input input-bordered w-full '
              />
            </div>
          </div>
          <div>
            {/* email */}
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='text'
              placeholder='Your email'
              className='input input-bordered w-full '
            />
          </div>
        </div>

        <div className='form-control rounded-md bg-neutral p-4'>
          <h1 className='text-xl font-bold'>
            Where would you like your order to be delivered?
          </h1>
          <div className='divider'></div>
          <div className='flex gap-4 flex-col sm:flex-row'>
            {/* address */}
            <div className='sm:w-3/4'>
              <label className='label'>
                <span className='label-text'>Street name and house number</span>
              </label>
              <input
                type='text'
                placeholder='Your address'
                className='input input-bordered w-full '
              />
            </div>

            {/* post code */}
            <div className='sm:w-1/4'>
              <label className='label'>
                <span className='label-text'>Post code</span>
              </label>
              <input
                type='text'
                placeholder='Your post code'
                className='input input-bordered w-full '
              />
            </div>
          </div>

          <div className='flex gap-4 flex-col sm:flex-row'>
            {/* city */}
            <div className='sm:w-1/2'>
              <label className='label'>
                <span className='label-text'>City</span>
              </label>
              <input
                type='text'
                placeholder='Your city'
                className='input input-bordered w-full '
              />
            </div>

            {/* country */}
            <div className='sm:w-1/2'>
              <label className='label'>
                <span className='label-text'>Country</span>
              </label>
              <input
                type='text'
                placeholder='Your country'
                className='input input-bordered w-full '
              />
            </div>
          </div>
        </div>
      </div>
      <div className='form-control sm:w-1/3 rounded-md bg-neutral p-4'>
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
          <div className='flex justify-between'>
            <p>Subtotal: </p>
            <p>{formatPrice(cart?.subtotal || 0)}</p>
          </div>

          <div className='divider'></div>
          <div className='flex justify-between'>
            <p>Shipping: </p>
            <p>
              {formatPrice(shippingCost)}
            </p>
          </div>
          <div className='divider'></div>
          <div className='flex justify-between'>
            <p>Total: </p>
            <p>
              {formatPrice(shippingCost + subTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
