'use client';

import VideoPlayer from '@/components/videoplayer';
import { CartItemWithProduct } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';
import { useEffect, useTransition } from 'react';

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => void;
}

// Cart entry component
const CartEntry = ({ cartItem, setProductQuantity }: CartEntryProps) => {
  const [isPending, startTransition] = useTransition();
  const quantityOptions: JSX.Element[] = [];
  const maxQuantity =
    cartItem.product.sizes.find((size) => size.size === cartItem.size)
      ?.quantity ?? 10;

  // Generate quantity options
  for (let i = 1; i <= maxQuantity; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div key={cartItem.id + cartItem.quantity}>
      <div className='flex items-center p-5 sm:gap-40'>
        <VideoPlayer
          product={''}
          selectedImage={''}
          selectedAlt={''}
          setSelectedImage={''}
          setSelectedAlt={''}
          mp4File={cartItem.product.mp4File}
          webmFile={cartItem.product.webMFile}
          width={'w-[350px]'}
          height={'h-auto'}
          justifyContent={'start'}
        />
        <div className='w-[50%]'>
          <Link href={`/products/` + cartItem.product.id} className='font-bold'>
            {cartItem.product.name}
          </Link>
          <div>Price: {formatPrice(cartItem.product.price)}</div>
          <div>Size: {cartItem.size}</div>
          <div className='my-1 flex flex-col items-start sm:items-center sm:flex-row gap-2'>
            Quantity:
            <select
              className='select select-bordered border-coolGray-200 sm:max-w-[75px] w-[75%] bg-[rgb(30,35,42)]'
              defaultValue={cartItem.quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);

                startTransition(async () => {
                  await setProductQuantity(cartItem.product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0 (remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className='flex items-center gap-3'>
            Total: {formatPrice(cartItem.product.price * cartItem.quantity)}
            {isPending && (
              <span className='loading loading-spinner loading-sm' />
            )}
          </div>
        </div>
      </div>

      <div className='divider pl-5 pr-5 before:bg-coolGray-100 after:bg-coolGray-100 sm:pl-0 sm:pr-0'></div>
    </div>
  );
};

export default CartEntry;
