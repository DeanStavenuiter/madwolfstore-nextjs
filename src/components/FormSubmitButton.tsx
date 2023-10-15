'use client';

import React, { ComponentProps } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<'button'>;

const FormSubmitButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  const { pending, data } = useFormStatus();

  console.log("data", data);
  return (
    <button
      {...props}
      className={`btn btn-primary ${className} `}
      type='submit'
      aria-disabled={pending}
    >
      {pending && <span className='loading loading-spinner' />}
      {children}
    </button>
  );
};

export default FormSubmitButton;
