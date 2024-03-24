import { getCart } from '@/lib/db/cart';
import CartEntry from './CartEntry';
import setProductQuantity from './actions';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';

export const metadata = {
  title: 'Your Cart | MadWolf Store',
};

// Cart page component
const CartPage = async () => {
  // Get cart
  const cart = await getCart();

  console.log('cart', cart);

  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center '>
        <h1 className='mb-6 text-3xl font-bold'>Shopping Cart</h1>

        {cart?.items.map((cartItem) => (
          <>
            <CartEntry
              cartItem={cartItem}
              key={cartItem.id}
              setProductQuantity={setProductQuantity}
            />
          </>
        ))}
        {!cart?.items.length && <p>Your Cart is empty.</p>}
        <div className='flex w-full flex-col items-center '>
          <p className='mb-3 font-bold'>
            Total: {formatPrice(cart?.subtotal || 0)}
          </p>
          
          <button
            className={
              !cart || cart.items.length === 0
                ? 'w-full cursor-not-allowed rounded-lg bg-[rgb(32,32,40)] p-2'
                : 'btn w-full border-none bg-sky-500 text-coolGray-200 hover:bg-sky-700 disabled:cursor-not-allowed disabled:text-coolGray-300 sm:w-[200px]'
            }
          >
            {!cart || cart.items.length === 0 ? (
              'Empty Cart'
            ) : (
              <Link
                href={'/checkout'}
                className='flex w-full justify-center pl-5 pr-5 sm:pl-0 sm:pr-0'
              >
                Checkout
              </Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
