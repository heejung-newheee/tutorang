import { useQuery } from '@tanstack/react-query';
import * as S from './TutorInfoDetail.styled';
import { matchTutor } from '../../api/tutor';
import { icon_check, icon_class, icon_info, icon_like, icon_location_gray, icon_school, icon_verify, starEmpty, starFull, starHalf } from '../../assets';
import { BookMark, Button } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/modules';
import { useReviewAverage } from '../../hooks';

import { createChatRoom, getChatRoomWithTutor, inviteChatRoom } from '../../api/chat';
import { useNavigate } from 'react-router-dom';
import { matchReview } from '../../api/review';
import { RootState } from '../../redux/config/configStore';
import { tutorMatchedCount } from '../../api/match';

const TUTOR_QUERY_KEY = 'tutorDetail';
const REVIEW_QUERY_KEY = 'reviewTutorDetail';
const MATCHING_QUERY_KEY = 'matchingCount';

type TutorDetailProps = {
  id: string;
};

const TutorInfoDetail = ({ id }: TutorDetailProps) => {
  const dispatch = useDispatch();
  const { data: tutor, isLoading: tutorLoading, isError: tutorError, error } = useQuery([TUTOR_QUERY_KEY, id], () => matchTutor(id));
  const matchingCount = useQuery([MATCHING_QUERY_KEY, id], () => tutorMatchedCount(id));
  const loginUser = useSelector((state: RootState) => state.user.user);

  // 대화하기
  const navigate = useNavigate();

  const handleStartChat = async (tutorId: string) => {
    if (!tutorId) return;

    if (!loginUser) {
      dispatch(openModal({ type: 'alert', message: '로그인 후 이용해주세요' }));
      return;
    }

    try {
      const chatRoom = await getChatRoomWithTutor(loginUser?.id, tutorId);

      if (chatRoom.length > 0) {
        navigate(`/chat?room_id=${chatRoom[0].room_id}`);
        return;
      }

      const newRoom = await createChatRoom();

      await inviteChatRoom(newRoom.room_id, tutorId);

      navigate(`/chat?room_id=${newRoom.room_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // 리뷰
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery([REVIEW_QUERY_KEY, id], () => matchReview(id));
  const reviewRatings = review?.map((review) => review.rating);
  const filteredReviewRatings = reviewRatings?.filter((value) => typeof value === 'number') as number[];

  // 별점 후기
  const stars = [1, 2, 3, 4, 5];

  const reviewAverage = useReviewAverage(filteredReviewRatings);

  const starRating = (currentRate: number) => {
    if (reviewAverage >= currentRate) {
      return <img src={starFull} alt={`Full Star`} />;
    } else if (reviewAverage + 0.5 >= currentRate) {
      return <img src={starHalf} alt={`Half Star`} />;
    }

    return <img src={starEmpty} alt={`Empty Star`} />;
  };

  // 매칭 수

  // 신고하기
  const handleOpenReport = () => {
    dispatch(openModal({ type: 'report' }));
  };

  if (tutorLoading || reviewLoading) {
    return <div>로딩중</div>;
  }

  if (tutorError || reviewError) {
    console.log(error);
    return <div>에러</div>;
  }

  return (
    <>
      {/* 튜터데이터 */}
      <section>
        <S.Container>
          <S.TutorProfile>
            <div>
              <S.Figure>
                <img src={`${tutor.tutor_img}`} alt={`${tutor.tutor_name} 프로필 이미지`} />
                <BookMark />
              </S.Figure>
              <S.reportButton onClick={handleOpenReport}>
                <img src={icon_info} />
                신고하기
              </S.reportButton>
            </div>

            <div>
              <S.ClassTitle>{tutor.class_info}</S.ClassTitle>
              <S.InfoWrapper>
                <S.TutorNameWrapper>
                  <S.TutorName>
                    {tutor.tutor_name} <S.Age>(나이)</S.Age>
                  </S.TutorName>
                  <S.verify>
                    <S.Icon src={icon_verify} />
                    학력인증
                  </S.verify>
                </S.TutorNameWrapper>
                <S.TutorInfoWrapper>
                  <S.InfoItem>
                    <S.Icon src={icon_location_gray} /> {tutor.location1_sido} | {tutor.location1_gugun}
                    <S.Icon src={icon_location_gray} /> {tutor.location2_sido} | {tutor.location2_gugun}
                  </S.InfoItem>
                  <S.InfoItem>
                    <S.Icon src={icon_school} /> {tutor.university} | {tutor.major}
                  </S.InfoItem>
                  <S.InfoItem>
                    <S.Icon src={icon_check} />
                    {tutor.speaking_language?.map((language) => {
                      return <span key={language}> {language} </span>;
                    })}
                    가능
                  </S.InfoItem>
                  <S.InfoItem>
                    <S.Icon src={icon_check} />
                    언어 난이도
                    {tutor.class_level?.map((level) => {
                      return <S.badgeLevel key={level}>{level}</S.badgeLevel>;
                    })}
                  </S.InfoItem>
                  <S.TagList>
                    {tutor.personality?.map((personal) => {
                      return <li key={personal}>#{personal}</li>;
                    })}
                  </S.TagList>
                </S.TutorInfoWrapper>
              </S.InfoWrapper>
              <S.PriceList>
                <S.PriceItem>
                  <span>
                    <S.Dot />
                    30분 화상 만남
                  </span>
                  <span>{tutor.tuition_fee_online}</span>
                </S.PriceItem>
                <S.PriceItem>
                  <span>
                    <S.Dot />
                    30분 직접 만남
                  </span>
                  <span>{tutor.tuition_fee_offline}</span>
                </S.PriceItem>
              </S.PriceList>
            </div>
          </S.TutorProfile>

          <S.ButtonWrapper>
            <Button variant="solid" color="primary" size="Medium" onClick={() => handleStartChat(id)}>
              튜터랑 대화하기
            </Button>
            <span>바로 상담가능</span>
          </S.ButtonWrapper>
        </S.Container>
      </section>

      {/* 튜터 overview */}
      <S.OverviewContainer>
        <S.OverviewList>
          <S.OverviewItem>
            <S.StarWrapper>
              <S.StarList>
                {stars.map((star) => {
                  return <li key={star}>{starRating(star)}</li>;
                })}
              </S.StarList>
            </S.StarWrapper>
            <S.OverviewItemNumber>{reviewAverage} / 5.0</S.OverviewItemNumber>
            <span>리뷰 평점</span>
          </S.OverviewItem>
          <S.OverviewItem>
            <S.OverviewItemIcon src={icon_like} alt="리뷰 아이콘" />
            <S.OverviewItemNumber>{review.length}건</S.OverviewItemNumber>
            <span>리뷰 수</span>
          </S.OverviewItem>
          <S.OverviewItem>
            <S.OverviewItemIcon src={icon_class} alt="매칭 아이콘" />
            <S.OverviewItemNumber>{matchingCount.data?.length}번</S.OverviewItemNumber>
            <span>매칭 횟수</span>
          </S.OverviewItem>
        </S.OverviewList>
      </S.OverviewContainer>
    </>
  );
};

export default TutorInfoDetail;
