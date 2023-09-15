import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Test = () => {
  const here = useLocation().pathname.split('/')[1];
  console.log(here);
  useEffect(() => {
    console.log(1004);
  }, [here]);
  return <div>Test</div>;
};

export default Test;
