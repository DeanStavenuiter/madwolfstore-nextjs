'use client';

import VideoPlayer from '@/components/videoplayer';
import { CartItemWithProduct } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';
import { useTransition } from 'react';

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => void;
}

// Cart entry component
const CartEntry = ({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) => {
  const [isPending, startTransition] = useTransition();
  const quantityOptions: JSX.Element[] = [];

  // Generate quantity options
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <div className='flex items-center '>
        {/* <Image
          src={product.imageUrl1}
          alt={product.name}
          width={200}
          height={200}
          className='rounded-lg w-1/3 '
        /> */}

        <VideoPlayer
          src={product.imageUrl1}
          width={'w-[150px]'}
          height={'h-auto'}
          justifyContent={'start'}
        />
        <div className='w-[50%]'>
          <Link href={`/products/` + product.id} className='font-bold'>
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <div>Size: {product.size}</div>
          <div className='my-1 flex items-center gap-2'>
            Quantity:
            <select
              className='select select-bordered w-full max-w-[80px]'
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);

                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0 (remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className='flex items-center gap-3'>
            Total: {formatPrice(product.price * quantity)}
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
