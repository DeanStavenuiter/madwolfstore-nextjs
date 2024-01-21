import authOptions from '@/app/auth/auth';
import FormSubmitButton from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { Type } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { cache } from 'react';

// Props for product page
interface ProductPageProps {
  params: {
    id: string;
  };
}

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

const page = async ({ params: { id } }: ProductPageProps) => {
  const quantityOptions: JSX.Element[] = [];
  const session = await getServerSession(authOptions);
  //check for session
  if (!session) {
    signOut();
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }

  //check for admin
  if (session && session.user.role !== 'WOLF') {
    signOut();
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }
  // Generate quantity options
  for (let i = 0; i <= 25; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  const updateProduct = async (formData: FormData) => {
    'use server';
    //get input data from form to create new product
    const name = formData.get('name')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const movFile = formData.get('mp4File')?.toString() || '';
    const webMFile = formData.get('webMFile')?.toString() || '';
    const imageUrl1 = formData.get('imageUrl1')?.toString() || '';
    const imageUrl2 = formData.get('imageUrl2')?.toString() || '';
    const imageUrl3 = formData.get('imageUrl3')?.toString() || '';
    const imageUrl4 = formData.get('imageUrl4')?.toString() || '';
    const price = Number(formData.get('price') || 0);
    const type = formData.get('type')?.toString();
    const XS = Number(formData.get('XS') || 0);
    const S = Number(formData.get('S') || 0);
    const M = Number(formData.get('M') || 0);
    const L = Number(formData.get('L') || 0);
    const XL = Number(formData.get('XL') || 0);
    const XXL = Number(formData.get('XXL') || 0);
    const stock = Number(formData.get('stock'));


    console.log("stock from form", stock)
    //update product

    const updateProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        movFile,
        webMFile,
        imageUrl1,
        imageUrl2,
        imageUrl3,
        imageUrl4,
        price,
        type: type as Type,
        stock: stock,
        sizes: {
          updateMany: [
            { where: { size: 'XS' }, data: { quantity: XS } },
            { where: { size: 'S' }, data: { quantity: S } },
            { where: { size: 'M' }, data: { quantity: M } },
            { where: { size: 'L' }, data: { quantity: L } },
            { where: { size: 'XL' }, data: { quantity: XL } },
            { where: { size: 'XXL' }, data: { quantity: XXL } },
          ],
        },
        
      },
      include: {
        sizes: true,
      },
    });

    console.log('updateProduct', updateProduct);
    return {
      message: 'Product updated successfully',
    };
  };

  const product = await getProduct(id);

  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Sort the sizes array for each product
  const sortedSizes = product.sizes.sort(
    (a: any, b: any) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
  );

  const totalProductStock = sortedSizes.reduce(
    (acc: number, size: any) => acc + size.quantity,
    0
  );

  console.log('totalProductStock', totalProductStock)


  return (
    <div className='flex flex-col justify-center'>
      <div className='flex w-full max-w-7xl flex-col'>
        <div className='flex w-full items-center justify-between pl-4 pr-4'>
          <h1 className='text-2xl'>{product.name}</h1>
          <Link href={'/dashboard'} className='hover:underline'>
            <div>Admin Dashboard</div>
          </Link>
        </div>
        <div className='divider' />
      </div>
      {!product ? (
        <span className='loading-spinner'></span>
      ) : (
        <div className=''>
          <form action={updateProduct}>
            <div className='flex'>
              {/* product name */}
              <div className='w-full'>
                <label className='label'>
                  <span className='label-text'>Product name</span>
                </label>
                <input
                  required
                  name='name'
                  placeholder='Name of the Product'
                  className='peer input input-bordered mb-3 w-full invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
                  pattern='^.{3,}$'
                  defaultValue={product.name}
                />
                <span className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                  Please enter the name of the product
                </span>
              </div>
            </div>
            {/* product description */}
            <div className='w-full'>
              <label className='label'>
                <span className='label-text'>Product description</span>
              </label>
              <textarea
                required
                name='description'
                placeholder='Description'
                className='textarea textarea-bordered mb-3 w-full text-base'
                defaultValue={product.description}
              ></textarea>
              <span className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                Please enter a description of the product
              </span>
            </div>
            {/* image urls */}
            <div className='w-full'>
              <label className='label'>
                <span className='label-text'>Product image</span>
              </label>
              <input
                name='mp4File'
                type='url'
                placeholder='MP4 File'
                className='input input-bordered mb-3 w-full '
                defaultValue={product.movFile || undefined}
              />
              <input
                name='webMFile'
                type='url'
                placeholder='WebM File'
                className='input input-bordered mb-3 w-full '
                defaultValue={product.webMFile || undefined}
              />
              <input
                name='imageUrl1'
                type='url'
                placeholder='Image URL 1'
                className='input input-bordered mb-3 w-full '
                defaultValue={product.imageUrl1 || undefined}
              />
              <input
                name='imageUrl2'
                type='url'
                placeholder='Image URL 2'
                className='input input-bordered mb-3 w-full '
                defaultValue={product.imageUrl2 || undefined}
              />
              <input
                name='imageUrl3'
                type='url'
                placeholder='Image URL 3'
                className='input input-bordered mb-3 w-full '
                defaultValue={product.imageUrl3 || undefined}
              />
              <input
                name='imageUrl4'
                type='url'
                placeholder='Image URL 4'
                className='input input-bordered mb-3 w-full '
                defaultValue={product.imageUrl4 || undefined}
              />
            </div>
            <label className='label'>
              <span className='label-text'>Product size and quantity</span>
            </label>
            {/* sizes */}
            <div className='mb-3 flex flex-wrap gap-3 sm:gap-0'>
              {/* XS */}
              <label className='w-full  sm:w-1/4'>
                <span className='btn no-animation w-1/2 hover:cursor-default sm:w-20'>
                  XS
                </span>
                <select
                  required
                  name='XS'
                  className='select select-bordered w-1/2 sm:w-20'
                  defaultValue={sortedSizes[0].quantity}
                >
                  {quantityOptions}
                </select>
              </label>
              {/* S */}
              <label className=' w-full  sm:w-1/4 '>
                <span className='btn no-animation w-1/2 hover:cursor-default sm:w-20'>
                  S
                </span>
                <select
                  required
                  name='S'
                  className='select select-bordered w-1/2 sm:w-20'
                  defaultValue={sortedSizes[1].quantity}
                >
                  {quantityOptions}
                </select>
              </label>
              {/* M */}
              <label className=' w-full  sm:w-1/4 '>
                <span className='btn  no-animation w-1/2 hover:cursor-default sm:w-20'>
                  M
                </span>
                <select
                  required
                  name='M'
                  className='select select-bordered w-1/2 sm:w-20'
                  defaultValue={sortedSizes[2].quantity}
                >
                  {quantityOptions}
                </select>
              </label>
              {/* product stock */}

              <label className=' flex w-full items-center  sm:w-1/4 '>
                <span className='btn  no-animation w-1/2 hover:cursor-default sm:w-20'>
                  total stock
                </span>
                <input
                //   disabled
                  name='stock'
                  className='input input-bordered flex w-1/2 justify-center sm:w-20'
                  defaultValue={totalProductStock}
                ></input>
              </label>
            </div>
            <div className='mb-3 flex flex-wrap gap-3 sm:gap-0'>
              {/* L */}
              <label className=' w-full sm:w-1/4 '>
                <span className='btn no-animation w-1/2 hover:cursor-default sm:w-20'>
                  L
                </span>
                <select
                  required
                  name='L'
                  className='select select-bordered w-1/2 sm:w-20'
                  defaultValue={sortedSizes[3].quantity}
                >
                  {quantityOptions}
                </select>
              </label>
              {/* XL */}
              <label className=' w-full sm:w-1/4 '>
                <span className='btn no-animation w-1/2 hover:cursor-default sm:w-20'>
                  XL
                </span>
                <select
                  required
                  name='XL'
                  className='select select-bordered w-1/2 sm:w-20'
                  defaultValue={sortedSizes[4].quantity}
                >
                  {quantityOptions}
                </select>
              </label>
              {/* XXL */}
              <label className=' w-full sm:w-1/4 '>
                <span className='btn no-animation w-1/2 hover:cursor-default sm:w-20'>
                  XXL
                </span>
                <select
                  required
                  name='XXL'
                  className='select select-bordered w-1/2 sm:w-20'
                  defaultValue={sortedSizes[5].quantity}
                >
                  {quantityOptions}
                </select>
              </label>
            </div>
            <div className='mb-4 flex gap-4'>
              {/* product type */}
              <div className='w-full'>
                <label className='label'>
                  <span className='label-text'>Product type</span>
                </label>
                <select
                  required
                  name='type'
                  className='input select input-bordered  w-full'
                >
                  <option value='tshirt'>t-shirt</option>
                  <option value='sweather'>sweater</option>
                  <option value='hoodie'>hoodie</option>
                  <option value='accessory'>accessory</option>
                  <option value='print'>print</option>
                </select>
              </div>

              {/* product price */}
              <div className='w-full'>
                <label className='label'>
                  <span className='label-text'>Product price</span>
                </label>
                <input
                  required
                  name='price'
                  placeholder='Price'
                  type='number'
                  className='input input-bordered mb-3 w-full  '
                  defaultValue={product.price}
                />
              </div>
            </div>
            <FormSubmitButton
              className='btn-block group-invalid:pointer-events-none group-invalid:opacity-30'
            >
              Update Product
            </FormSubmitButton>
          </form>
        </div>
      )}
    </div>
  );
};

export default page;
