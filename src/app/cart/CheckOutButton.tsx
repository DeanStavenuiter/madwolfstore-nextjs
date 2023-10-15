'use client';
import { FormSubmitButtonProps } from '@/components/FormSubmitButton';

const CheckOutButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  return (
    <button {...props} className='btn btn-primary sm:w-[200px]'>
      {children}
    </button>
  );
};

export default CheckOutButton;
