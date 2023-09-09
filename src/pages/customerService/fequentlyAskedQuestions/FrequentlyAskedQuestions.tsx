import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modules';

const FrequentlyAskedQuestions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, []);

  return <div>FrequentlyAskedQuestions</div>;
};

export default FrequentlyAskedQuestions;
