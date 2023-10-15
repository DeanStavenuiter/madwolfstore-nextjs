// We use this function to format the price 
export function formatPrice(price: number) {

  return (price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR',
  });

}
