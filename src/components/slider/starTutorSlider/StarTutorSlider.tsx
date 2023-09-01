import * as S from './StartTutorSlider.styled';
import { useQuery } from '@tanstack/react-query';
import TutorSlider from '../tutorSlider/TutorSlider';
import { tutorInfoJoin } from '../../../api/tutor';

const STAR_TUTORS_QUERY_KEY = ['starTutors'];

const StarTutorSlider = () => {
  const tutors = useQuery(STAR_TUTORS_QUERY_KEY, tutorInfoJoin);

  if (tutors.isLoading) {
    return <div>로딩중</div>;
  }
  if (tutors.isError) {
    console.log(tutors.error);
    return;
  }
  return (
    <S.Container>
      <S.Inner>
        <S.Title>인기강사</S.Title>
        <TutorSlider tutorList={tutors.data} panels={4} uniqueKey="startTutors" />
      </S.Inner>
    </S.Container>
  );
};

export default StarTutorSlider;
