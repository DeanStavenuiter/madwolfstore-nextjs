import { getServerSession } from 'next-auth';
import authOptions from '../auth/auth';
import Menu from './menu';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  if (session && session.user.role !== 'WOLF') {
    signOut();
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  return (
    <>
      <div className='flex flex-col items-start'>
        <div className='w-full pl-4 pr-4'>
          <h1>Admin Dashboard</h1>
          <div className='divider' />
        </div>

        <Menu />
      </div>
    </>
  );
};

export default Dashboard;
