import { useQuery } from '@tanstack/react-query';
import { fetchData, fetchLike, fetchTutor } from '../api/user';

const Detail = () => {
  const { data: user, isLoading: userLoading, isError: userError } = useQuery(['user'], fetchData);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutor);

  if (userLoading || likeLoading || tutorLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!tutor || !user || !like || userError || likeError || tutorError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  return <div></div>;
};

export default Detail;
