import { env } from '@/lib/env';

import { createMollieClient } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: env.MOLLIE_API_KEY });

(async () => {
  try {
    const payment = await mollieClient.payments.get('tr_Eq8xzWUPA4');

    // Check if payment is paid
    // const isPaid = payment.isPaid();

    if (payment.status === 'paid') {
      console.log('Payment is paid');
    } else {
      console.log(`Payment is not paid, but instead it is: ${payment.status}`);
    }
  } catch (error) {
    console.warn(error);
  }
})();
