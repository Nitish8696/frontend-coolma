import React, { useState, useEffect } from 'react';
import { MdOutlineBolt } from "react-icons/md";

const Timer = () => {
  const initialHours = 3;
  const initialSeconds = initialHours * 60 * 60;
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          // If time is up, reset to initial time
          return initialSeconds;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialSeconds]);

  // Convert remaining seconds into hours, minutes, and seconds
  const hours = Math.floor(remainingSeconds / (60 * 60));
  const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div className='flex items-center gap-1 '>
      <div>
      <MdOutlineBolt
 className="text-white " />
    </div>
<p >{hours}h {minutes}m {seconds}s</p>
    </div>
  );
};

export default Timer;
