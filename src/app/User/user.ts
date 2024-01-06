import { prisma } from '@/lib/db/prisma';
import authOptions from '../auth/auth';
import { getServerSession } from 'next-auth';

export async function getUserWithAddress() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        Address: true,
      },
    });

    return user;
  } else {
    return null;
  }
}

export async function getUser() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        Address: true,
        Order: true,
        Cart: {
          include: {
            items: true,
          },
        },
      },
    });

    return user;
  } else {
    return null;
  }
}
