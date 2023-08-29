import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useReviewAverage } from '../hooks';
import { matchingRequest } from '../api/match';
import { fetchData, fetchReview } from '../api/user';
import { fetchLike } from '../api/like';
import { fetchTutorAll } from '../api/tutor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmark } from '../api/bookmark';
import { BookMark } from '../components';
import { openModal, setReview, setTargetId } from '../redux/modules';
import { reviewDelete, reviewUpdate } from '../api/review';
import { useEffect, useState } from 'react';
import supabase from '../supabase';
import { Session } from '@supabase/supabase-js';
import { getGroupChannelUrl, sendRequestTutoringMessage, sendResponseTutoringMessage } from '../sendbird';
import { RootState } from '../redux/config/configStore';
import { starFull, starHalf, starEmpty } from '../assets';

const Detail = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const { id } = useParams();

  // newReview에 사용할 targeId 업데이트
  // useEffect(() => {
  //   if (id) {
  //     dispatch(setTargetId(id));
  //   }
  // }, [id]);
  const navigate = useNavigate();

  const { data: profiles, isLoading: profilesLoading, isError: profilesError } = useQuery(['profiles'], fetchData);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutorAll);
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery(['review'], fetchReview);

  const filteredUser = profiles?.filter((profiles) => profiles.id === id);
  const filteredTutor = tutor?.filter((tutor) => tutor.user_id === id);
  const filteredReview = review?.filter((review) => review.reviewed_id === id);
  const reviewRatings = filteredReview?.map((review) => review.rating);
  const filteredReviewRatings = reviewRatings?.filter((value) => typeof value === 'number') as number[];

  const loginUser = useSelector((state: RootState) => state.user.user);

  // StarRate

  const starRating = (currentRate: number) => {
    const MAX_STAR_RATE = 5;
    let starCount = Math.floor(currentRate);

    //소수점 찾기
    let halfStarRate = currentRate - starCount;

    if (currentRate - halfStarRate >= 0.5) {
      return <img src={starHalf} alt={`Half Star`} />;
    } else {
      return <img src={starEmpty} alt={`Empty Star`} />;
    }
  };

  //

  const queryClient = useQueryClient();

  const mutationReviewDelete = useMutation(reviewDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries(['review']);
    },
  });

  const handleStartChat = async (targetId: string) => {
    if (!(targetId && session)) return;
    const url = await getGroupChannelUrl(session.user.id, targetId);
    if (url) {
      navigate(`/chat?channel_url=${url}`);
    }
  };

  // 모달
  const handleOpen = () => {
    dispatch(openModal({ type: 'report' }));
  };

  const handleOpenReviewCreateForm = () => {
    dispatch(openModal({ type: 'reviewCreate', targetId: id }));
  };

  const handleOpenReviewUpdateForm = () => {
    dispatch(openModal({ type: 'reviewUpdate', targetId: id }));
  };

  // 리뷰 Delete
  const handleReviewDelete = (id: number) => {
    mutationReviewDelete.mutate(id);
  };

  const reviewAverage = useReviewAverage(filteredReviewRatings);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (profilesLoading || likeLoading || tutorLoading || reviewLoading || isLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!tutor || !profiles || !like || profilesError || likeError || tutorError || reviewError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  return (
    <>
      {/* 튜터데이터 */}
      <section>
        {filteredUser?.map((user) => {
          return (
            <div key={user.id}>
              <div>
                <img src={`${user.avatar_url}`} alt="프로필 이미지" />
                <span>{user.username}</span>
                {session && <button onClick={() => handleStartChat(user.id)}>대화시작하기</button>}
              </div>
              <div>
                활동 지역 : {user.location1_sido} | {user.location2_sido}
              </div>
            </div>
          );
        })}
        {filteredTutor?.map((tutor) => {
          return (
            <div key={tutor.user_id}>
              <p>{tutor.class_info}</p>
              <p>{tutor.tuition_fee_offline}(30분)</p>
              <p>{tutor.tuition_fee_online}(30분)</p>
              <BookMark />
            </div>
          );
        })}
        <button
          onClick={async () => {
            try {
              await matchingRequest({ tutorId: filteredUser![0].id, userId: loginUser!.id });
              await sendRequestTutoringMessage(loginUser!.id, filteredUser![0].id);
              //await sendResponseTutoringMessage(loginUser!.id, filteredUser![0].id, 'reject');
              alert('신청완료');
            } catch (error) {
              console.error('매칭 요청 중 오류 발생:', error);
              alert('매칭 요청 중 오류가 발생했습니다.');
            }
          }}
        >
          매칭 요청 버튼 !!!!!!!!!!
        </button>

        <button onClick={handleOpen}>신고하기</button>

        {/* <div>튜터의 스킬/장점/성격</div> */}
      </section>

      {/* 튜터 overview */}
      <section>
        <ul>
          <li>
            <div></div>
            <p>리뷰 평점 : {reviewAverage} / 5.0</p>
          </li>
          <li>리뷰수 : {filteredReview?.length}</li>
          {/* <li>매칭수 : </li> */}
        </ul>
      </section>

      {/* 튜터 리뷰 */}
      <section>
        <h4>
          리뷰 <span>{filteredReview?.length}</span>
        </h4>
        <button onClick={handleOpenReviewCreateForm}>리뷰 남기기</button>

        <ul>
          {filteredReview?.map((review) => {
            return (
              <li key={review.id}>
                <p>{review.title}</p>
                <p>{review.content}</p>

                {loginUser?.id === review.user_id ? (
                  <div>
                    <button
                      onClick={() => {
                        handleOpenReviewUpdateForm();
                        dispatch(setReview(review));
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        handleReviewDelete(review.id);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Detail;
