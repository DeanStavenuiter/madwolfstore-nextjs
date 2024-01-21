import { prisma } from '@/lib/db/prisma';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profilePicPlaceHolder from '@/assets/profile-pic-placeholder.png';
import { convertDate } from '@/lib/convertDate';
import { formatPrice } from '@/lib/format';

interface OrderPageProps {
  params: { orderNo: string };
}

const getOrder = cache(async (orderNo: string) => {
  const order = await prisma.order.findUnique({
    where: { orderNo },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: {
        include: {
          Address: true,
        },
      },
    },
  });
  if (!order) notFound();

  return order;
});

const dashboardOrders = async ({ params: { orderNo } }: OrderPageProps) => {
  const order = await getOrder(orderNo);

  console.log('order', order);

  return (
    <div className='flex justify-center'>
      <div className='flex w-full max-w-7xl flex-col'>
        <div className='flex w-full items-center justify-between pl-4 pr-4'>
          <h1 className='text-2xl'>Order {order.orderNo}</h1>
          <Link href={'/dashboard'} className='hover:underline'>
            <div>Admin Dashboard</div>
          </Link>
        </div>
        <div className='divider' />
        {!order ? (
          <span className='loading-spinner'></span>
        ) : (
          <div className='flex gap-4'>
            <div className='card w-1/3'>
              <div className='card-body'>
                <Image
                  src={order?.user?.image || profilePicPlaceHolder}
                  alt='Profile picture'
                  width={40}
                  height={40}
                  className='w-10 rounded-full'
                />
                <div className='divider'></div>
                <div className='flex justify-between'>
                  <span>Name:</span>
                  <span>
                    {order?.user?.firstName + ' ' + order?.user?.lastName}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span>Email: </span>
                  <span>{order?.user?.email}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Phone Number: </span>
                  <span>{order?.user?.phone}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Role: </span>
                  <span>{order?.user?.role === 'WOLF' ? 'admin' : 'user'}</span>
                </div>

                <div className='divider'></div>
                <div className='flex justify-between'>
                  <span>Street:</span>
                  <span>
                    {order?.user?.Address[0]?.street +
                      ' ' +
                      order?.user?.Address[0]?.houseNumber}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span> City: </span>
                  <span>{order?.user?.Address[0]?.city}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Post Code:</span>
                  <span>{order?.user?.Address[0]?.postCode}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Country: </span>
                  <span>{order?.user?.Address[0]?.country}</span>
                </div>
              </div>
            </div>
            <div className='card w-1/3'>
              <div className='card-body rounded-md '>
                <div className='flex flex-col'>
                 
                  <div className='flex justify-between'>
                    <span>Order No: </span>
                    <span>{order?.orderNo}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Order Date: </span>
                    <span>{convertDate(order?.createdAt)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Order Status:</span>
                    <span>{order?.status}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Order Total: </span>
                    <span>{order?.total}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='card w-1/3'>
              <div >
                <table className='table table-zebra'>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.items.map((item) => (
                      <tr key={item.id + item.size}>
                        <td>{item.product.name}</td>
                        <td>{item.size}</td>
                        <td>{item.quantity}</td>
                        <td>{formatPrice(item.product.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* {order?.items.map((item) => (
                  <div
                    key={item.id + item.size}
                    className='flex justify-between'
                  >
                    <span>{item.product.name}</span>
                    <span>{item.size}</span>
                    <span>{item.quantity}</span>
                    <span>{formatPrice(item.product.price)}</span>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default dashboardOrders;
