'use client';
import { FormSubmitButtonProps } from '@/components/FormSubmitButton';

const CheckOutButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  return (
    <button {...props} className='btn sm:w-[200px]'>
      {children}
    </button>
  );
};

export default CheckOutButton;
