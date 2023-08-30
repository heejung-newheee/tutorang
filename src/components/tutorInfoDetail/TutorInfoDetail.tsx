import { useQuery } from '@tanstack/react-query';
import * as S from './TutorInfoDetail.styled';
import { matchTutor } from '../../api/tutor';
import { icon_check, icon_class, icon_info, icon_like, icon_location_gray, icon_school, icon_verify, starEmpty, starFull, starHalf } from '../../assets';
import { Button } from '..';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modules';
import { useReviewAverage } from '../../hooks';
import { fetchReview } from '../../api/user';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import supabase from '../../supabase';
import { createChatRoom, getChatRoomWithTutor, inviteChatRoom } from '../../api/chat';
import { useNavigate } from 'react-router-dom';

const TUTOR_QUERY_KEY = ['tutorDetail'];
const REVIEW_QUERY_KEY = ['review'];

type TutorDetailProps = {
  id: string | undefined;
};

const TutorInfoDeatail = ({ id }: TutorDetailProps) => {
  if (!id) return;
  const dispatch = useDispatch();
  const { data: tutors, isLoading: tutorLoading, isError: tutorError, error } = useQuery(TUTOR_QUERY_KEY, () => matchTutor(id));

  // 대화하기
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleStartChat = async (targetId: string) => {
    if (!(targetId && session)) return;

    try {
      const chatRooms = await getChatRoomWithTutor(targetId);

      if (chatRooms && chatRooms.length > 0) {
        navigate(`/chat2?room_id=${chatRooms[0].room_id}`);
        return;
      }

      const newRoom = await createChatRoom();

      await inviteChatRoom(newRoom.room_id, targetId);

      navigate(`/chat2?room_id=${newRoom.room_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // 리뷰
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery(REVIEW_QUERY_KEY, fetchReview);
  const filteredReview = review?.filter((review) => review.reviewed_id === id);
  const reviewRatings = filteredReview?.map((review) => review.rating);
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

  // 신고하기
  const handleOpenReport = () => {
    dispatch(openModal({ type: 'report' }));
  };

  if (tutorLoading || isLoading || reviewLoading) {
    return <div>로딩중</div>;
  }

  if (tutorError || reviewError) {
    return <div>에러</div>;
  }

  return (
    <>
      {/* 튜터데이터 */}
      <section>
        {tutors?.map((tutor) => {
          return (
            <S.Container key={tutor.tutor_info_id}>
              <S.TutorProfile>
                <div>
                  <S.Figure>
                    <img src={`${tutor.tutor_img}`} alt={`${tutor.tutor_name} 프로필 이미지`} />
                    <button>찜하기</button>
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
                      <p>
                        <S.Icon src={icon_location_gray} /> 서울 | 강남구
                      </p>
                      <p>
                        <S.Icon src={icon_school} /> 서울대 | 영어영문학과
                      </p>
                      <p>
                        <S.Icon src={icon_check} />
                        한국어, 영어 가능
                      </p>
                      <p>
                        <S.Icon src={icon_check} />
                        언어 난이도 <S.badgeLevel>중</S.badgeLevel>
                      </p>
                      <S.TagList>
                        <li>#열정적인</li>
                        <li>#외향적인</li>
                        <li>#개성있는</li>
                      </S.TagList>
                    </S.TutorInfoWrapper>
                  </S.InfoWrapper>
                  <S.PriceList>
                    <S.PriceItem>
                      <span>
                        <S.Dot />
                        30분 화상 만남
                      </span>
                      <span>5,000원</span>
                    </S.PriceItem>
                    <S.PriceItem>
                      <span>
                        <S.Dot />
                        30분 직접 만남
                      </span>
                      <span>5,000원</span>
                    </S.PriceItem>
                  </S.PriceList>
                </div>
              </S.TutorProfile>

              <S.ButtonWrapper>
                {/* session 대신 로그인 상태로 변경해도 될까요?*/}
                {session && (
                  //handleStartChat(id) : usePrams id 값을 매개변수로 사용중
                  <Button variant="solid" color="primary" size="Medium" onClick={() => handleStartChat(id)}>
                    튜터랑 대화하기
                  </Button>
                )}
                <span>바로 상담가능</span>
              </S.ButtonWrapper>
            </S.Container>
          );
        })}
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
            <S.OverviewItemNumber>8,172건</S.OverviewItemNumber>
            <span>리뷰 수</span>
          </S.OverviewItem>
          <S.OverviewItem>
            <S.OverviewItemIcon src={icon_class} alt="매칭 아이콘" />
            <S.OverviewItemNumber>30번</S.OverviewItemNumber>
            <span>매칭 횟수</span>
          </S.OverviewItem>
        </S.OverviewList>
      </S.OverviewContainer>
    </>
  );
};

export default TutorInfoDeatail;
