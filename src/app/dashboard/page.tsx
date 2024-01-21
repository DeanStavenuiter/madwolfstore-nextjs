import { getServerSession } from 'next-auth';
import authOptions from '../auth/auth';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Main from './main';

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

        <Main />
      </div>
    </>
  );
};

export default Dashboard;
