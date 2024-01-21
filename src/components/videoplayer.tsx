'use client';

import { useEffect, useRef, useState } from 'react';
import useDevice from './UseDevice';
import Image from 'next/image';

const VideoPlayer: React.FC<{
  width: string;
  height: string;
  justifyContent: string;
  movFile: string;
  webmFile: string;
  product: any;
  selectedImage?: any;
  selectedAlt?: any;
  setSelectedImage?: any;
  setSelectedAlt?: any;
}> = ({
  width,
  height,
  justifyContent,
  movFile,
  webmFile,
  product,
  selectedImage,
  selectedAlt,
  setSelectedImage,
  setSelectedAlt,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarFillRef = useRef<HTMLDivElement>(null);

  const device = useDevice();

  const handleVideoClick = () => {
    const video = videoRef.current;

    if (video && video.paused) {
      console.log('play clicked');
      video.play();
    } else if (video) {
      console.log('pause clicked');
      video.pause();
    }
  };

  useEffect(() => {
    videoRef.current?.play();
    videoRef.current?.pause();
  }, []);

  // console.log("device" , device)

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseOver = async () => {
    if (device !== 'mobile') {
      if (videoRef.current?.paused) {
        videoRef.current?.play();
      }
    }
  };

  const handleMouseOut = () => {
    if (device !== 'mobile') {
      if (!videoRef.current?.paused) {
        videoRef.current?.pause();
      }
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging && progressBarRef.current) {
      const percentage =
        (event.clientX - progressBarRef.current.getBoundingClientRect().left) /
        progressBarRef.current.offsetWidth;
      if (videoRef.current) {
        videoRef.current.currentTime = percentage * videoRef.current.duration;
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && progressBarFillRef.current) {
      const percentage =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressBarFillRef.current.style.width = `${percentage}%`;
    }
  };

  const handleClose = () => {
    setSelectedImage('');
    setSelectedAlt('');
  };
  return (
    <div
      className={`relative flex w-full sm:w-[75%] justify-${justifyContent}`}
    >
      {!selectedImage ? (
        <>
          <video
            ref={videoRef}
            className={`${width} ${height} videoProduct`}
            onTimeUpdate={handleTimeUpdate}
            loop
            muted
            playsInline
            preload='auto'
            onClick={handleVideoClick}
          >
            <source src={movFile} type='video/mp4;codecs=hvc1' />
            <source src={webmFile} type='video/webm' />
            Your browser does not support the video tag.
          </video>
          <div
            ref={progressBarRef}
            className={`absolute bottom-0 h-full cursor-pointer bg-gray-300 ${width}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ background: 'transparent' }}
          >
            <div
              ref={progressBarFillRef}
              className='z-10 h-full bg-green-500'
              style={{ background: 'transparent' }}
            ></div>
          </div>
        </>
      ) : (
        <div className={` w-[${width}] h-[${height}]`}>
          <Image
            src={selectedImage}
            alt={selectedAlt}
            width={500}
            height={750}
            className=' mb-[10%] mt-[10%]'
          />
          <div
            className='absolute right-4 top-4 mt-[10%] cursor-pointer'
            onClick={handleClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
