'use client';

import { ShoppingCart } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

// Shopping cart button component
const ShoppingCartButton = ({ cart }: ShoppingCartButtonProps) => {
  // Close dropdown function

  // console.log('cart', cart);
  const CloseDropdown = () => {
    const dropdown = document.activeElement as HTMLElement;

    if (dropdown) {
      dropdown.blur();
    }
  };

  return (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0} role='button' className='btn btn-circle btn-ghost'>
        <div className='indicator '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          <div className='relative bottom-2 right-0 left-3'>
            <span className='badge indicator-item badge-sm bg-[rgb(30,35,42)] text-coolGray-100'>
              {cart?.size || 0}
            </span>
          </div>
        </div>
      </label>
      <div
        tabIndex={0}
        className='card dropdown-content card-compact z-30 mt-3 w-52 bg-[rgb(30,35,42)] shadow'
      >
        <div className='card-body'>
          <span className='text-xl font-bold'>{cart?.size || 0} Items</span>
          <span className='text-info'>
            Subtotal: {formatPrice(cart?.subtotal || 0)}
          </span>
          <div className='card-actions'>
            <Link
              href={'/cart'}
              className='btn btn-block bg-sky-500 hover:bg-sky-700 border-none text-coolGray-100'
              onClick={CloseDropdown}
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartButton;
