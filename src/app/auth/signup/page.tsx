'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FormEventHandler } from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    verificationCode: '',
  });

  const [verificationCode, setverificationCode] = useState(false);

  const sendCode: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const response = await axios.post('/api/verificationCode', {
      email: userInfo.email,
      password: userInfo.password,
    });

    console.log('Response', response);

    if (response.data.status === 409) {
      toast.error(response.data.message);
    }

    if (response.data.status === 200) {
      toast.success(response.data.message);
      setverificationCode(true);
    }
  };

  const onVerificate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const response = await axios.post('/api/verificationCode/verify', {
      email: userInfo.email,
      verificationToken: userInfo.verificationCode,
    });

    console.log('Response', response);

    if (response.data.status === 409) {
      toast.error(response.data.message);
    }

    if (response.data.status === 400) {
      toast.error(response.data.message);
    }

    if (response.data.status === 200) {
      toast.success(response.data.message);
      window.location.replace('/auth/signIn');
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='flex h-[calc(100vh_-_328px)] w-2/3 items-center justify-center'>
        <div className='w-1/3 '>
          <h3 className='text-center text-lg font-bold'>Sign Up</h3>
          <div className='flex-col justify-normal'>
            <div className='mb-3 flex w-full flex-col'>
              {/* name */}
              <div className='w-full'>
                <label className='label'>
                  <span className='label-text text-coolGray-200'>Email</span>
                </label>
                <input
                  //   required
                  name='email'
                  type='email'
                  placeholder='Email'
                  onChange={({ target }) =>
                    setUserInfo({
                      ...userInfo,
                      email: target.value,
                    })
                  }
                  autoComplete='true'
                  className='peer input input-bordered mb-3 w-full bg-[rgb(30,35,42)]'
                />
              </div>

              {/* password */}
              <div className='w-full'>
                <label className='label'>
                  <span className='label-text text-coolGray-200'>Password</span>
                </label>
                <input
                  //   required
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={({ target }) =>
                    setUserInfo({
                      ...userInfo,
                      password: target.value,
                    })
                  }
                  autoComplete='true'
                  className='peer input input-bordered mb-3 w-full bg-[rgb(30,35,42)]'
                />
              </div>
            </div>

            {/* verification code */}
            <div className='w-full'>
              <label className='label'>
                <span className='label-text text-coolGray-200'>
                  Verification code
                </span>
              </label>

              <form onSubmit={sendCode} action='#'>
                <div className='form-control mb-3'>
                  <div className='input-group '>
                    <input
                      type='text'
                      placeholder='Verification code'
                      className='input input-bordered w-full bg-[rgb(30,35,42)]'
                      onChange={({ target }) =>
                        setUserInfo({
                          ...userInfo,
                          verificationCode: target.value,
                        })
                      }
                      autoComplete='true'
                    />

                    <button
                      className='btn border-sky-500 bg-sky-500 text-coolGray-100 hover:border-sky-700 hover:bg-sky-700
                      disabled:text-coolGray-400 '
                      type='submit'
                      disabled={
                        !userInfo.email ||
                        !userInfo.password ||
                        verificationCode
                      }
                    >
                      Send Code
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <Toaster toastOptions={{ duration: 4000 }} />
            <form onSubmit={onVerificate} action='#'>
              <div className='mb-3 flex flex-col gap-5'>
                <button
                  className={
                    verificationCode
                      ? 'btn border-sky-500 bg-sky-500 text-coolGray-100 hover:border-sky-700 hover:bg-sky-700 disabled:text-coolGray-400'
                      : 'hidden'
                  }
                  type='submit'
                  disabled={!userInfo.verificationCode}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className='mb-3 mt-3 flex items-center'>
              <hr className='w-1/2' /> <span className='ml-3 mr-3'> OR </span>{' '}
              <hr className='w-1/2' />
            </div>
            <button
              className='btn mb-3 w-full border border-slate-200 px-4 py-2 text-slate-700
                  transition duration-150 hover:border-slate-400 hover:text-slate-900 dark:border-slate-700
                  dark:bg-gray-800 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300'
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/',
                })
              }
            >
              <Image
                className='h-6 w-6'
                width={100}
                height={50}
                src='https://www.svgrepo.com/show/475656/google-color.svg'
                alt='google logo'
              />
              <span>Google</span>
            </button>
            <div className='flex justify-center'>
              <Link href={'/auth/signIn'}>Do you already have an account?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
