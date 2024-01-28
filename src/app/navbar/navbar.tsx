import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo_wit.png';
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/cart';
import ShoppingCartButton from './ShoppingCartButton';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db/prisma';

// Search products on submit
const searchProdutcs = async (formData: FormData) => {
  'use server';

  const searchQuery = formData.get('searchQuery')?.toString();

  if (searchQuery) {
    redirect('/search?query=' + searchQuery);
  }
};



const Navbar = async () => {
  // Get cart and session
  const cart = await getCart();
  const session = await getServerSession(authOptions);

  return (
    <div className='animate-navbarAnimation flex justify-center bg-bas-100'>
      <div className='navbar max-w-7xl gap-2 sm:flex-row sm:justify-center '>
        <Link href='/' className='w-1/4 sm:w-1/2'>
          <div className='flex items-center gap-3 text-xl'>
            <Image
              src={logo}
              height={60}
              width={60}
              alt='Madwolf logo'
              priority
            />
            <div className='hidden sm:flex sm:justify-start '>
              <span>MadWolf Store</span>
            </div>
          </div>
        </Link>
        <div className='flex w-3/4 items-center  justify-between gap-2 sm:justify-end'>
          <form action={searchProdutcs}>
            <div className='md: form-control hidden lg:block'>
              <svg
                className='pointer-events-none absolute text-coolgray-400 z-10 my-3.5 ms-4 stroke-current opacity-60'
                width='16'
                height='16'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
              <input
                type='text'
                name='searchQuery'
                placeholder='Search...'
                className='input input-bordered w-full min-w-[100px] pl-12 bg-neutral-800'
              />
              <div className='dropdown dropdown-end'>
                <div className='card dropdown-content card-compact z-30 mt-3 w-52 bg-base-100 shadow'>
                  <div className='card-body'></div>
                </div>
              </div>
            </div>
          </form>
          <div className='flex'>
            <ShoppingCartButton cart={cart} />
            <UserMenuButton session={session} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
