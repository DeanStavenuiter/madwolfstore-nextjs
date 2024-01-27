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
    <div className='flex justify-center'>
      <button
        className='btn btn-primary w-1/2'
        onClick={handlePayment}
        disabled={isLoading || subtotal === 0 || !paymentMethod}
      >
        {isLoading ? (
          <span className='loading loading-spinner loading-sm bg-primary' />
        ) : (
          'Place your order'
        )}
      </button>
    </div>
  );
};

export default PayNowButton;
