'use client';

import axios from 'axios';
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
    <>
      <div className='flex h-[calc(100vh_-_328px)] items-center justify-center'>
        <div className='w-1/3 '>
          <h3 className='text-center text-lg font-bold'>Sign Up</h3>
          <div className='flex-col justify-normal'>
            <div className='mb-3 flex w-full flex-col'>
              {/* name */}
              <div className='w-full'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  //   required
                  name='email'
                  type='email'
                  onChange={({ target }) =>
                    setUserInfo({
                      ...userInfo,
                      email: target.value,
                    })
                  }
                  autoComplete='true'
                  className='peer input input-bordered mb-3 w-full'
                />
              </div>

              {/* password */}
              <div className='w-full'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  //   required
                  type='password'
                  name='password'
                  onChange={({ target }) =>
                    setUserInfo({
                      ...userInfo,
                      password: target.value,
                    })
                  }
                  autoComplete='true'
                  className='peer input input-bordered mb-3 w-full'
                />
              </div>
            </div>

            {/* verification code */}
            <div className='w-full'>
              <label className='label'>
                <span className='label-text'>Verification code</span>
              </label>

              <form onSubmit={sendCode} action='#'>
                <div className='form-control mb-3'>
                  <div className='input-group '>
                    <input
                      type='text'
                      className='input input-bordered w-full'
                      onChange={({ target }) =>
                        setUserInfo({
                          ...userInfo,
                          verificationCode: target.value,
                        })
                      }
                      autoComplete='true'
                    />

                    <button className='btn btn-primary' type='submit'>
                      Send Code
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <Toaster toastOptions={{ duration: 4000 }} />
            <form onSubmit={onVerificate} action='#'>
              <div className='mb-3 flex flex-col gap-5'>
                <button className='btn btn-primary' type='submit'>
                  Sign Up
                </button>
              </div>
            </form>
            <div className='flex justify-center'>
              <Link href={'/auth/signIn'}>Do you already have an account?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
