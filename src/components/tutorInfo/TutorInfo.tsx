import { useQuery } from '@tanstack/react-query';
import { fetchReview } from '../../api/user';
import * as S from './TutorInfo.styled';
import { RootState } from '../../redux/config/configStore';
import { useSelector } from 'react-redux';
import { fetchTutorAll } from '../../api/tutor';
import { Views } from '../../supabase/database.types';
import { Container, InfoNull, InfoSection, InfoTitle } from '../userInfo/UserInfo.styled';
import MatchingStudent from '../matchingTab/MatchingStudent';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { starEmpty, starFull } from '../../assets';

interface pageProps {
  match: Views<'matching_tutor_data'>[];
}
const TutorInfo = ({ match }: pageProps) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor-info'], fetchTutorAll);
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery(['review'], fetchReview);

  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return null;

  // 받은 요청 내역
  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Views<'matching_tutor_data'>) => item.tutor_id === user!.id);

  if (tutorLoading || reviewLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (tutorError || reviewError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!tutor || !review || !matchList) {
    return null;
  }

  const reviewData = review?.filter((item) => {
    return user!.id === item.reviewed_id;
  });

  const tutorInfo = Array.isArray(tutor) ? tutor.find((item) => user!.id === item.user_id) : null;
  const starRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img key={i} src={starFull} alt={`Full Star`} />);
      } else {
        stars.push(<img key={i} src={starEmpty} alt={`Empty Star`} />);
      }
    }
    return stars;
  };
  return (
    <>
      {tutorInfo && (
        <>
          <InfoSection>
            <Container>
              <InfoTitle>매칭 내역</InfoTitle>
              {matchList.length > 0 ? <MatchingStudent matchList={matchList} /> : <InfoNull>매칭 내역이 없습니다</InfoNull>}
            </Container>
          </InfoSection>
          <InfoSection>
            <Container>
              <InfoTitle>수강생 후기</InfoTitle>
              {reviewData.length > 0 ? (
                <S.StudentList>
                  {reviewData.map((review) => {
                    const rating = review.rating || 0; // rating 값이 없는 경우 0으로 처리
                    return (
                      <S.StudentItem key={review.id}>
                        <S.StudentReview>
                          <S.StReviewTitle>{review.title}</S.StReviewTitle>
                          <S.StReviewContent>{review.content}</S.StReviewContent>
                          <S.StReviewAuth>
                            {review.author} / {review.created_at.split('T')[0]}
                          </S.StReviewAuth>
                        </S.StudentReview>
                        <S.ReviewRating>{starRating(rating)}</S.ReviewRating>
                      </S.StudentItem>
                    );
                  })}
                </S.StudentList>
              ) : (
                <InfoNull>후기가 없습니다</InfoNull>
              )}
            </Container>
          </InfoSection>
        </>
      )}
    </>
  );
};

export default TutorInfo;
