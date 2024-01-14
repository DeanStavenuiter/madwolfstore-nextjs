import PaginationBar from '@/components/PaginationBar';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma';


export interface HomeProps {
  searchParams: {
    page: string;
  };
}

const Store = async (
    { searchParams: { page = '1' } }: HomeProps
    ) => {
  const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 0;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  // Get products from database
  const products = await prisma.product.findMany({
    orderBy: {
      id: 'desc',
      stock: 'desc',
    },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <div className='flex flex-col items-center'>
      <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {(currentPage === 1 ? products : products).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default Store;