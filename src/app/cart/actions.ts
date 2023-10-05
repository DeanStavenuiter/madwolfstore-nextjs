'use server';
import { createCart, getCart } from '@/lib/db/cart';
import prisma from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

const setProductQuantity = async (productId: string, quantity: number) => {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cartItems.delete({
        where: {
          id: articleInCart.id,
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cartItems.update({
        where: {
          id: articleInCart.id,
        },
        data: {
          quantity,
        },
      });
    } else {
        await prisma.cartItems.create({
            data: {
                cartId: cart.id,
                productId,
                quantity
            }
        })
    }
  }

  revalidatePath("/cart")
};

export default setProductQuantity;