'use client';

import { useRef, useState } from 'react';
import useDevice from './UseDevice';

const VideoPlayer: React.FC<{
  width: string;
  height: string;
  justifyContent: string;
  movFile: string ;
  webmFile: string ;
}> = ({ width, height, justifyContent, movFile, webmFile }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarFillRef = useRef<HTMLDivElement>(null);

  useDevice();

  // console.log("device" , device)

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseOver = async () => {
    if (videoRef.current?.paused) {
      const playVideo = await videoRef.current?.play();
      console.log('videoRef.current?.play()', playVideo);
    }
  };

  const handleMouseOut = () => {
    if (!videoRef.current?.paused) {
      videoRef.current?.pause();
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

  return (
    <div className={`relative flex w-full sm:w-[75%] justify-${justifyContent} `}>
      <video
        ref={videoRef}
        className={`${width} ${height}`}
        onTimeUpdate={handleTimeUpdate}
        loop
        muted
        playsInline
      >
        <source src={webmFile} type='video/webm' />
        <source src={movFile} type='video/quicktime'/>
        
        
        Your browser does not support the video tag.
      </video>
      <div
        ref={progressBarRef}
        className={`absolute bottom-0 h-full cursor-pointer bg-gray-300
         ${width}
         `}
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
    </div>
  );
};

export default VideoPlayer;
