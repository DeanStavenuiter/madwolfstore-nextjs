import Link from 'next/link';
import React from 'react';
import { Product } from '@/app/dashboard/main';
import { formatPrice } from '@/lib/format';

interface AllProductsProps {
  productData: Product[];
}

const AllProducts = ({ productData }: AllProductsProps) => {
  return (
    <div className='ml-4 flex flex-row flex-wrap justify-start gap-2 '>
      <div className='overflow-x-auto'>
        {!productData.length ? (
          <div className='flex items-center justify-center'>
            <span className='text'>No products yet...</span>
          </div>
        ) : (
          <table className='table'>
            {/* head */}
            <thead>
              <tr className='border-b-[rgb(30,35,42)] text-coolGray-200'>
                <th>Product Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Stock</th>
                <th>XS</th>
                <th>S</th>
                <th>M</th>
                <th>L</th>
                <th>XL</th>
                <th>XXL</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product: any) => {
                const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
                // Sort the sizes array for each product
                const sortedSizes = product.sizes.sort(
                  (a: any, b: any) =>
                    sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
                );

                return (
                  <tr
                    key={product.id}
                    className=' border-b-[rgb(30,35,42)] odd:bg-[rgb(30,35,42)] even:bg-[rgb(23,23,23)]'
                  >
                    <td>
                      <Link
                        href={`dashboard/product/${product.id}`}
                        className='hover:text-coolGray-200'
                      >
                        {product.id}
                      </Link>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.type}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td
                      className={
                        product.stock === 0
                          ? 'text-red-600'
                            : 'text-green-600'
                      }
                    >
                      {product.stock}
                    </td>
                    {sortedSizes.map((size: any) => (
                      <td
                        className={
                          size.quantity === 0
                            ? 'text-red-600'
                              : 'text-green-600'
                        }
                        key={size.size}
                      >
                        {size.quantity}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
