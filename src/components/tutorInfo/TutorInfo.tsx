import { useQuery } from '@tanstack/react-query';
import { fetchReview, fetchTutor } from '../../api/user';
import * as S from './TutorInfo.styled';
import { RootState } from '../../redux/config/configStore';
import { useSelector } from 'react-redux';

const TutorInfo = () => {
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutor);
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery(['review'], fetchReview);

  const user = useSelector((state: RootState) => state.user.user);
  console.log('tutorInfo 로그인사용자', user);

  const reviewData = review?.filter((item) => {
    return user!.id === item.reviewed_id;
  });
  const tutorInfo = tutor?.find((item) => {
    return user!.id === item.user_id;
  });
  // const created = tutorInfo!.created_at.split('T')[0];

  if (tutorLoading || reviewLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!tutor || tutorError || reviewError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  return (
    <div>
      <div>강사 대시보드</div>
      <button>수업 내용 수정</button>
      <div>수업레벨 : Lv 2</div>
      <div>별점 : ⭐⭐⭐⭐ </div>
      <div>수업소개 : {tutorInfo!.class_info}</div>
      <div>시간당 : {tutorInfo!.price}원</div>
      {/* <div style={{ fontSize: '0.8rem', color: '#ggg' }}> 마지막 정보 업데이트 {tutorInfo?.update ? <span>{tutorInfo.update}</span> : <span>{created}</span>}</div> */}
      <div>
        수강생 후기
        <S.StudentList>
          {reviewData &&
            reviewData.map((review) => {
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
