import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
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
        user: true,
      },
    });

    console.log('orders ', orders);

    return NextResponse.json({
      status: 200,
      message: 'All orders fetched',
      orders,
    });
  } catch (error) {
    console.log('orders get error ', error);
    return NextResponse.json({
      status: 500,
      message: 'Orders did not fetch',
      error,
    });
  }
}
