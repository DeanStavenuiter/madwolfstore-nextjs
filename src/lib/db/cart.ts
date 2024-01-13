import { Cart, CartItems, Prisma } from '@prisma/client';
import { prisma } from './prisma';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/auth';

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

  // console.log('cart in session', cart);

  //if the user is logged in, we fetch the cart from the database
  if (session) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                sizes: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // You can change 'createdAt' to another field if needed
      },
      take: 1,
    });

    // console.log('Cart in getCart', cart);
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
                product: {
                  include: {
                    sizes: true,
                  },
                },
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
          items: {
            include: {
              product: {
                include: {
                  sizes: true,
                },
              },
            },
          },
        },
      })
    : null;

    // console.log('localCart', localCart);

  if (!localCart) {
    return;
  }

  //we fetch the user cart and its items if it exists
  const userCart = await prisma.cart.findFirst({
    where: {
      userId: userId,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              sizes: true,
            },
          },
        },
      },
    },
  });

  // console.log('userCart', userCart);

  //we merge the local cart items into the user cart items
  await prisma.$transaction(async (tx) => {
    //if the user cart exists, we merge the local cart items into it
    // console.log('userCart', userCart);
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);
      // console.log('mergedCartItems', mergedCartItems);


      //we delete the user cart items
     const deleteCartItems = await tx.cartItems.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

      // console.log('deleteCartItems', deleteCartItems);

      // we create the merged cart items
      const mergeCart = await tx.cart.update({
        where: {
          id: userCart.id,
        },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                size: item.size,
                sizeQuantity: item.sizeQuantity,
              })),
            },
          },
        },
      });

      // console.log('createMergedCartItems', mergeCart);
    } else {
      //if the user cart does not exist, we create it and add the local cart items to it
      const createNewCartAndMerge = await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                size: item.size,
                sizeQuantity: item.sizeQuantity,
              })),
            },
          },
        },
      });
      // console.log('createNewCartAndMerge', createNewCartAndMerge);
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

function mergeCartItems(...cartItems: CartItems[][]): CartItems[] {
  const mergedItems: Record<string, CartItems> = {};

  cartItems.forEach((items) => {
    items.forEach((item) => {
      // Create a unique key for each item based on the product ID and size
      const key = `${item.productId}-${item.size || 'default'}`;

      if (mergedItems[key]) {
        // If the item already exists, update the quantities
        mergedItems[key].quantity += item.quantity;

        // Check and update sizes and size quantities
        if (item.size && item.sizeQuantity) {
          mergedItems[key].sizeQuantity =
            (mergedItems[key].sizeQuantity || 0) + item.sizeQuantity;
        }
      } else {
        // If the item does not exist, add it to the merged items
        mergedItems[key] = {
          ...item,
        };
      }
    });
  });

  // console.log("Object.values(mergedItems)", Object.values(mergedItems));

  return Object.values(mergedItems);
}
