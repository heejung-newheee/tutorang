import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useReviewAverage } from '../hooks';
import { matchingRequest } from '../api/match';
import { fetchData, fetchReview } from '../api/user';
import { fetchLike } from '../api/like';
import { fetchTutorAll } from '../api/tutor';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/modules';
import { useEffect, useState } from 'react';
import supabase from '../supabase';
import { Session } from '@supabase/supabase-js';
import { getGroupChannelUrl, sendRequestTutoringMessage, sendResponseTutoringMessage } from '../sendbird';
import { RootState } from '../redux/config/configStore';

const Detail = () => {
  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: profiles, isLoading: profilesLoading, isError: profilesError } = useQuery(['profiles'], fetchData);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutorAll);
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery(['review'], fetchReview);

  const filteredUser = profiles?.filter((profiles) => profiles.id === id);
  const filteredTutor = tutor?.filter((tutor) => tutor.user_id === id);
  const filteredReview = review?.filter((review) => review.user_id === id);
  const reviewRatings = filteredReview?.map((review) => review.rating);
  const filteredReviewRatings = reviewRatings?.filter((value) => typeof value === 'number') as number[];

  const loginUser = useSelector((state: RootState) => state.user.user);
  console.log(filteredUser);
  console.log('리덕스 로그인사용자', loginUser);

  const handleStartChat = async (targetId: string) => {
    if (!(targetId && session)) return;
    const url = await getGroupChannelUrl(session.user.id, targetId);
    if (url) {
      navigate(`/chat?channel_url=${url}`);
    }
  };

  // 모달
  // const { Modal, isOpen, openModal, closeModal } = useModal();
  // redux type
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(openModal('report'));
  };
  // const { Modal, isOpen, openModal, closeModal } = useModal();
  // redux type

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
                활동 지역 : {user.location1} | {user.location2}
              </div>
            </div>
          );
        })}
        {filteredTutor?.map((tutor) => {
          return (
            <div key={tutor.user_id}>
              <p>{tutor.class_info}</p>
              <p>{tutor.price}(30분)</p>
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

        {/* <Modal isOpen={isOpen} closeModal={closeModal}>
          <Report closeModal={closeModal} />
        </Modal>
        <button onClick={openModal}>신고하기</button> */}
        <button onClick={handleOpen}>신고하기</button>

        {/* <div>튜터의 스킬/장점/성격</div> */}
      </section>

      {/* 튜터 overview */}
      <section>
        <ul>
          <li>리뷰 평점 : {reviewAverage}</li>
          <li>리뷰수 : {filteredReview?.length}</li>
          {/* <li>매칭수 : </li> */}
        </ul>
      </section>

      {/* 튜터 리뷰 */}
      <section>
        <h4>리뷰</h4>
        <div>
          {filteredReview?.map((review) => {
            return (
              <div key={review.id}>
                <p>{review.title}</p>
                <p>{review.content}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Detail;
