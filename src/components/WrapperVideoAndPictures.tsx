'use client';
import React, { useEffect, useState } from 'react';
import VideoPlayer from './videoplayer';
import Picutures from './Picutures';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  movFile: string;
  webMFile: string;
}

const WrapperVideoAndPictures = (product: any) => {
  const [productObject, setProductObject] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedAlt, setSelectedAlt] = useState('');

  useEffect(() => {
    setProductObject(product.product);
  }, [product]);

  useEffect(() => {
    console.log('selectedImage', selectedImage);
    console.log('selectedAlt', selectedAlt);
  }, [selectedImage]);

  return (
    <>
      {!productObject ? (
        <span className='loading loading-dots loading-lg m-auto block' />
      ) : (
        <>
          <VideoPlayer
            movFile={productObject.movFile}
            webmFile={productObject.webMFile}
            product={productObject}
            width={'w-[500px]'}
            height={'h-auto'}
            justifyContent={'center'}
            selectedImage={selectedImage}
            selectedAlt={selectedAlt}
            setSelectedImage={setSelectedImage}
            setSelectedAlt={setSelectedAlt}
          />
          <Picutures
            product={productObject}
            setSelectedImage={setSelectedImage}
            setSelectedAlt={setSelectedAlt}
          />
        </>
      )}
    </>
  );
};

export default WrapperVideoAndPictures;
