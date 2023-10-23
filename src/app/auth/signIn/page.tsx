'use client';

import { signIn } from 'next-auth/react';
import { FormEventHandler } from 'react';
import { useState } from 'react';

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  // console.log('email', email, 'password', password)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    console.log('CLICKED');
    e.preventDefault();
    console.log(
      'OnSUBMIT',
      'email',
      userInfo.email,
      'password',
      userInfo.password
    );

    const result = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: true,
      callbackUrl: '/',
    });

    console.log('result', result);
  };

  return (
    <>
      <div className='flex h-[calc(100vh_-_328px)] items-center justify-center'>
        <div className='w-1/3 '>
          <h3 className='text-center text-lg font-bold'>Sign In!</h3>
          <div className='flex-col justify-normal'>
            <form onSubmit={onSubmit} action="#">
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
              <div className='flex flex-col gap-5'>
                <button
                  className='btn btn-primary'
                  // onClick={(event) => onSubmit}
                  type='submit'
                >
                  Sign In
                </button>
                <button>Don&apos;t have an account yet?</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
