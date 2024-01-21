'use client';

import VideoPlayer from '@/components/videoplayer';
import { CartItemWithProduct } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import axios from 'axios';
import Image from 'next/image';
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
    <div>
      <div className='flex items-center '>
        <VideoPlayer
          movFile={cartItem.product.movFile}
          webmFile={cartItem.product.webMFile}
          width={'w-[150px]'}
          height={'h-auto'}
          justifyContent={'start'}
        />
        <div className='w-[50%]'>
          <Link href={`/products/` + cartItem.product.id} className='font-bold'>
            {cartItem.product.name}
          </Link>
          <div>Price: {formatPrice(cartItem.product.price)}</div>
          <div>Size: {cartItem.size}</div>
          <div className='my-1 flex items-center gap-2'>
            Quantity:
            <select
              className='select select-bordered max-w-[75px] '
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

      <div className='divider'></div>
    </div>
  );
};

export default CartEntry;
