import { prisma } from '@/lib/db/prisma';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import VideoPlayer from '@/components/videoplayer';
import Link from 'next/link';
import logo from '@/assets/logo_wit.png';
import SizeAndAddtoCartButton from '../sizeAndAddtoCartButton';
import Picutures from '@/components/Picutures';
import WrapperVideoAndPictures from '@/components/WrapperVideoAndPictures';

// Generate metadata for product page
export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: `${product.name} | MadWolf Store`,
    description: product.description1,
    // openGraph: { images: [{ url: product.imageUrl1 }] },
  };
}

// Props for product page
interface ProductPageProps {
  params: {
    id: string;
  };
}

// Get product from database
const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      sizes: true,
    },
  });
  if (!product) notFound();

  return product;
});

// Product page component
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);

  return (
    <div className='lg:items-top m-auto flex max-w-7xl flex-col items-center justify-center gap-4 lg:flex-row'>
      <figure className='card-image flex w-full flex-col items-center md:w-[50%] '>
        {!product ? (
          <div className='skeleton h-[622px] w-[350px]'></div>
        ) : (
          <>
            <WrapperVideoAndPictures product={product} />
          </>
        )}  
      </figure>
      <div className='w-full p-4 pb-6 lg:w-[50%]  lg:min-w-[368px]'>
        <div className='mb-2'>
          <Link href='/' className='flex items-center gap-3 text-xl'>
            <Image
              src={logo}
              height={35}
              width={35}
              alt='Madwolf logo'
              priority
            />
            MadWolf
          </Link>
        </div>

        <h1 className='mb-1 ml-1 text-5xl font-bold'>{product.name}</h1>
        <SizeAndAddtoCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
