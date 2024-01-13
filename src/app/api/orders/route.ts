import { getUser } from '@/app/User/user';
import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUser();

    // console.log('user in route', user);

    if (user) {
        const ordersWithItems = await prisma.order.findMany({
          where: {
            userId: user.id,
            status: 'paid',
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });

      console.log('Orders in route:', ordersWithItems);

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
