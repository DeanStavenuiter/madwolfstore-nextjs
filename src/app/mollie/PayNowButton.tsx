'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  const router = useRouter();

  useEffect(() => {
    console.log('payment method: ', paymentMethod);
  }, [paymentMethod]);

  const handlePayment = async () => {
    if (isFormValid()) {

      const responseProfile = await axios.put('/api/account', {
        formData: formData,
        userWithAddress: userWithAddress,
      });  

      console.log('responseProfile', responseProfile);

      const response = await axios.post('/api/mollie', {
        subtotal: subtotal,
        method: paymentMethod,
        formData: formData,
        userWithAddress: userWithAddress,
        redirectUrl: 'http://localhost:3000/checkout/success',
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

      console.log(response.data);
    }
  };

  return (
    <button
      className='btn btn-primary'
      onClick={handlePayment}
      disabled={!paymentMethod}
    >
      Place your order
    </button>
  );
};

export default PayNowButton;
