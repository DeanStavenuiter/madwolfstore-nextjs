'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useReducer, useState } from 'react';

interface SelectSizeButtonProps {
  size: any;
  css: string;
  onSelectSize: (size: any) => void;
  disabled?: boolean;
}

const SelectSizeButton = ({
  size,
  onSelectSize,
  css,
}: SelectSizeButtonProps) => {
  const pathname = usePathname();
  const id = pathname.split('/')[2];

  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');

  const [sizes, setSizes] = useReducer(
    (prev: any, next: any) => ({
      ...prev,
      ...next,
    }),
    {
      Xsmall: '',
      Small: '',
      Medium: '',
      Large: '',
      XLarge: '',
      XXLarge: '',
    }
  );

  //   console.log('sizes quantity', size.size + " " + size.quantity);

  useEffect(() => {
    setSizes({
      Xsmall: size.size === 'XS' ? size.quantity : '',
      Small: size.size === 'S' ? size.quantity : '',
      Medium: size.size === 'M' ? size.quantity : '',
      Large: size.size === 'L' ? size.quantity : '',
      XLarge: size.size === 'XL' ? size.quantity : '',
      XXLarge: size.size === 'XXL' ? size.quantity : '',
    });

    setIsLoading(false);
  }, [size]);

  // if (!isLoading) {
  //   console.log('selectedSize', selectedSize);
  //   console.log('this size is', size.size);
  // }

  const handleSizeSelection = async (size: any) => {
    setSelectedSize((prevSize) => (prevSize === size ? '' : size));
    onSelectSize(size);
    // console.log('selected size in selectSizeButton', size);
  };

  const sizeMapping: any = {
    S: 'Small',
    M: 'Medium',
    L: 'Large',
    XL: 'XLarge',
    XXL: 'XXLarge',
    XS: 'XSmall',
  };

  const sizeLabel = sizeMapping[size.size] || '';


  return (
    <>
      {!isLoading && (
        <>
          <div
            key={size.size}
            id='sizebtn'
            className={`${
              size.quantity <= 0
                ? 'hover:bg-color-coolGray-700 hover:cursor-not-allowed flex justify-center bg-coolGray-800 bg-opacity-10 text-coolGray-100 text-opacity-30'
                : 'btn'
            }
            btn-outline-dark
            mb-2
            mr-1 
            min-w-[100px]
            max-w-[100px]
            rounded
            border bg-neutral-500 bg-opacity-20 py-3 font-normal normal-case text-coolGray-100 ${css}
            hover:bg-neutral-700
            `}
            onClick={
              size.quantity > 0 ? () => handleSizeSelection(size.size) : () => {}
            }
          >
            {sizeLabel}
          </div>
        </>
      )}
    </>
  );
};

export default SelectSizeButton;
