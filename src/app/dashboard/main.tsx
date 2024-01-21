'use client';

import { convertDate } from '@/lib/convertDate';
import { formatPrice } from '@/lib/format';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  type: string;
  sizes: {
    size: string;
    quantity: number;
    updatedAt: Date;
  }[];
}

interface User {
  id: number;
}

interface Order {
  id: number;
}

const Main = () => {
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [title, setTitle] = useState<String>('');
  const [productData, setProductData] = useState<Product[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [orderData, setOrderData] = useState<Order[]>([]);

  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAllOrders = async () => {
    setTitle('Orders');
    setIsLoading(true);

    const response = await axios.get('/api/orders/allOrders');

    setOrderData(response.data.orders as Order[]);
    console.log('Order response', response.data);
    setIsLoading(false);
  };

  const handleAllProducts = async () => {
    setTitle('All Products');
    setIsLoading(true);

    const response = await axios.get('/api/products');

    setProductData(response.data.products as Product[]);
    console.log(response.data);
    setIsLoading(false);
  };

  const handleAddProducts = async () => {
    setTitle('Add Products');
  };

  const handleAllUsers = async () => {
    setTitle('All Users');
    setIsLoading(true);

    const response = await axios.get('/api/users');
    setUserData(response.data.users as User[]);
    console.log(response.data);
    setIsLoading(false);
  };

  return (
    <div className='flex'>
      {/* menu left */}
      <div className='flex h-[calc(100vh-175px)] w-[135px] flex-col border-r-[1px] border-coolGray-500 pl-4'>
        {/* <h2 className='mb-3 underline underline-offset-2'>Menu</h2> */}
        <div
          onClick={handleAllOrders}
          className='cursor-pointer hover:underline'
        >
          <div className='text-sm'>All Orders</div>
        </div>
        <div
          onClick={handleAllProducts}
          className='cursor-pointer hover:underline'
        >
          <div className='text-sm'>All Products</div>
        </div>
        <div
          onClick={handleAllUsers}
          className='cursor-pointer hover:underline'
        >
          <div className='text-sm'>All Users</div>
        </div>
        <div
          onClick={handleAddProducts}
          className='cursor-pointer hover:underline'
        >
          <div className='text-sm'>Add Products</div>
        </div>
      </div>
      {/* main content */}

      <div className='w-[calc(100vw-180px)] flex-grow'>
        <div className='flex flex-col'>
          <div>
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <span className='loading loading-spinner loading-sm' />
              </div>
            ) : title === 'All Products' ? (
              <div className='ml-4 flex flex-row flex-wrap justify-start gap-2 '>
                <div className='overflow-x-auto'>
                  <table className='table table-zebra'>
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>XS</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                        <th>XXL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productData.map((product: any) => {
                        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
                        // Sort the sizes array for each product
                        const sortedSizes = product.sizes.sort(
                          (a: any, b: any) =>
                            sizeOrder.indexOf(a.size) -
                            sizeOrder.indexOf(b.size)
                        );

                        return (
                          <tr key={product.id}>
                            <Link
                              href={`dashboard/product/${product.id}`}
                              className='hover:text-coolGray-200'
                            >
                              <td>{product.id}</td>{' '}
                            </Link>
                            <td>{product.name}</td>
                            <td>{product.type}</td>
                            <td>{formatPrice(product.price)}</td>
                            <td>{product.stock}</td>
                            {sortedSizes.map((size: any) => (
                              <td key={size.size}>{size.quantity}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : title === 'All Users' ? (
              <div className='ml-4 flex flex-row flex-wrap justify-start gap-2 '>
                <div className='overflow-x-auto'>
                  <table className='table table-zebra'>
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Users</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Orders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((user: any) => (
                        <tr key={user.id}>
                          <td>
                            <Link
                              href={`/dashboard/user/${user.id}`}
                              className='hover:text-coolGray-200'
                            >
                              {user.id}
                            </Link>
                          </td>
                          <td>
                            {user.firstName === null
                              ? ' '
                              : user.firstName + ' '}
                            {user.lastName === null ? ' ' : user.lastName}
                          </td>
                          <td>{user.email}</td>
                          <td>{user.role === 'WOLF' ? 'Admin' : 'User'}</td>
                          {user.Orders.map((order: any) => (
                            <td
                              key={order.id}
                              className='flex hover:text-coolGray-200'
                            >
                              <Link href={`/dashboard/order/${order.orderNo}`}>
                                {order.orderNo}
                              </Link>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : title === 'Orders' ? (
              <div className='ml-4 flex flex-row flex-wrap justify-start gap-2 '>
                <div className='overflow-x-auto'>
                  {orderData.length === 0 ? (
                    <div className='flex items-center justify-center'>
                      <span className='text'>No orders yet...</span>
                    </div>
                  ) : (
                    <table className='table table-zebra'>
                      {/* head */}
                      <thead>
                        <tr>
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
                          <tr key={order.id}>
                            <td className='hover:text-coolGray-200'>
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
            ) : title === 'Add Products' ? (
              <div className='ml-4 flex flex-row flex-wrap justify-start gap-2 '>
                <div className='overflow-x-auto'>
                  <table className='table table-zebra'>
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Products</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>XS</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                        <th>XXL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productData.map((product: any) => (
                        <tr key={product.id}>
                          <td>
                            <Link
                              href={`dashboard/product/${product.id}`}
                              className='hover:text-coolGray-200'
                            >
                              {product.id}
                            </Link>
                          </td>
                          <td>{product.name}</td>
                          <td>{product.type}</td>
                          <td>{formatPrice(product.price)}</td>
                          <td>{product.stock}</td>
                          {product.sizes.map((size: any) => (
                            <td key={size.size}>{size.quantity}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
