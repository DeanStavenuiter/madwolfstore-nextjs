'use client';
import { Product } from '@prisma/client';
import Link from 'next/link';
import PriceTag from './PriceTag';
import VideoPlayer from './videoplayer';
import useDevice from './UseDevice';

interface ProductCardProps {
  product: Product;
}

// Product card component
const ProductCard = ({ product }: ProductCardProps) => {
  // Check if product is new
  // const isNew =
  //   Date.now() - new Date(product.createdAt).getTime() <
  //   1000 * 60 * 60 * 24 * 7;

  const device = useDevice();
  console.log('device', device);
  console.log('Product', product);
  return (
    <>
      {device === 'desktop' && (
        <Link href={'/products/' + product.id}>
          <figure className='card-image flex flex-col items-center sm:flex-none sm:justify-normal'>
            <VideoPlayer
              movFile={product.movFile}
              webmFile={product.webMFile}
              width={'w-full'}
              height={'h-full'}
              justifyContent={'start'}
              product={''}
              selectedImage={''}
              selectedAlt={''}
              setSelectedImage={''}
              setSelectedAlt={''}
            />

            <div className='card-body flex items-center gap-0 p-0'>
              <h2 className='card-title'>{product.name}</h2>
              {/* {isNew && <div className='badge badge-secondary'>NEW</div>} */}
              {/* <p>{product.description}</p> */}
              <PriceTag price={product.price} />
            </div>
          </figure>
        </Link>
      )}

      {device === 'mobile' && (
        <figure className='card-image flex flex-col items-center sm:flex-none sm:justify-normal'>
          <VideoPlayer
            movFile={product.movFile}
            webmFile={product.webMFile}
            width={'w-full'}
            height={'h-[75%]'}
            justifyContent={'start'}
            product={''}
            selectedImage={''}
            selectedAlt={''}
            setSelectedImage={''}
            setSelectedAlt={''}
          />

          <Link
            href={'/products/' + product.id}
            className='card flex w-full justify-center bg-base-100 transition-shadow hover:shadow-xl'
          >
            <div className='absolute left-0 right-0 bottom-[120px] '>
              <div className='card-body flex items-center gap-0 p-0'>
                <h2 className='card-title'>{product.name}</h2>
                {/* {isNew && <div className='badge badge-secondary'>NEW</div>} */}
                {/* <p>{product.description}</p> */}
                <PriceTag price={product.price} />
              </div>
            </div>
          </Link>
        </figure>
      )}
    </>
  );
};

export default ProductCard;
