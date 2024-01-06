'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface SelectSizeButtonProps {
  size: any;
  css: string;
  onSelectSize: (size: any) => void;
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

  const [sizes, setSizes] = useState({
    Xsmall: '',
    Small: '',
    Medium: '',
    Large: '',
    XLarge: '',
    XXLarge: '',
  });

  //   console.log('sizes quantity', size.size + " " + size.quantity);

  useEffect(() => {
    setSizes((prevData) => ({
      ...prevData,
      Xsmall: size.size === 'XS' ? size.quantity : '',
      Small: size.size === 'S' ? size.quantity : '',
      Medium: size.size === 'M' ? size.quantity : '',
      Large: size.size === 'L' ? size.quantity : '',
      XLarge: size.size === 'XL' ? size.quantity : '',
      XXLarge: size.size === 'XXL' ? size.quantity : '',
    }));

    setIsLoading(false);
  }, [size.quantity, size.size]);

  if (!isLoading) {
    // console.log('selectedSize', selectedSize);
    // console.log('this size is', size.size);
  }

  const handleSizeSelection = async (size: any) => {
    setSelectedSize((prevSize) => (prevSize === size ? '' : size));
    onSelectSize(size);
    console.log('selected size in selectSizeButton', size);
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
            className={`${size.quantity === 0 ? 'btn-disabled' : ''}  
            ${css}
            w-100 
            btn-outline-dark
            bg-light text-dark btn
          
            rounded border py-3`}
            onClick={() => handleSizeSelection(size.size)}
          >
            {sizeLabel}
          </div>
        </>
      )}
    </>
  );
};

export default SelectSizeButton;
