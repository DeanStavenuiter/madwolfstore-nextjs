'use client';
import React, { use, useEffect, useState } from 'react';
import SelectSizeButton from './selectSizeButton';
import PriceTag from '@/components/PriceTag';
import AddToCartButton from './[id]/AddToCartButton';
import { incrementProductQuantity } from './[id]/actions';

interface Size {
  id: string;
  size: string;
  quantity: number;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

const SizeAndAddtoCartButton = ({ product }: any) => {
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    console.log('Product', product);
  }, [selectedSize]);

  let allSoldOut: boolean = product.sizes.every(
    (size: Size) => size.quantity === 0
  );

  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const sortedSizes = product.sizes.sort(
    (a: any, b: any) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
  );

  return (
    <div className='flex w-full flex-col'>
      <div className=' col mb-2 mt-2 flex flex-wrap gap-1 '>
        {sortedSizes.map((size: any) => (
          <div key={size.id}>
            <SelectSizeButton
              size={size}
              onSelectSize={(selectedSize) => setSelectedSize(selectedSize)}
              css={
                size.size === selectedSize ? 'bg-neutral text-neutral-100' : ''
              }
            />
          </div>
        ))}
        {allSoldOut && (
          <div className='ml-1 mt-2 text-sm text-red-500'>
            Sorry, this product is sold out
          </div>
        )}
      </div>
      <PriceTag price={product.price} className='ml-1 mt-2' />
      <p className='ml-1 py-4'>{product.description}</p>

      <AddToCartButton
        productId={product.id}
        incrementProductQuantity={incrementProductQuantity}
        selectedSize={selectedSize}
      />
    </div>
  );
};

export default SizeAndAddtoCartButton;
