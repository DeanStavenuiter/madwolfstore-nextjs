import FormSubmitButton from '@/components/FormSubmitButton';
import {prisma} from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Add Product | MadWolf Store',
  description: 'Add a new product to the store.',
};

const addProduct = async (formData: FormData) => {
  'use server';

  const session = await getServerSession(authOptions);

  //check for admin
  if(!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }

  //get input data from form to create new product
  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);

  //check for missing fields
  if (!name || !description || !imageUrl || !price) {
    throw Error('Missing required fields.');
  }

  //create new product
  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect('/add-product');
};

const page = async() => {

  const session = await getServerSession(authOptions);

//check for admin
  if(!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }
  
  return (
    <div>
      <h1 className='mb-3 text-lg font-bold'>Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name='name'
          placeholder='Name'
          className='input input-bordered mb-3 w-full '
        />
        <textarea
          required
          name='description'
          placeholder='Description'
          className='textarea textarea-bordered mb-3 w-full'
        ></textarea>
        <input
          required
          name='imageUrl'
          type='url'
          placeholder='Image URL'
          className='input input-bordered mb-3 w-full '
        />
        <input
          required
          name='price'
          placeholder='Price'
          type='number'
          className='input input-bordered mb-3 w-full  '
        />
        <FormSubmitButton className='btn-block'>Add Product</FormSubmitButton>
      </form>
    </div>
  );
};

export default page;
