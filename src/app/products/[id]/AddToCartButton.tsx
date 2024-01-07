'use client';

import { useState, useTransition } from "react";
import { incrementProductQuantity } from "./actions";


interface AddToCartButtonProps {
  productId: string;
  selectedSize: string;
  incrementProductQuantity: (productId: string, selectedSize:string ) => Promise<void>;
}

// Add to cart button component
const AddToCartButton = ({ productId, selectedSize }: AddToCartButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    // console.log('selected size in add to cart button', selectedSize);
  return (
    <div className={`flex flex-col  items-start gap-2 ${!selectedSize ? 'cursor-not-allowed' : ''}`}>
      <button className={`w-[160px] btn bg-sky-600 hover:bg-sky-700 text-coolGray-200`}
      disabled={!selectedSize || isPending}
      onClick={() => {
            setSuccess(false);
            startTransition(async() => { 
                await incrementProductQuantity(productId, selectedSize);
                setSuccess(true);
            })
      }}>
        {isPending ? <span className="loading loading-spinner loading-md bg-sky-600" /> : "Add To Cart"}
        {!isPending ? <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg> : ""}
        
        
      </button>
      {!isPending && success && <span className="text-success ml-1">Added to Cart!</span>}
    </div>
  );
};

export default AddToCartButton;
