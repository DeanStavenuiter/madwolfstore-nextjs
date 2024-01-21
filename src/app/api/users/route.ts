import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Orders: {
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
        },
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'All users fetched',
      users,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Users did not fetch',
      error,
    });
  }
}
