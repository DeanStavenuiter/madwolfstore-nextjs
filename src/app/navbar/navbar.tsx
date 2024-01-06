import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo_wit.png';
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/cart';
import ShoppingCartButton from './ShoppingCartButton';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]/route';
import { authOptions } from '@/app/auth/auth';

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
    <div className='animate-navbarAnimation bg-base-100'>
      <div className='navbar m-auto max-w-8xl flex-col gap-2 sm:flex-row'>
        <div className='flex-1'>
          <Link href='/' className='flex items-center gap-3 text-xl'>
            <Image src={logo} height={60} width={60} alt='Madwolf logo' priority/>
            MadWolf Store
          </Link>
        </div>
        <div className='flex-none gap-2'>
          <form action={searchProdutcs}>
            <div className='form-control '>
              <input
                type='text'
                name='searchQuery'
                placeholder='search'
                className='input input-bordered w-full min-w-[100px]'
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton 
          session={session} 
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
