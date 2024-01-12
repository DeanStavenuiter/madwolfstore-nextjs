'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { countries } from '@/lib/countries';

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  // const session = await getServerSession(authOptions);

  // if (session) {
  //   const id = session.user.id;

  //   if (id) {
  //     const user = await getUserWithAddress();

  //     console.log('address', user?.Address);
  //   }
  // }

  useEffect(() => {
    const getData = async () => {
      const accountData = '/api/account';
      const ordersData = '/api/orders';

      const fetchURL = (url: string) => axios.get(url);

      const promiseArray = [accountData, ordersData].map(fetchURL);

      const response = await Promise.all(promiseArray);

      console.log('response', response);

      console.log('response user info', response[0].data.street, response[0].data.houseNumber);

      setFormData((prevData) => ({
        ...prevData,
        userId: response[0].data.id,
        firstName: response[0].data.firstName,
        lastName: response[0].data.lastName,
        email: response[0].data.email,
        address: response[0].data.street + response[0].data.houseNumber,
        postCode: response[0].data.postCode,
        city: response[0].data.city,
        country: response[0].data.country,
      }));

      setOrders(response[1].data);

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
  // const HandleSubmit = async(event) => {

  //     event.preventDefault();
  // }

  return (
    <>
      <div className='flex gap-4'>
        <div className='flex flex-col gap-4 sm:w-2/3 '>
          <div className='form-control rounded-md bg-neutral p-4'>
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
            <div>
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
          <div className='form-control rounded-md bg-neutral p-4'>
            <h1 className='text-xl font-bold'>
              Where would you like your order to be delivered?
            </h1>
            <div className='divider'></div>
            <div className='flex flex-col gap-4 sm:flex-row'>
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
          <div>
            <button className='btn btn-primary'>Save</button>
          </div>
        </div>
        <div className='w-1/3 rounded-md bg-neutral p-4'>
          <h1 className='text-xl font-bold'>Orders</h1>
          <div className='divider' />
          <div className='collapse collapse-arrow bg-neutral'>
            {!isLoading && orders && orders.length > 0 ? (
              orders.map((order: any) => (
                <div key={order.id}>
                  <input
                    type='radio'
                    name='my-accordion'
                    id={`order-radio-${order.id}`}
                  />
                  <label
                    className='collapse-title text-xl font-medium'
                    htmlFor={`order-radio-${order.id}`}
                  >
                    {order.id}
                  </label>
                  <div className='collapse-content'>
                    <p>hello</p>
                    {/* Add logic to display order details or items here */}
                  </div>
                </div>
                
              ))
            ) : (
              <div>You did not make any orders yet.</div>
            )}

            
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
