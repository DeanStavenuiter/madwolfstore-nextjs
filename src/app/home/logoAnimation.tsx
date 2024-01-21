'use client';

import { useEffect, useState } from 'react';

const LogoAnimation = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [setshowButton, setSetshowButton] = useState(false);

  const handleClick = () => {
    const screenHeight = window.innerHeight;
    const pixelsToScroll = screenHeight;

    window.scrollTo({
      top: pixelsToScroll,
      behavior: 'smooth',
    });

    setTimeout(() => {
      setButtonClicked(true);
    }, 1000);

    // clearTimeout();
  };

  setTimeout(() => {
    setSetshowButton(true);
  }, 1300);

  // const handleScroll = () => {
  //   // Get the current scroll position
  //   const scrollY = window.scrollY;

  //   // Get the total height of the document
  //   const screenHeight = window.innerHeight;

  //   // Check if the user has scrolled by the height of the document
  //   if (scrollY >= screenHeight) {
  //     setTimeout(() => {
  //       setButtonClicked(true);
  //     }, 1000);
  //   }
  // };

  // useEffect(() => {
  //   // Attach the scroll event listener when the component mounts
  //   window.addEventListener('scroll', handleScroll);

  //   // Remove the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className={`${buttonClicked ? 'hidden' : ''} h-screen `}>
      <div className='grid h-[calc(100%-10rem)] place-items-center'>
        <div className='animate-logoAnimation flex items-center justify-center'>
          <video
            autoPlay
            muted
            playsInline
            preload='auto'
            src={'https://madwolfstore.s3.amazonaws.com/logo/logo_animation.mp4'}
            // poster={"https://madwolfstore.s3.amazonaws.com/logo/MadWolf_logo_wit.png"}
          />
        </div>
      </div>

      {setshowButton && (
        <div
          className='animate-Opacity grid place-items-center hover:cursor-pointer'
          onClick={handleClick}
        >
          <div className='animate-bounceAnimation flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-2 border-solid border-gray-500'>
            <span className='origin-center rotate-90 transform'>&#62;</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoAnimation;
