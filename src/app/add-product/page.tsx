import FormSubmitButton from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/auth/auth';
import { Type, Size } from '@prisma/client';
import { NextResponse } from 'next/server';

export const metadata = {
  title: 'Add Product | MadWolf Store',
  description: 'Add a new product to the store.',
};

const addProduct = async (formData: FormData) => {
  'use server';

  const session = await getServerSession(authOptions);

  //check for admin
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }

  //get input data from form to create new product
  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl1 = formData.get('imageUrl1')?.toString();
  const imageUrl2 = formData.get('imageUrl2')?.toString();
  const imageUrl3 = formData.get('imageUrl3')?.toString();
  const imageUrl4 = formData.get('imageUrl4')?.toString();
  const price = Number(formData.get('price') || 0);
  const type = formData.get('type')?.toString();
  const XS = Number(formData.get('XS') || 0);
  const S = Number(formData.get('S') || 0);
  const M = Number(formData.get('M') || 0);
  const L = Number(formData.get('L') || 0);
  const XL = Number(formData.get('XL') || 0);
  const XXL = Number(formData.get('XXL') || 0);

  //check for missing fields

  if (!name) {
    throw new Error('Missing product name');
  } else if (!description) {
    throw new Error('Missing product description');
  } else if (!imageUrl1) {
    throw new Error('Missing product image');
  } else if (!price) {
    throw new Error('Missing product price');
  } else if (!type) {
    throw new Error('Missing product type');
  } else if (!XS) {
    throw new Error('Missing product size XS');
  } else if (!S) {
    throw new Error('Missing product size S');
  } else if (!M) {
    throw new Error('Missing product size M');
  } else if (!L) {
    throw new Error('Missing product size L');
  } else if (!XL) {
    throw new Error('Missing product size XL');
  } else if (!XXL) {
    throw new Error('Missing product size XXL');
  }

  //create new product
  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      imageUrl4,
      price,
      type: type as Type,
      sizes: {
        createMany: {
          data: [
            { size: 'XS', quantity: XS },
            { size: 'S', quantity: S },
            { size: 'M', quantity: M },
            { size: 'L', quantity: L },
            { size: 'XL', quantity: XL },
            { size: 'XXL', quantity: XXL },
          ],
        },
      },
    },
    include: {
      sizes: true, // This includes the created ProductSizes in the response
    },
  });

  redirect('/add-product');
};

const page = async () => {
  // const session = await getServerSession(authOptions);

  const quantityOptions: JSX.Element[] = [];

  // Generate quantity options
  for (let i = 0; i <= 25; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  //check for admin
  // if (!session) {
  //   redirect('/api/auth/signin?callbackUrl=/add-product');
  // }

  return (
    <div className='bg form-control rounded-md bg-neutral p-4'>
      <h1 className='mb-3 text-lg font-bold'>Add Product</h1>
      <form action={addProduct}>
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
            required
            name='imageUrl1'
            type='url'
            placeholder='Image URL 1'
            className='input input-bordered mb-3 w-full '
          />
          <input
            name='imageUrl2'
            type='url'
            placeholder='Image URL 2'
            className='input input-bordered mb-3 w-full '
          />
          <input
            name='imageUrl3'
            type='url'
            placeholder='Image URL 3'
            className='input input-bordered mb-3 w-full '
          />
          <input
            name='imageUrl4'
            type='url'
            placeholder='Image URL 4'
            className='input input-bordered mb-3 w-full '
          />
        </div>
        <label className='label'>
          <span className='label-text'>Product size and quantity</span>
        </label>
        {/* sizes */}
        <div className='mb-3 flex flex-wrap gap-3 sm:gap-0'>
          {/* XS */}
          <label className='w-full  sm:w-1/3'>
            <span className='btn no-animation w-1/2 sm:w-20'>XS</span>
            <select
              required
              name='XS'
              className='select select-bordered w-1/2 sm:w-20'
            >
              {quantityOptions}
            </select>
          </label>
          {/* S */}
          <label className=' w-full  sm:w-1/3 '>
            <span className='btn no-animation w-1/2 sm:w-20'>S</span>
            <select
              required
              name='S'
              className='select select-bordered w-1/2 sm:w-20'
            >
              {quantityOptions}
            </select>
          </label>
          {/* M */}
          <label className=' w-full  sm:w-1/3 '>
            <span className='btn  no-animation w-1/2 sm:w-20'>M</span>
            <select
              required
              name='M'
              className='select select-bordered w-1/2 sm:w-20'
            >
              {quantityOptions}
            </select>
          </label>
        </div>

        <div className='mb-3 flex flex-wrap gap-3 sm:gap-0'>
          {/* L */}
          <label className=' w-full sm:w-1/3 '>
            <span className='btn no-animation w-1/2 sm:w-20'>L</span>
            <select
              required
              name='L'
              className='select select-bordered w-1/2 sm:w-20'
            >
              {quantityOptions}
            </select>
          </label>
          {/* XL */}
          <label className=' w-full sm:w-1/3 '>
            <span className='btn no-animation w-1/2 sm:w-20'>XL</span>
            <select
              required
              name='XL'
              className='select select-bordered w-1/2 sm:w-20'
            >
              {quantityOptions}
            </select>
          </label>
          {/* XXL */}
          <label className=' w-full sm:w-1/3 '>
            <span className='btn no-animation w-1/2 sm:w-20'>XXL</span>
            <select
              required
              name='XXL'
              className='select select-bordered w-1/2 sm:w-20'
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
            <select required name='type' className='input select w-full'>
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
            />
          </div>
        </div>

        <FormSubmitButton className='btn-block group-invalid:pointer-events-none group-invalid:opacity-30'>
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default page;
