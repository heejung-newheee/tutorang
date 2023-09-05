import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Review, StarTutorSlider, TutorInfoDetail } from '../../components';
import { closeModal } from '../../redux/modules';

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  if (!id) return;

  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, []);

  return (
    <>
      <TutorInfoDetail id={id} />
      <Review id={id} />
      <StarTutorSlider />
    </>
  );
};
export default Detail;
