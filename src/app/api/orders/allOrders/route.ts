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
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'All orders fetched',
      orders,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Orders did not fetch',
      error,
    });
  }
}
