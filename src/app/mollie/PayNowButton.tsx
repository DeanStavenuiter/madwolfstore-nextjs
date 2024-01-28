'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PayNowButtonProps {
  subtotal: number;
  paymentMethod: string;
  formData: Object;
  isFormValid: () => boolean;
  userWithAddress: Object;
}

export const PayNowButton: React.FC<PayNowButtonProps> = ({
  subtotal,
  paymentMethod,
  formData,
  isFormValid,
  userWithAddress,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   // console.log('payment method: ', paymentMethod);
  // }, [paymentMethod]);

  const handlePayment = async () => {
    if (isFormValid()) {
      setIsLoading(true);
      const responseProfile = await axios.put('/api/account', {
        formData: formData,
        userWithAddress: userWithAddress,
      });

      // console.log('responseProfile', responseProfile);

      const response = await axios.post('/api/mollie', {
        subtotal: subtotal,
        method: paymentMethod,
        formData: formData,
        userWithAddress: userWithAddress,
        // redirectUrl: 'http://localhost:3000/checkout/success',
      });

      if (response.data.status === 201) {
        router.push(response.data.payment._links.checkout.href);
      }

      if (response.data.status === 500) {
        console.log('Something went wrong, please try again or contact us!');
      }

      if (response.data.status === 'canceled') {
        router.push('/checkout');
      }

      // console.log(response.data);
      setIsLoading(false);
    }
  };

  console.log('subtotal', subtotal);

  return (
    <div className='flex pl-4 pr-4 sm:justify-center sm:pl-0 sm:pr-0'>
      <button
        className='btn w-full border-none bg-sky-500 pl-4 pr-4 text-coolGray-100 hover:bg-sky-700 sm:w-1/2 sm:pl-0 sm:pr-0
        disabled:text-coolGray-400 disabled:bg-[rgb(30,35,42)]'
        onClick={handlePayment}
        disabled={isLoading || subtotal === 0 || !paymentMethod}
      >
        {isLoading ? (
          <span className='loading loading-spinner loading-sm bg-sky-500' />
        ) : !paymentMethod ? (
          
          'select a payment method'
        ) : (
          
          'Place your order'
        )}
      </button>
    </div>
  );
};

export default PayNowButton;
