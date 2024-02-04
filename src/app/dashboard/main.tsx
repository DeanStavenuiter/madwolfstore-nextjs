'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import AddProducts from './addProducts';
import AllOrders from './allOrders';
import AllUsers from './allUsers';
import AllProducts from './allProducts';

export interface Product {
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
  };
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  Orders: {
    id: number;
    orderNo: number;
  };
}

export interface Order {
  id: number;
  orderNo: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  total: number;
  status: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
  length: number;
}

const Main = () => {
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [title, setTitle] = useState<String>('');
  const [productData, setProductData] = useState<Product[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [orderData, setOrderData] = useState<Order[]>([]);

  useEffect(() => {
    handleAllOrders();
  }, []);

  const handleAllOrders = async () => {
    setTitle('Orders');
    setIsLoading(true);

    const response = await axios.get('/api/orders/allOrders');

    setOrderData(response.data.orders as Order[]);
    // console.log('Order response', response.data);
    setIsLoading(false);
  };

  const handleAllProducts = async () => {
    setTitle('All Products');
    setIsLoading(true);

    const response = await axios.get('/api/products');

    setProductData(response.data.products as Product[]);
    // console.log(response.data);
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
    // console.log(response.data);
    setIsLoading(false);
  };

  return (
    <div className='flex'>
      {/* menu left */}
      <div className='flex h-[calc(100vh-175px)] w-[135px] flex-col border-r-[1px] border-[rgb(38,38,40)] pl-4'>
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
              <AllProducts productData={productData} />
            ) : title === 'All Users' ? (
              <AllUsers userData={userData} />
            ) : title === 'Orders' ? (
              <AllOrders orderData={orderData} />
            ) : title === 'Add Products' ? (
              <AddProducts />
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
