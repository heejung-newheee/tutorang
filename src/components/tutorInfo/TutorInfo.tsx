import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchReview } from '../../api/user';
import * as S from './TutorInfo.styled';
import { RootState } from '../../redux/config/configStore';
import { useSelector } from 'react-redux';
import { fetchTutorAll } from '../../api/tutor';
import { Tables, Views } from '../../supabase/database.types';
import supabase from '../../supabase';
import { matchingAccept, matchingReject } from '../../api/match';
import { Container, InfoItem, InfoList, InfoSection, InfoTitle } from '../userInfo/UserInfo.styled';
import MatchingStudent from '../matchingTab/MatchingStudent';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface pageProps {
  match: Views<'matching_tutor_data'>[];
}
const TutorInfo = ({ match }: pageProps) => {
  useEffect(() => {
    AOS.init();
  }, []);
  const queryClient = useQueryClient();

  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutorAll);
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery(['review'], fetchReview);
  const user = useSelector((state: RootState) => state.user.user);
  // console.log('tutorInfo 로그인사용자', user);

  const reviewData = review?.filter((item) => {
    return user!.id === item.reviewed_id;
  });

  const tutorInfo = tutor?.find((item) => {
    return user!.id === item.user_id;
  });

  // const created = tutorInfo!.created_at.split('T')[0];

  // 받은 요청 내역
  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Views<'matching_tutor_data'>) => item.tutor_id === user!.id);
  console.log(matchList);
  console.log('tutorInfo', tutorInfo);

  if (tutorLoading || reviewLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (tutorError || reviewError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!tutor || !review || !matchList) {
    return null;
  }
  return (
    <>
      {tutorInfo && (
        <div>
          <InfoSection data-aos="fade-up">
            <InfoTitle>강사 대시보드</InfoTitle>
            <button>수업 내용 수정</button>
            <div>수업레벨 : Lv 2</div>
            <div>별점 : ⭐⭐⭐⭐ </div>
            <div>수업소개 : {tutorInfo!.class_info}</div>
            <div>시간당 : {tutorInfo!.tuition_fee_offline}원</div>
            <div>시간당 : {tutorInfo!.tuition_fee_online}원</div>
            {/* <div style={{ fontSize: '0.8rem', color: '#ggg' }}> 마지막 정보 업데이트 {tutorInfo?.update ? <span>{tutorInfo.update}</span> : <span>{created}</span>}</div> */}
          </InfoSection>

          <InfoSection data-aos="fade-up">
            <Container>
              <InfoTitle>매칭 내역</InfoTitle>
              <MatchingStudent matchList={matchList} />
            </Container>
          </InfoSection>
          <InfoSection data-aos="fade-up">
            <Container>
              <InfoTitle>수강생 후기</InfoTitle>
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
            </Container>
          </InfoSection>
          <InfoSection data-aos="fade-up">
            <Container>
              <InfoTitle>수익차트</InfoTitle>
              <br />
              아직 내용 없음
            </Container>
          </InfoSection>
        </div>
      )}
    </>
  );
};

export default TutorInfo;
