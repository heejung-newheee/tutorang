import { useQuery } from '@tanstack/react-query';
import { fetchData, fetchLike, fetchTutor, fetchReview } from '../api/user';
import { useParams } from 'react-router-dom';
import { Alert, Report } from '../components';
import { useModal, useReviewAverage } from '../hooks';
import { matchingRequest } from '../api/match';
import { RootState } from '../redux/config/configStore';
import { useSelector } from 'react-redux';

const Detail = () => {
  const { id } = useParams();

  const { data: profiles, isLoading: profilesLoading, isError: profilesError } = useQuery(['profiles'], fetchData);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutor);
  const { data: review, isLoading: reviewLoading, isError: reviewError } = useQuery(['review'], fetchReview);

  const filteredUser = profiles?.filter((profiles) => profiles.id === id);
  const filteredTutor = tutor?.filter((tutor) => tutor.user_id === id);
  const filteredReview = review?.filter((review) => review.user_id === id);
  const reviewRatings = filteredReview?.map((review) => review.rating);
  const filteredReviewRatings = reviewRatings?.filter((value) => typeof value === 'number') as number[];

  const loginUser = useSelector((state: RootState) => state.user.user);
  console.log(filteredUser);
  console.log('리덕스 로그인사용자', loginUser);

  // 모달
  const { Modal, isOpen, openModal, closeModal } = useModal();

  const reviewAverage = useReviewAverage(filteredReviewRatings);

  if (profilesLoading || likeLoading || tutorLoading || reviewLoading) {
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
          onClick={() => {
            matchingRequest({ tutorId: filteredUser![0].id, userId: loginUser!.id });
          }}
        >
          매칭 요청 버튼 !!!!!!!!!!
        </button>

        <Modal isOpen={isOpen} closeModal={closeModal}>
          <Report closeModal={closeModal} />
        </Modal>
        <button onClick={openModal}>신고하기</button>

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
