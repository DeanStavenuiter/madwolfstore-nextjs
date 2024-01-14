import { Product } from '@prisma/client';
import Link from 'next/link';
import PriceTag from './PriceTag';
import VideoPlayer from './videoplayer';

interface ProductCardProps {
  product: Product;
}

// Product card component
const ProductCard = ({ product }: ProductCardProps) => {
  // Check if product is new
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    // Link to product page

    <>
      <figure className='card-image flex flex-col items-center sm:flex-none sm:justify-normal'>
        {/* <Image
          src={product.imageUrl1}
          alt={product.name}
          width={800}
          height={400}
          className='h-48 object-cover'
        /> */}
        <VideoPlayer
          movFile={product.movFile}
          webmFile={product.webMFile}
          width={'w-full'}
          height={'h-full'}
          justifyContent={'start'}
        />

        <Link
          href={'/products/' + product.id}
          className='card flex w-full justify-center bg-base-100 transition-shadow hover:shadow-xl'
        >
          <div className='card-body flex items-center'>
            <h2 className='card-title'>{product.name}</h2>
            {/* {isNew && <div className='badge badge-secondary'>NEW</div>} */}
            {/* <p>{product.description}</p> */}
            <PriceTag price={product.price} className='mt-3' />
          </div>
        </Link>
      </figure>
    </>
  );
};

export default ProductCard;
