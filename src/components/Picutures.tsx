import Image from 'next/image';
import React from 'react';

const Picutures = ({ product, setSelectedImage, setSelectedAlt }: any) => {
  const handleOnClick = (e: any) => {
    setSelectedImage(e.target.src);
    setSelectedAlt(e.target.alt);
  };

  return (
    <div className='flex flex-wrap justify-center gap-0.5'>
      {product.imageUrl1 ? (
        <Image
          src={product.imageUrl1}
          alt={'Front print t-shirt'}
          width={150}
          height={150}
          onClick={handleOnClick}
          className='hover:cursor-pointer'
        ></Image>
      ) : (
        ''
      )}

      {product.imageUrl2 ? (
        <Image
          src={product.imageUrl2}
          alt={'Back print t-shirt'}
          width={150}
          height={150}
          onClick={handleOnClick}
          className='hover:cursor-pointer'
        ></Image>
      ) : (
        ''
      )}
      {product.imageUrl3 ? (
        <Image
          src={product.imageUrl3 ? product.imageUrl3 : ''}
          alt={'Front print close-up t-shirt'}
          width={150}
          height={150}
          onClick={handleOnClick}
          className='hover:cursor-pointer'
        ></Image>
      ) : (
        ''
      )}
      {product.imageUrl4 ? (
        <Image
          src={product.imageUrl4 ? product.imageUrl4 : ''}
          alt={'Front print close-up t-shirt'}
          width={150}
          height={150}
          onClick={handleOnClick}
          className='hover:cursor-pointer'
        ></Image>
      ) : (
        ''
      )}
    </div>
  );
};

export default Picutures;
