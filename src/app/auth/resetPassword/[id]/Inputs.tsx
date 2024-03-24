'use client';
import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const InputsResetPassword = () => {
  const [formData, setformData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const response = (await axios.post(
      '/api/auth/resetPassword',
      formData
    )) as any;

    toast.loading('Searching for your email...', {
      duration: 2000,
    });

    const timeOut = setTimeout(() => {
      toast.success(response.data.message, {
        duration: 4000,
      });
    }, 2000);

    return () => clearTimeout(timeOut);
  };
  return (
    <form>
      <Toaster />
      <div className='w-full'>
        <label className='label'>
          <span className='text-coolGray-200 label-text'>New Password</span>
        </label>
        <input
          required
          name='newPassword'
          type='password'
          onChange={handleChange}
          className='peer input input-bordered mb-3 w-full bg-[rgb(30,35,42)]'
        />
      </div>

      <div className='w-full'>
        <label className='label'>
          <span className='text-coolGray-200 label-text'>Confirm Password</span>
        </label>
        <input
          required
          name='Password'
          type='password'
          onChange={handleChange}
          className='peer input input-bordered mb-3 w-full bg-[rgb(30,35,42)]'
        />
      </div>

      <div className='flex flex-col gap-5'>
        <button
          className='text-coolGray-100 btn border-none bg-sky-500 text-white hover:bg-sky-700'
          type='submit'
          onClick={handleSubmit}
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default InputsResetPassword;
