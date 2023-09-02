import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Tables, Views } from '../../supabase/database.types';
import { RootState } from '../../redux/config/configStore';
import { getBoard } from '../../api/board';
import { Container, InfoNull, InfoSection, InfoTitle } from '../userInfo/UserInfo.styled';
import CompleteClass from '../slider/completeClassSlider/CompleteClass';
import TutorSlider from '../slider/tutorSlider/TutorSlider';
import MatchingTutor from '../matchingTab/MatchingTutor';
import { fetchLike } from '../../api/like';
import { DataAuth, DataContent, DataStar, DataTitle, StudentItem } from '../tutorInfo/TutorInfo.styled';
import { matchMyReview } from '../../api/review';
import { ButtonMoreWrapper } from '../review/Review.styled';
import { icon_more, starEmpty, starFull } from '../../assets';
import { openModal, setReview } from '../../redux/modules';
import * as S from './StudentInfo.styled';

const BOARD_QUERY_KEY = ['board'];
interface pageProps {
  match: Views<'matching_tutor_data'>[];
}
const StudentInfo = ({ match }: pageProps) => {
  const dispatch = useDispatch();
  const [openButton, setOpenButton] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);
  const tutors = useSelector((state: RootState) => state.tutor.tutor);

  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery([BOARD_QUERY_KEY], getBoard);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const myReview = useQuery(['myReviewData'], () => matchMyReview(user!.id));

  if (boardLoading || likeLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (boardError || likeError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!board || !like || !tutors || !myReview.data) {
    return null;
  }

  const likedList = like.filter((item: Tables<'like'>) => item.user_id === user!.id).map((item) => item.liked_id);
  const likedUser = tutors!.filter((item: Views<'tutor_info_join'>) => likedList.includes(item.tutor_id ?? ''));

  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Views<'matching_tutor_data'>) => item.user_id === user!.id);
  const myBoard = board!.filter((board: Tables<'board'>) => {
    return board.user_id === user!.id;
  });

  // 리뷰 업데이트
  const handleOpenReviewUpdateForm = (id: number): void => {
    dispatch(openModal({ type: 'reviewUpdate', targetId: id }));
  };

  // 리뷰 삭제
  const handleReviewDelete = (id: number) => {
    dispatch(openModal({ type: 'confirmRemove', targetId: id }));
  };
  const handleIsOpen = () => {
    setOpenButton((prev) => !prev);
  };
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
    <div>
      <InfoSection>
        <Container>
          <InfoTitle>찜한 강사 리스트</InfoTitle>
          {likedUser.length > 0 ? <TutorSlider uniqueKey="studentInfo" tutorList={likedUser} panels={3} /> : <InfoNull>찜한 강사가 없습니다</InfoNull>}
        </Container>
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>튜터링 요청 내역</InfoTitle>
          {matchList.length > 0 ? <MatchingTutor matchList={matchList} /> : <InfoNull>요청한 튜터링 내역이 없습니다</InfoNull>}
        </Container>
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>수업했던 튜터</InfoTitle>
          {matchList.length > 0 ? <CompleteClass matchList={matchList} /> : <InfoNull>튜터링 완료한 내역이 없습니다</InfoNull>}
        </Container>
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>내가 쓴 후기</InfoTitle>
          {myReview.data.map((review) => {
            return (
              <StudentItem key={review.id} style={{ alignItems: 'start' }}>
                <div>
                  <DataTitle>{review.title}</DataTitle>
                  <DataStar>{starRating(review.rating!)}</DataStar>
                  <DataContent>{review.content}</DataContent>
                  {/* TODO 지금은 작성자. 타겟이름으로 변경/ */}
                  <DataAuth>{review.author} </DataAuth>
                </div>
                <S.ReviewEditBtn onClick={handleIsOpen}>
                  <button>
                    <img src={icon_more} alt="" />
                  </button>
                  {openButton && (
                    <S.moreMenu>
                      <S.moreMenuItem
                        onClick={() => {
                          handleOpenReviewUpdateForm(review.id);
                          // 수정할 리뷰 데이터 전달
                          dispatch(setReview(review));
                          // handleIsOpen(review.id);
                        }}
                      >
                        수정
                      </S.moreMenuItem>
                      <S.moreMenuItem
                        onClick={() => {
                          handleReviewDelete(review.id);
                        }}
                      >
                        삭제
                      </S.moreMenuItem>
                    </S.moreMenu>
                  )}
                </S.ReviewEditBtn>
              </StudentItem>
            );
          })}
        </Container>
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>내가 남긴 문의</InfoTitle>
          {myBoard.length > 0 ? (
            myBoard.map((item: Tables<'board'>) => {
              return (
                <StudentItem key={item.id}>
                  <div>
                    <DataTitle>{item.title}</DataTitle>
                    <DataContent>{item.content}</DataContent>
                    <DataAuth>{item.created_at.split('T')[0]}</DataAuth>
                  </div>
                </StudentItem>
              );
            })
          ) : (
            <InfoNull>문의하신 내역이 없습니다</InfoNull>
          )}
        </Container>
      </InfoSection>
    </div>
  );
};

export default StudentInfo;
