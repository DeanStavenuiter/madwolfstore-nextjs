import React from 'react';
import { User } from '@/app/dashboard/main';
import Link from 'next/link';

interface AllUsersProps {
  userData: User[];
}

const AllUsers = ({ userData }: AllUsersProps) => {
  return (
    <div className='ml-4 flex flex-row flex-wrap justify-start gap-2 '>
      <div className='overflow-x-auto'>
        {!userData.length ? (
          <div className='flex items-center justify-center'>
            <span className='text'>No products yet...</span>
          </div>
        ) : (
          <table className='table'>
            {/* head */}
            <thead>
              <tr className='border-b-[rgb(30,35,42)] text-coolGray-200'>
                <th>Users</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user: any) => (
                <tr
                  key={user.id}
                  className=' border-b-[rgb(30,35,42)] odd:bg-[rgb(30,35,42)] even:bg-[rgb(23,23,23)]'
                >
                  <td>
                    <Link
                      href={`/dashboard/user/${user.id}`}
                      className='hover:text-coolGray-200'
                    >
                      {user.id}
                    </Link>
                  </td>
                  <td>
                    {user.firstName === null ? ' ' : user.firstName + ' '}
                    {user.lastName === null ? ' ' : user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role === 'WOLF' ? 'Admin' : 'User'}</td>
                  {user.Orders.map((order: any) => (
                    <td key={order.id} className='flex hover:text-coolGray-200'>
                      <Link href={`/dashboard/order/${order.orderNo}`}>
                        {order.orderNo}
                      </Link>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
