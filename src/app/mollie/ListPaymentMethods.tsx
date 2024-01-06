'use client';

import axios from 'axios';
import { on } from 'events';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

interface ListPaymentMethodsProps {
  onValueChange: (method: string) => void;
}

const ListPaymentMethods: React.FC<ListPaymentMethodsProps> = ({
  onValueChange,
}) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentIssuers, setPaymentIssuers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get('/api/mollie');

        if (response.data) {
          setPaymentMethods(response.data.methods);
          setPaymentIssuers(response.data.issuers);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleSelectPaymentMethod = (e: any) => {
    setSelectedPaymentMethod(e.target.value);
    onValueChange(e.target.value);
  };

  useEffect(() => {
    console.log('selectedPaymentMethod', selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  return (
    <>
      <div className='rounded-md bg-neutral p-4'>
        <h1 className='text-xl font-bold'>Select your payment method</h1>
        <div className='divider'></div>
        {isLoading ? (
          <div className='flex justify-center'>
            <span className='loading loading-dots loading-xs'></span>
          </div>
        ) : (
          <div className='flex flex-wrap gap-1'>
            {paymentMethods.map((method: any) => (
              <div
                key={method.id}
                className='card w-[calc(50%-0.25rem)] flex-row justify-between rounded-md bg-neutral p-4 border bordered'
              >
                <div className='flex gap-4 items-center'>
                  <input
                    type='radio'
                    name='radio-1'
                    className='radio-primary radio-sm'
                    value={method.id}
                    onChange={handleSelectPaymentMethod}
                  />
                  <p>{method.description}</p>
                </div>

                {method.id === 'ideal' && (
                  <select
                    className='select select-bordered select-sm ml-1 mr-1 w-1/2'
                    aria-label='Select your bank'
                  >
                    {paymentIssuers.map((issuer: any) => (
                      <option key={issuer.id} value={issuer.id}>
                        {issuer.name}
                      </option>
                    ))}
                  </select>
                )}
                <Image
                  src={method.image.svg}
                  alt={method.description}
                  width={32}
                  height={24}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ListPaymentMethods;
