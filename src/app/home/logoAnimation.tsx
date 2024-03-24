'use client';

import { useState } from 'react';

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
  };

  setTimeout(() => {
    setSetshowButton(true);
  }, 1300);

  return (
    <div className={`${buttonClicked ? 'hidden' : ''} h-screen `}>
      <div className='grid h-[calc(100%-18rem)] sm:h-[calc(100%-10rem)] place-items-center'>
        <div className='flex animate-logoAnimation items-center justify-center pl-5 pr-5 sm:pl-0 sm:pr-0'>
          <video
            autoPlay
            muted
            playsInline
            preload='auto'
            width={480}
            height={480}
          >
            <source
              src={
                'https://madwolfstore.s3.amazonaws.com/logo_animation+(1)_1.mp4'
              }
              type='video/mp4;codecs=hvc1'
            />
            <source
              src={
                'https://madwolfstore.s3.amazonaws.com/logo_animation+(1)_1.webm'
              }
              type='video/webm'
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {setshowButton && (
        <div
          className='grid animate-Opacity place-items-center hover:cursor-pointer'
          onClick={handleClick}
        >
          <div className='flex h-16 w-16 animate-bounceAnimation items-center justify-center rounded-full border-2 border-solid border-gray-500 transform'>
            <span className='origin-center rotate-90 transform'>&#62;</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoAnimation;
