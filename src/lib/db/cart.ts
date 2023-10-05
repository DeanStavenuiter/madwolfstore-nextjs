import { Cart, CartItems, Prisma } from '@prisma/client';
import prisma from './prisma';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type CartItemWithProduct = Prisma.CartItemsGetPayload<{
  include: {
    product: true;
  };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  //we fetch the session
  const session = await getServerSession(authOptions);

  let cart: CartWithProducts | null = null;

  //if the user is logged in, we fetch the cart from the database
  if (session) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  } else {
    //if the user is not logged in, we fetch the cart from the cookie
    const localCartId = cookies().get('localCartId')?.value;
    cart = localCartId
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
  }

  if (!cart) {
    return null;
  }

  return {
    //we calculate the size and subtotal of the cart
    ...cart,
    size: cart.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: cart.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  //we fetch the session
  const session = await getServerSession(authOptions);

  let newCart: Cart;

  //if the user is logged in, we create a cart for them
  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session.user.id },
    });
  } else {
    //if the user is not logged in, we create a cart for them and store it in a cookie
    newCart = await prisma.cart.create({
      data: {},
    });
    //note needs encryption + secure settings in production
    cookies().set('localCartId', newCart.id);
  }

  return {
    //we return the cart with an empty items array, size and subtotal
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export const mergeAnonymousCartIntoUserCart = async (userId: string) => {
  //we fetch the local cart id from the cookie
  const localCartId = cookies().get('localCartId')?.value;

  //we fetch the local cart and its items if it exists
  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: {
          id: localCartId,
        },
        include: {
          items: true,
        },
      })
    : null;

  if (!localCart) {
    return;
  }

  //we fetch the user cart and its items if it exists
  const userCart = await prisma.cart.findFirst({
    where: {
      userId: userId,
    },
    include: {
      items: true,
    },
  });

  //we merge the local cart items into the user cart items
  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

      await tx.cartItems.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

      await tx.cartItems.createMany({
        data: mergedCartItems.map((item) => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      //if the user cart does not exist, we create it and add the local cart items to it
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    //we delete the local cart
    await tx.cart.delete({
      where: {
        id: localCart.id,
      },
    });

    //  we delete the local cart cookie
    cookies().set('localCartId', '');
  });
};

function mergeCartItems(...cartItems: CartItems[][]) {
  //we merge the cart items by productId
  return cartItems.reduce((acc, items) => {
    //we loop through the items
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);

      //if the item already exists, we add the quantity
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        //if the item does not exist, we add it to the array
        acc.push(item);
      }
    });

    return acc;
    //we initialize the accumulator with an empty array
  }, [] as CartItems[]);
}
