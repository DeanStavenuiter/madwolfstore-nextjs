'use client'

import { useRef, useState } from 'react';

const VideoPlayer: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarFillRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseOver = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
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
      const percentage = (event.clientX - progressBarRef.current.getBoundingClientRect().left) / progressBarRef.current.offsetWidth;
      if (videoRef.current) {
        videoRef.current.currentTime = percentage * videoRef.current.duration;
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && progressBarFillRef.current) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressBarFillRef.current.style.width = `${percentage}%`;
    }
  };

  return (
    <div className="relative w-60">
      <video
        ref={videoRef}
        className="w-60"
        src={src}
        onTimeUpdate={handleTimeUpdate}
        loop
      >
        Your browser does not support the video tag.
      </video>
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 w-full h-full bg-gray-300 cursor-pointer"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ background: 'transparent' }}
      >
        <div ref={progressBarFillRef} className="h-full bg-green-500 z-10" style={{ background: 'transparent' }}></div>
      </div>
    </div>
  );
};

export default VideoPlayer;