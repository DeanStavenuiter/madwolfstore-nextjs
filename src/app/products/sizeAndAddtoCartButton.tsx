'use client';
import React, { use, useEffect, useState } from 'react';
import SelectSizeButton from './selectSizeButton';
import PriceTag from '@/components/PriceTag';
import AddToCartButton from './[id]/AddToCartButton';
import { incrementProductQuantity } from './[id]/actions';

const SizeAndAddtoCartButton = ({ product }: any) => {

  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    console.log('selected size', selectedSize);
  }, [selectedSize]);

  return (
    <div>
      <div className='col mb-2 mt-2 flex flex-wrap gap-1'>
        {product.sizes.map((size: any) => (
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
      </div>
      <PriceTag price={product.price} className='mt-4' />
      <p className='py-6'>{product.description}</p>

      <AddToCartButton
        productId={product.id}
        incrementProductQuantity={incrementProductQuantity}
        selectedSize={selectedSize}
      />
    </div>
  );
};

export default SizeAndAddtoCartButton;
