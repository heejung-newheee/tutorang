import { useParams } from 'react-router-dom';
import { Review } from '../components';
import TutorInfoDeatail from '../components/tutorInfoDetail/TutorInfoDetail';

const Detail = () => {
  const { id } = useParams();
  if (!id) return;

  return (
    <>
      {/* 튜터데이터 */}
      <TutorInfoDeatail id={id} />

      {/* 튜터 리뷰 */}
      <Review id={id} />
    </>
  );
};

export default Detail;
