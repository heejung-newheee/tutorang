import { useQuery } from '@tanstack/react-query';
import { Loading } from '../..';
import { tutorInfoJoin } from '../../../api/tutor';
import { STAR_TUTORS_QUERY_KEY } from '../../../constants/query.constant';
import TutorSlider from '../tutorSlider/LikeTutorSlider';
import * as S from './StartTutorSlider.styled';

const StarTutorSlider = () => {
  const tutors = useQuery(STAR_TUTORS_QUERY_KEY, tutorInfoJoin);

  if (tutors.isLoading) {
    return <Loading />;
  }
  if (tutors.isError) {
    console.error(tutors.error);
    return;
  }
  return (
    <S.Container>
      <S.Inner>
        <S.Title>인기강사</S.Title>
      </S.Inner>
      <TutorSlider tutorList={tutors.data} uniqueKey="startTutors" />
    </S.Container>
  );
};

export default StarTutorSlider;
