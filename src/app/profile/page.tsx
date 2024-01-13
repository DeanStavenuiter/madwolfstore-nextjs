'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { countries } from '@/lib/countries';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const accountData = '/api/account';
      const ordersData = '/api/orders';

      const fetchURL = (url: string) => axios.get(url);

      const promiseArray = [accountData, ordersData].map(fetchURL);

      const response = await Promise.all(promiseArray);

      // console.log('response', response[1].data);

      const orderArray = response[1].data.ordersWithItems;

      console.log('order', orderArray);

      // console.log('response user info', response[0].data.street, response[0].data.houseNumber);

      setFormData((prevData) => ({
        ...prevData,
        userId: response[0].data.id,
        firstName: response[0].data.firstName,
        lastName: response[0].data.lastName,
        email: response[0].data.email,
        address: response[0].data.street + " " + response[0].data.houseNumber,
        postCode: response[0].data.postCode,
        city: response[0].data.city,
        country: response[0].data.country,
      }));

      setOrders(orderArray);

      setIsLoading(false);
    };

    getData();
  }, []);

  const [formData, setFormData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postCode: '',
    city: '',
    country: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postCode: '',
    city: '',
    country: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { name, value } = e.target;

    if (name === 'email') {
      if (value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: '',
        }));
      } else {
        const isValidEmail = emailRegex.test(value);

        setErrors((prevErrors) => ({
          ...prevErrors,
          email: isValidEmail ? '' : 'Please enter a valid email address',
        }));
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const HandleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);
    setMessage('');

    const response = await axios.put('/api/account', {
      formData: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        postCode: formData.postCode,
        city: formData.city,
        country: formData.country,
      },
    });

    setMessage(response.data.message);
    setIsLoading(false);
  };

  return (
    <>
      <div className='flex gap-4 '>
        <div className='flex flex-col gap-4 sm:w-2/3 '>
          <div className='bg-neutral form-control rounded-md p-4'>
            <h1 className='text-xl font-bold'>Fill in your details</h1>
            <div className='divider'></div>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <div className='w-full'>
                {/* first name input */}
                <label className='label'>
                  <span className='label-text'>First name</span>
                </label>
                <input
                  type='text'
                  placeholder='Your first name'
                  className={`input input-bordered w-full ${
                    errors.firstName ? 'focus:border-red-500' : ''
                  }`}
                  onChange={handleChange}
                  name='firstName'
                  value={formData.firstName}
                />
                {/* error message */}
                {errors.firstName ? (
                  <p className='ml-1 mt-2 text-xs text-red-500'>
                    {errors.firstName}
                  </p>
                ) : (
                  ''
                )}
              </div>
              <div className='w-full'>
                {/* last name input */}
                <label className='label'>
                  <span className='label-text'>Last name</span>
                </label>
                <input
                  type='text'
                  placeholder='Your last name'
                  className={`input input-bordered w-full ${
                    errors.lastName ? 'focus:border-red-500' : ''
                  }`}
                  onChange={handleChange}
                  name='lastName'
                  value={formData.lastName}
                />
                {/* error message */}
                {errors.lastName ? (
                  <p className='ml-1 mt-2 text-xs text-red-500'>
                    {errors.lastName}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className='w-1/2'>
              {/* email */}
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='text'
                placeholder='Your email'
                className={`input input-bordered w-full ${
                  errors.email ? 'focus:border-red-500' : ''
                }`}
                onChange={handleChange}
                name='email'
                value={formData.email}
              />
              {/* error message */}
              {errors.email ? (
                <p className='ml-1 mt-2 text-xs text-red-500'>{errors.email}</p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className='bg-neutral form-control rounded-md p-4 '>
            <h1 className='text-xl font-bold'>
              Where would you like your order to be delivered?
            </h1>
            <div className='divider'></div>
            <div className='flex flex-col gap-4 sm:flex-row '>
              {/* address */}
              <div className='sm:w-3/4'>
                <label className='label'>
                  <span className='label-text'>
                    Street name and house number
                  </span>
                </label>
                <input
                  type='text'
                  placeholder='Your address'
                  className={`input input-bordered w-full ${
                    errors.address ? 'focus:border-red-500' : ''
                  }`}
                  onChange={handleChange}
                  name='address'
                  value={formData.address}
                />
                {/* error message */}
                {errors.address ? (
                  <p className='ml-1 mt-2 text-xs text-red-500'>
                    {errors.address}
                  </p>
                ) : (
                  ''
                )}
              </div>

              {/* post code */}
              <div className='sm:w-1/4'>
                <label className='label'>
                  <span className='label-text'>Post code</span>
                </label>
                <input
                  type='text'
                  placeholder='Your post code'
                  className={`input input-bordered w-full ${
                    errors.postCode ? 'focus:border-red-500' : ''
                  }`}
                  onChange={handleChange}
                  name='postCode'
                  value={formData.postCode}
                />
                {/* error message */}
                {errors.postCode ? (
                  <p className='ml-1 mt-2 text-xs text-red-500'>
                    {errors.postCode}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className='flex flex-col gap-4 sm:flex-row'>
              {/* city */}
              <div className='sm:w-3/4'>
                <label className='label'>
                  <span className='label-text'>City</span>
                </label>
                <input
                  type='text'
                  placeholder='Your city'
                  className={`input input-bordered w-full ${
                    errors.city ? 'focus:border-red-500' : ''
                  }`}
                  onChange={handleChange}
                  name='city'
                  value={formData.city}
                />
                {/* error message */}
                {errors.city ? (
                  <p className='ml-1 mt-2 text-xs text-red-500'>
                    {errors.city}
                  </p>
                ) : (
                  ''
                )}
              </div>

              {/* country */}
              <div className='sm:w-1/4'>
                <label className='label'>
                  <span className='label-text'>Country</span>
                </label>
                <select
                  name='country'
                  value={formData.country}
                  onChange={handleChange}
                  className={`select select-bordered w-full ${
                    errors.country ? 'focus:border-red-500' : ''
                  }`}
                >
                  <option value='' disabled>
                    Select your country
                  </option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {/* error message */}
                {errors.country ? (
                  <p className='ml-1 mt-2 text-xs text-red-500'>
                    {errors.country}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          {message && (
            <div className='ml-4 flex-1 text-success'>
              <label>{message}</label>
            </div>
          )}
          <div>
            <button
              className='btn ml-4 w-[150px] bg-sky-600 text-coolGray-200 hover:bg-sky-700'
              onClick={HandleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='loading loading-spinner loading-md bg-sky-600' />
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
        <div className='bg-neutral w-1/3 rounded-md p-4'>
          <h1 className='text-xl font-bold'>Orders</h1>
          <div className='divider' />
          {isLoading ? (
            <div className='flex justify-center'>
              <span className='loading loading-lg' />
            </div>
          ) : orders && orders.length > 0 ? (
            orders.map((order: any) => (
              <div
                key={order.orderNo}
                className='bg-neutral collapse collapse-arrow mb-1'
              >
                <div className='collapse collapse-arrow bg-base-200'>
                  <input
                    type='radio'
                    name='my-accordion-2'
                    checked={order === selectedOrder}
                    onChange={() => setSelectedOrder(order)}
                  />
                  <div className='collapse-title flex flex-col text-xl font-medium'>
                    <span className='text-sm'>Order No: {order.orderNo}</span>
                  </div>
                  <div className='collapse-content'>
                    <div className='divider mt-0' />
                    <span className='text-sm'>
                      Product{order.items.length > 1 ? 's' : ''}:{' '}
                    </span>

                    {order.items.map((item: any) => (
                      <div
                        key={item.product.name + item.size + order.orderNo}
                        className='flex flex-col gap-4 sm:flex-row'
                      >
                        <div className='w-1/4'>
                          <video
                            src={item.product.imageUrl1}
                            height={100}
                            width={50}
                          />
                        </div>
                        <div className='flex w-3/4 flex-col justify-center'>
                          <div className='flex  pr-2 text-sm'>
                            <span className='w-1/2'>Name:</span>
                            <span className='w-1/2'>{item.product.name}</span>
                          </div>
                          <div className='flex  pr-2 text-sm'>
                            <span className='w-1/2'>Quantity:</span>
                            <span className='w-1/2'>{item.quantity}</span>
                          </div>
                          <div className='flex  pr-2 text-sm'>
                            <span className='w-1/2'>Size:</span>
                            <span className='w-1/2'>{item.size}</span>
                          </div>
                          <div className='flex  pr-2 text-sm'>
                            <span className='w-1/2'>Price:</span>
                            <span className='w-1/2'>{formatPrice(item.product.price)}</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className='divider' />
                    <div className='flex justify-between text-sm'>
                      <span className='w-1/2'>Total: </span>
                      <span className='w-1/2 text-end'>{order.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>You did not make any orders yet.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
