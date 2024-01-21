import PaginationBar from '@/components/PaginationBar';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma';
import LogoAnimation from './home/logoAnimation';

export interface HomeProps {
  searchParams: {
    page: string;
  };
}

const HomePage = async ({ searchParams: { page = '1' } }: HomeProps) => {
  const currentPage = parseInt(page);
  const pageSize = 6;

  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil(totalItemCount / pageSize);

  // Get products from database
  const productsWithStock = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0,
      },
    },
    orderBy: {
      id: 'desc',
    },
    include: {
      sizes: true,
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  console.log('products', productsWithStock.length)
  return (
    <div className='max-w-8xl h-full flex-grow'>
      <LogoAnimation />
      {/* <Navbar /> */}
      <div className='flex flex-col items-center'>
        <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {(currentPage === 1 ? productsWithStock : productsWithStock).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
