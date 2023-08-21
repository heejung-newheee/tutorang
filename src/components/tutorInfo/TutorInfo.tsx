import { useQuery } from '@tanstack/react-query';
import { fetchReview, fetchTutor } from '../../api/user';
import { Tables } from '../../supabase/database.types';
import * as S from './TutorInfo.styled';

const TutorInfo = (user: Tables<'user'>[]) => {
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutor);
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery(['review'], fetchReview);

  if (tutorLoading || reviewLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!tutor || tutorError || reviewError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!review) {
    return <div>없음</div>;
  }
  const thisUser = user!.find((item: Tables<'user'>) => 123456 === item.id);

  const thisTutorInfo = tutor.find((item: Tables<'tutor_info'>) => 123456 === item.user_id);
  const update = thisTutorInfo!.created_at.split('T')[0];

  const reviewData = review?.filter((item) => {
    return thisUser!.id === item.reviewed_id;
  });

  return (
    <div>
      <div>강사 대시보드</div>
      <button>수업 내용 수정</button>
      <div>수업레벨 : Lv 2</div>
      <div>별점 : ⭐⭐⭐⭐ </div>
      <div>수업소개 : {thisTutorInfo!.class_info}</div>
      <div>시간당 : {thisTutorInfo!.price}원</div>
      <div style={{ fontSize: '0.8rem', color: '#ggg' }}> 마지막 정보 업데이트 {thisTutorInfo?.update ? <span>{thisTutorInfo.update}</span> : <span> {update}</span>}</div>
      <div>
        수강생 후기
        <S.StudentList>
          {reviewData.map((review) => {
            return (
              <S.StudentItem key={review.id}>
                <div>{review.title}</div>
                <div>{review.content}</div>
              </S.StudentItem>
            );
          })}
        </S.StudentList>
      </div>
      <div>학생리스트 </div>
      <div>수익차트</div>
    </div>
  );
};

export default TutorInfo;
