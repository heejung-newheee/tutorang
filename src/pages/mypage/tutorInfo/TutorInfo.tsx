import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { icon_check, icon_edit_wh, icon_location_gray, icon_school, icon_verify, starEmpty, starFull } from '../../../assets';

import * as S from './TutorInfo.styled';

import { getBoard } from '../../../api/board';
import { tutorInfoJoin } from '../../../api/tutor';
import { fetchReview } from '../../../api/user';
import { Loading } from '../../../components';
import { BOARD_QUERY_KEY, TUTOR_INFO_JOIN_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { Tables, Views } from '../../../supabase/database.types';
import { Age, Dot, Icon, InfoItem, PriceItem, PriceList, TagList, TutorName } from '../../detail/tutorInfoDetail/TutorInfoDetail.styled';
import MatchingStudent from '../matchingTab/MatchingStudent';
import { Container, ContentsDataBox, DataAuth, DataContent, DataItem, DataList, DataTitle, InfoNull, InfoSection, InfoTitle, ReviewRating } from '../userInfo/UserInfo.styled';

interface pageProps {
  match: Views<'matching_tutor_data'>[];
}
const TutorInfo = ({ match }: pageProps) => {
  useEffect(() => {
    AOS.init();
  }, []);
  const boardData = useQuery([BOARD_QUERY_KEY], getBoard);

  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery([TUTOR_INFO_JOIN_QUERY_KEY], tutorInfoJoin);

  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery([TUTOR_INFO_JOIN_QUERY_KEY], fetchReview);

  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return null;

  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Views<'matching_tutor_data'>) => item.tutor_id === user!.id);

  if (tutorLoading || reviewLoading) {
    return <Loading />;
  }
  if (tutorError || reviewError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!tutor || !review || !matchList || !boardData.data) {
    return null;
  }

  const reviewData = review?.filter((item) => {
    return user!.id === item.reviewed_id;
  });

  const tutorInfo = Array.isArray(tutor) ? tutor.find((item) => user!.id === item.tutor_id) : null;

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
              <InfoTitle>수업 소개</InfoTitle>
              <S.TutorClassWarp>
                <S.TutorClassTop>
                  <div>
                    <TutorName>
                      {tutorInfo.tutor_name} <Age>(나이)</Age>
                    </TutorName>
                    <Icon src={icon_verify} />
                    학력인증
                  </div>
                  <S.ClassEditBtn to={'/tutor-class'}>
                    <img src={icon_edit_wh} alt="" />
                  </S.ClassEditBtn>
                </S.TutorClassTop>
                <S.TutorClass>
                  <S.ClassDetail>
                    <InfoItem>
                      <Icon src={icon_location_gray} /> {tutorInfo.location1_sido} | {tutorInfo.location1_gugun}
                      <Icon src={icon_location_gray} /> {tutorInfo.location2_sido} | {tutorInfo.location2_gugun}
                    </InfoItem>
                    <InfoItem>
                      <Icon src={icon_school} /> {tutorInfo.university} | {tutorInfo.major}
                    </InfoItem>
                    <InfoItem>
                      <Icon src={icon_check} />
                      {tutorInfo.speaking_language?.map((language) => {
                        return <span key={language}> {language} </span>;
                      })}
                      가능
                    </InfoItem>
                    <InfoItem>
                      <Icon src={icon_check} />
                      언어 난이도
                      {tutorInfo.class_level?.map((level) => {
                        return <S.langLevel key={level}>{level}</S.langLevel>;
                      })}
                    </InfoItem>
                    <TagList>
                      {tutorInfo.personality?.map((personal) => {
                        return <li key={personal}>#{personal}</li>;
                      })}
                    </TagList>
                    <PriceList className="class-price">
                      <PriceItem>
                        <span>
                          <Dot />
                          30분 화상 만남
                        </span>
                        <span>{tutorInfo.tuition_fee_online}</span>
                      </PriceItem>
                      <PriceItem>
                        <span>
                          <Dot />
                          30분 직접 만남
                        </span>
                        <span>{tutorInfo.tuition_fee_offline}</span>
                      </PriceItem>
                    </PriceList>
                  </S.ClassDetail>
                  <S.ClassIntro>
                    <p>수업소개</p>
                    {tutorInfo.class_info}
                  </S.ClassIntro>
                </S.TutorClass>
              </S.TutorClassWarp>
            </Container>
          </InfoSection>

          <InfoSection>
            <Container>
              <InfoTitle>매칭 내역</InfoTitle>
              {matchList.length > 0 ? <MatchingStudent matchList={matchList} /> : <InfoNull>매칭 내역이 없습니다</InfoNull>}
            </Container>
          </InfoSection>
          <InfoSection>
            <Container>
              <InfoTitle>수강생 후기</InfoTitle>

              <ContentsDataBox>
                {reviewData.length > 0 ? (
                  <DataList>
                    {reviewData.map((review) => {
                      const rating = review.rating || 0;
                      return (
                        <DataItem key={review.id}>
                          <div>
                            <DataTitle>{review.title}</DataTitle>
                            <DataContent>{review.content}</DataContent>
                            <DataAuth>
                              {review.author} / {review.created_at.split('T')[0]}
                            </DataAuth>
                          </div>
                          <ReviewRating>{starRating(rating)}</ReviewRating>
                        </DataItem>
                      );
                    })}
                  </DataList>
                ) : (
                  <InfoNull>후기가 없습니다</InfoNull>
                )}
              </ContentsDataBox>
            </Container>
          </InfoSection>

          <InfoSection>
            <Container>
              <InfoTitle>내가 남긴 문의</InfoTitle>
              <ContentsDataBox>
                {boardData
                  .data!.filter((board: Tables<'board'>) => {
                    return board.user_id === user!.id;
                  })
                  .map((item: Tables<'board'>) => {
                    return (
                      <DataItem key={item.id}>
                        <div>
                          <DataTitle>{item.title}</DataTitle>
                          <DataContent>{item.content}</DataContent>
                          <DataAuth>{item.created_at.split('T')[0]}</DataAuth>
                        </div>
                      </DataItem>
                    );
                  })}
              </ContentsDataBox>
            </Container>
          </InfoSection>

          <InfoSection>
            <Container>
              <InfoTitle>수강 database</InfoTitle>
              <div>통계 그래프</div>
            </Container>
          </InfoSection>
        </>
      )}
    </>
  );
};

export default TutorInfo;