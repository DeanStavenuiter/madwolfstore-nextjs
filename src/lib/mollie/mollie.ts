// utils/mollie.ts
import { env } from '@/lib/env';
import { PaymentMethod, createMollieClient } from '@mollie/api-client';

const mollie = createMollieClient({ apiKey: env.MOLLIE_API_KEY });

export const initiatePayment = async () => {
  try {
    const payment = await mollie.payments.create({
      amount: {
        currency: 'EUR',
        value: '10.00',
      },
      description: 'This is a test',
      redirectUrl: 'https://example.com/success',
      webhookUrl: 'https://example.com/cart/api/route',
      method: PaymentMethod.ideal,
    });
    console.log(payment);
    // return payment._links.checkout.href;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the payment.');
  }
};
