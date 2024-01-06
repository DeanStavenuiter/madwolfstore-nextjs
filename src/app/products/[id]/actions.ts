'use server';
import { createCart, getCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

export const incrementProductQuantity = async (
  productId: string,
  selectedSize: string
) => {
  console.log(' selectedSize ', selectedSize);
  //  Get the cart from the database or create a new one
  const cart = (await getCart()) ?? (await createCart());

  // Check if the product is already in the cart
  const articleInCart = cart.items.find((item) => item.productId === productId);

  // If the product is already in the cart, increment the quantity
  if (articleInCart) {
   const updateCart = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: articleInCart.id },
            data: {
              quantity: { increment: 1 },
              size: selectedSize,
              sizeQuantity: { increment: 1 },
            },
          },
        },
      },
    });
    console.log(' updateCart ', updateCart);
    
  } else {
    // If the product is not in the cart, add it
   const addProduct =  await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            productId,
            quantity: 1,
            size: selectedSize,
            sizeQuantity: 1,
          },
        },
      },
    });
    console.log(' addProduct ', addProduct);
  }

  revalidatePath('/products/[id]');
};
