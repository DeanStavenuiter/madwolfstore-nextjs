'use server';

import { getServerSession } from 'next-auth';
import authOptions from '../auth/auth';
import { redirect } from 'next/navigation';
import Main from './main';
import { prisma } from '@/lib/db/prisma';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  } else {
    const checkRole = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (checkRole && checkRole.role === 'USER') {
      redirect('/');
    }
  }

  return (
    <>
      <div className='flex flex-col items-start'>
        <div className='w-full pl-4 pr-4'>
          <h1>Admin Dashboard</h1>
          <div className='divider before:bg-[rgb(38,38,40)] after:bg-[rgb(38,38,40)]' />
        </div>

        <Main />
      </div>
    </>
  );
};

export default Dashboard;
