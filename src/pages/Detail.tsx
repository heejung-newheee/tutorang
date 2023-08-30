import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchData, fetchReview } from '../api/user';
import { fetchLike } from '../api/like';
import { fetchTutorAll } from '../api/tutor';
import { Review } from '../components';
import TutorInfoDeatail from '../components/tutorInfoDetail/TutorInfoDetail';

const Detail = () => {
  const { id } = useParams();

  const { data: profiles, isLoading: profilesLoading, isError: profilesError } = useQuery(['profiles'], fetchData);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutorAll);
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery(['review'], fetchReview);

  if (profilesLoading || likeLoading || tutorLoading || reviewLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!tutor || !profiles || !like || profilesError || likeError || tutorError || reviewError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

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
