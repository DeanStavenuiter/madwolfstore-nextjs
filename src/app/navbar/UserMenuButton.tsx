'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import profilePicPlaceHolder from '@/assets/profile-pic-placeholder.png';
import { signIn, signOut } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserMenuButtonProps {
  session: Session | null;
}

const UserMenuButton = ({ session }: UserMenuButtonProps) => {
  const user = session?.user;
  const [role, setRole] = useState(false);

  useEffect(() => {
    const getRole = async () => {
      const response = await axios.get('/api/users/name');
      setRole(response.data);
      // return response.data;
    };

    getRole();
  }, []);

  return (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0} className='btn btn-circle btn-ghost'>
        {user ? (
          <Image
            src={user?.image || profilePicPlaceHolder}
            alt='Profile picture'
            width={40}
            height={40}
            className='w-10 rounded-full'
          />
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block h-5 w-5 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
            />
          </svg>
        )}
      </label>
      <ul
        tabIndex={0}
        className='bg-gray-900-800 menu dropdown-content rounded-box menu-sm z-30 mt-3 w-52 bg-[rgb(30,35,42)] text-coolGray-400 shadow'
      >
        {role === true ? (
          <>
            <li>
              <Link href={'/dashboard'}>
                <button>Dashboard</button>
              </Link>
            </li>
          </>
        ) : (
          ''
        )}
        <li>
          {user ? (
            <>
              <Link href={'/profile'}>Profile</Link>

              <button onClick={() => signOut({ callbackUrl: '/' })}>
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </li>
      </ul>
      <Toaster />
    </div>
  );
};

export default UserMenuButton;
