import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        sizes: true,
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'All products fetched',
      products,
    });
  } catch (error) {
    return NextResponse.json({
        status: 500,
        message: 'Products did not fetch',
        error
    });
  }
}
