import { useEffect, useState } from 'react';
import { calculateTimeDifference } from '../../utils/Date';

const PreviewTime = ({ time }: { time: string }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const newTimeAgo = calculateTimeDifference(time);
      setTimeAgo(newTimeAgo);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return <>{timeAgo}</>;
};
export default PreviewTime;
