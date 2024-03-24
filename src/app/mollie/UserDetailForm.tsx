'use client';

import { useEffect, useState } from 'react';
import ListPaymentMethods from './ListPaymentMethods';
import PayNowButton from './PayNowButton';
import { countries } from '@/lib/countries';
import axios from 'axios';
import useDevice from '@/components/UseDevice';

const UserDetailForm = ({totalPrice, email}: any) => {
  const [userEmail, setUserEmail] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const device = useDevice();

  // console.log("totalPrice", totalPrice)
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get('/api/account');

      console.log('response user info', response);

      setFormData((prevData) => ({
        ...prevData,
        userId: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        address: response.data.street + ' ' + response.data.houseNumber,
        postCode: response.data.postCode,
        city: response.data.city,
        country: response.data.country,
      }));
    };

    getUserInfo();
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

  const isFormValid = () => {
    // Check if all required fields are filled in
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'address',
      'postCode',
      'city',
      'country',
    ];

    const newErrors = requiredFields.reduce(
      (acc, field) => {
        acc[field] = (formData as any)[field] === '' ? 'Required' : '';
        return acc;
      },
      {} as Record<string, string>
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));

    console.log('newErrors', newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  return (
    <>
      <div className='flex flex-col gap-4 sm:w-2/3 '>
        <div className='form-control rounded-md bg-neutral p-4'>
          <h1 className='text-xl font-bold'>Fill in your details</h1>
          <div className='divider'></div>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <div className='w-full'>
              {/* first name input */}
              <label className='label'>
                <span className='label-text text-coolGray-200'>First name</span>
              </label>
              <input
                type='text'
                placeholder='Your first name'
                className={`input input-bordered w-full border-coolGray-600 bg-[rgb(30,35,42)] ${
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
                <span className='label-text text-coolGray-200'>Last name</span>
              </label>
              <input
                type='text'
                placeholder='Your last name'
                className={`input input-bordered w-full border-coolGray-600 bg-[rgb(30,35,42)]${
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
              <span className='label-text text-coolGray-200'>Email</span>
            </label>
            <input
              type='text'
              placeholder='Your email'
              className={`input input-bordered w-full border-coolGray-600 bg-[rgb(30,35,42)] ${
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
                <span className='label-text text-coolGray-200'>Street name and house number</span>
              </label>
              <input
                type='text'
                placeholder='Your address'
                className={`input input-bordered w-full border-coolGray-600 bg-[rgb(30,35,42)] ${
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
                <span className='label-text text-coolGray-200'>Post code</span>
              </label>
              <input
                type='text'
                placeholder='Your post code'
                className={`input input-bordered w-full border-coolGray-600 bg-[rgb(30,35,42)] ${
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
                <span className='label-text text-coolGray-200'>City</span>
              </label>
              <input
                type='text'
                placeholder='Your city'
                className={`input input-bordered w-full border-coolGray-600 bg-[rgb(30,35,42)] ${
                  errors.city ? 'focus:border-red-500' : ''
                }`}
                onChange={handleChange}
                name='city'
                value={formData.city}
              />
              {/* error message */}
              {errors.city ? (
                <p className='ml-1 mt-2 text-xs text-red-500'>{errors.city}</p>
              ) : (
                ''
              )}
            </div>

            {/* country */}
            <div className='sm:w-1/4'>
              <label className='label'>
                <span className='label-text text-coolGray-200'>Country</span>
              </label>
              <select
                name='country'
                value={formData.country}
                onChange={handleChange}
                className={`select select-bordered w-full border-coolGray-600 bg-[rgb(30,35,42)] ${
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
        <ListPaymentMethods onValueChange={handlePaymentMethodChange} />
        <PayNowButton
          subtotal={totalPrice}
          paymentMethod={selectedPaymentMethod}
          isFormValid={isFormValid}
          formData={formData}
          userWithAddress={formData}
        />
      </div>
    </>
  );
};

export default UserDetailForm;
