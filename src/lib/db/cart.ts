import { Cart, Prisma } from '@prisma/client';
import prisma from './prisma';
import { cookies } from 'next/headers';

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type ShoppingCart = CartWithProducts & {
  Size: number;
  Subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get('localCartId')?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: {
          id: localCartId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: cart.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  //note needs encryption + secure settings in production
  cookies().set('localCartId', newCart.id);

  return {
    ...newCart,
    items: [],
    Size: 0,
    Subtotal: 0,
  }
}
