'use client';

import { useState, useTransition } from 'react';
import { incrementProductQuantity } from './actions';

interface AddToCartButtonProps {
  productId: string;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  incrementProductQuantity: (
    productId: string,
    selectedSize: string
  ) => Promise<void>;
}

// Add to cart button component
const AddToCartButton = ({
  productId,
  selectedSize,
  setSelectedSize,
}: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  // console.log('selected size in add to cart button', selectedSize);
  return (
    <div
      className={`flex flex-col  items-start gap-2 ${
        !selectedSize ? 'cursor-not-allowed' : ''
      }`}
    >
      <button
        className={`btn w-full border-none bg-sky-500 text-coolGray-100 hover:bg-sky-700 disabled:text-coolGray-300 sm:w-[160px]
        `}
        disabled={!selectedSize || isPending}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId, selectedSize);
            setSelectedSize('');
            setSuccess(true);
          });
        }}
      >
        {!selectedSize && !isPending ? 'Select Size' : 'Add to cart'}
        {selectedSize && !isPending ? (
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
        ) : (
          ''
        )}
        {isPending && selectedSize ? (
          <span className='loading loading-spinner loading-md bg-sky-600' />
        ) : (
          ''
        )}
      </button>
      {!isPending && success && (
        <span className='ml-1 text-success'>Added to Cart!</span>
      )}
    </div>
  );
};

export default AddToCartButton;
