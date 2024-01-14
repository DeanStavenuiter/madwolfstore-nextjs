'use client';

import axios from 'axios';
import { useState } from 'react';

const Menu = () => {
  const [title, setTitle] = useState('');

  const handleAllOrders = () => {
    setTitle('Orders');
  };

  const handleAllProducts = async() => {
    setTitle('All Products');

    const response = await axios.get('/api/products');

    console.log(response.data);
  };

  const handleAddProducts = () => {
    setTitle('Add Products');
  };

  const handleAllUsers = () => {
    setTitle('All Users');
  };
  return (
    <div className='flex'>
      {/* menu left */}
      <div className='flex h-[calc(100vh-175px)] w-[135px] flex-col border-r-2 pl-4'>
        {/* <h2 className='mb-3 underline underline-offset-2'>Menu</h2> */}
        <div
          onClick={handleAllOrders}
          className='cursor-pointer hover:underline'
        >
          <span>All Orders</span>
        </div>
        <div
          onClick={handleAllProducts}
          className='cursor-pointer hover:underline'
        >
          <span>All Products</span>
        </div>
        <div
          onClick={handleAllUsers}
          className='cursor-pointer hover:underline'
        >
          <span>All Users</span>
        </div>
        <div
          onClick={handleAddProducts}
          className='cursor-pointer hover:underline'
        >
          <span>Add Products</span>
        </div>
      </div>
      {/* main content */}

      <div className='flex-grow'>
        <h1 className='text-2xl ml-4'>{title}</h1>
        <div className='flex flex-col items-center'>
          <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {/* {(currentPage === 1 ? products : products).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
