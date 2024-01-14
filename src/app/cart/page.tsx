import { getCart } from '@/lib/db/cart';
import CartEntry from './CartEntry';
import setProductQuantity from './actions';
import { formatPrice } from '@/lib/format';
import CheckOutButton from './CheckOutButton';
import Link from 'next/link';

export const metadata = {
  title: 'Your Cart | MadWolf Store',
};

// Cart page component
const CartPage = async () => {
  // Get cart
  const cart = await getCart();

  return (
    <div className='flex items-center justify-center'>
      <div className='flex w-[35%] flex-col items-center justify-center '>
        <h1 className='mb-6 text-3xl font-bold'>Shopping Cart</h1>

        {cart?.items.map((cartItem) => (
          <CartEntry
            cartItem={cartItem}
            key={cartItem.id}
            setProductQuantity={setProductQuantity}
          />
        ))}
        {!cart?.items.length && <p>Your Cart is empty.</p>}
        <div className='flex flex-col items-end sm:items-center'>
          <p className='mb-3 font-bold'>
            Total: {formatPrice(cart?.subtotal || 0)}
          </p>
          {/* <form action={handlePayment}>
          <CheckOutButton className='btn-block'>Checkout</CheckOutButton>
        </form> */}

          <Link href={'/checkout'}>
            <button
              className='btn btn-block bg-sky-600 text-coolGray-100 sm:w-[200px]'
              disabled={!cart || null || cart.items.length === 0 ? true : false}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
