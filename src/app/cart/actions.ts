'use server';
import { createCart, getCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

const setProductQuantity = async (
  productId: string,
  quantity: number,
  // size: string,
  // sizeQuantity: number
) => {
  //  Get the cart from the database or create a new one
  const cart = (await getCart()) ?? (await createCart());

  // Check if the product is already in the cart
  const articleInCart = cart.items.find((item) => item.productId === productId);

  // If the quantity is 0, remove the product from the cart
  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id },
          },
        },
      });
    }
  } else {
    // If the quantity is not 0, update the quantity
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: { quantity, 
                // size, sizeQuantity 
              },
            },
          },
        },
      });
    } else {
      // If the product is not in the cart, add it
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId,
              quantity,
              // size,
              // sizeQuantity,
            },
          },
        },
      });
    }
  }

  revalidatePath('/cart');
};

export default setProductQuantity;
