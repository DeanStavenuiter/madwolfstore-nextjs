import { getUser } from '@/app/User/user';
import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUser();

    // console.log('user in route', user);

    if (user) {
    //   const ordersWithItems = await prisma.order.findMany({
    //     where: {
    //       userId: user.id,
    //       status: 'paid',
    //     },
    //     orderBy: {
    //       createdAt: 'desc',
    //     },
    //     include: {
    //       items: {
    //         include: {
    //           product: true,
    //         },
    //       },
    //     },
    //   });

    //   console.log('orders', ordersWithItems);
    //   //   const orders = user.Order;

    const ordersWithItems = await prisma.order.findMany({
  where: {
    userId: user.id,
    status: 'paid',
  },
  orderBy: {
    createdAt: 'desc',
  },
});

// console.log('Orders:', ordersWithItems);

// Manually fetch items for each order
const ordersWithManualItems = await Promise.all(
  ordersWithItems.map(async (order) => {
    const items = await prisma.cartItems.findMany({
      where: {
        orderId: order.id,
      },
      include: {
        product: true,
      },
    });

    // return { ...order, items };
    return items
  })
);

console.log('Orders with manual items:', ordersWithManualItems);

      return NextResponse.json({
        message: 'Orders fetched successfully',
        ordersWithItems,
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: 'Something went wrong',
      status: 500,
      error: error,
    });
  }
}
