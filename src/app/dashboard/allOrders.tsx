import Link from 'next/link';
import React from 'react';
import { convertDate } from '@/lib/convertDate';
import { Order } from '@/app/dashboard/main';

interface AllOrdersProps {
    orderData: Order[];
  }

const AllOrders = ({ orderData }: AllOrdersProps) => {

  return (
    <div className='ml-4 flex flex-row flex-wrap justify-start gap-2 '>
      <div className='overflow-x-auto'>
        {!orderData.length ? (
          <div className='flex items-center justify-center'>
            <span className='text'>No orders yet...</span>
          </div>
        ) : (
          <table className='table '>
            {/* head */}
            <thead>
              <tr className='border-b-[rgb(30,35,42)] text-coolGray-200'>
                <th>order nr</th>
                <th>created at</th>
                <th>ordered by</th>
                <th>total price</th>
                <th>status</th>
                <th>updated at</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order: any) => (
                <tr
                  key={order.id}
                  className=' border-b-[rgb(30,35,42)] odd:bg-[rgb(30,35,42)] even:bg-[rgb(23,23,23)]'
                >
                  <td className='hover:text-coolGray-200 '>
                    <Link href={`/dashboard/order/${order.orderNo}`}>
                      {order.orderNo}
                    </Link>
                  </td>
                  <td>{convertDate(order.createdAt)}</td>
                  <td className='hover:text-coolGray-200'>
                    <Link href={`/dashboard/user/${order.userId}`}>
                      {order.user.firstName
                        ? order.user.firstName
                        : ' ' + ' ' + order.user.lastName
                          ? order.user.lastName
                          : ' '}
                    </Link>
                  </td>
                  <td>{order.total}</td>
                  {order.status === 'paid' ? (
                    <td className='text-green-600 '>paid</td>
                  ) : order.status === 'expired' ? (
                    <td className='text-yellow-600'>expired</td>
                  ) : order.status === 'pending' ? (
                    <td className=''>pending</td>
                  ) : (
                    <td className='text-red-600'>canceled</td>
                  )}
                  <td>{convertDate(order.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
