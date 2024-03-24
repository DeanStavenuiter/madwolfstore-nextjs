import { headers } from 'next/headers';

export const getIPAddress = async () => {
  const FALLBACK_IP_ADDRESS = '0.0.0.0';
  const realIp = headers().get('x-real-ip');
  const forwardedFor = headers().get('x-forwarded-for');
  console.log('Forwarded for: ', forwardedFor);
  console.log('Real IP: ', realIp);

  //   if (realIp) {
  //     return realIp.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  //   }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
};
