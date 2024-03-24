import React from 'react'
import { Toaster } from 'react-hot-toast'
import InputsResetPassword from './Inputs';

const resetPassword = () => {

  return (
    <div className='flex justify-center'>
    <Toaster />
    <div className='mt-[100px] flex h-[calc(100vh_-_328px)] w-2/3 items-start justify-center'>
      <div className='w-1/3'>
        <h3 className='text-center text-lg font-bold'>
          Please fill in your new password
        </h3>
        <InputsResetPassword />
      </div>
    </div>
  </div>
  )
}

export default resetPassword