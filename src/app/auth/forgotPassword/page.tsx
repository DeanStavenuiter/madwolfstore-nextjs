'use client';

import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {

  const [formData, setformData] = useState({
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    toast.loading('Searching for your email...', {
      duration: 1000,
    });

    const response = (await axios.post(
      '/api/auth/forgotpassword',
      formData
    )) as any;

    if (response) {
      toast.success(response.data.message, {
        duration: 4000,
      });
    } else {
      toast.error('Something went wrong', {
        duration: 4000,
      });
    }

    setIsLoading(false);
  };

  return (
    <div className='flex justify-center'>
      <Toaster />
      <div className='mt-[100px] flex h-[calc(100vh_-_328px)] w-2/3 items-start justify-center'>
        <div className='w-1/3'>
          <h3 className='text-center text-lg font-bold'>
            Please fill in your email
          </h3>
          {/* email */}
          <form>
            <div className='w-full'>
              <label className='label'>
                <span className='text-coolGray-200 label-text'>Email</span>
              </label>
              <input
                required
                name='email'
                type='email'
                placeholder='Email'
                autoComplete='true'
                onChange={handleChange}
                className='peer input input-bordered mb-3 w-full bg-[rgb(30,35,42)]'
              />
            </div>

            <div className='flex flex-col gap-5'>
              <button
                className='text-coolGray-100 btn border-none bg-sky-500 text-white hover:bg-sky-700'
                type='submit'
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <div className='flex items-center gap-2'>
                    <span className='loading loading-spinner loading-sm text-white'></span>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Send link'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
