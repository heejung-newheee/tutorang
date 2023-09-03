import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getBoard } from '../../api/board';
import { fetchLike } from '../../api/like';
import { matchMyReview } from '../../api/review';
import { RootState } from '../../redux/config/configStore';
import { openModal, setReview } from '../../redux/modules';
import CompleteClass from '../slider/completeClassSlider/CompleteClass';
import TutorSlider from '../slider/tutorSlider/TutorSlider';
import MatchingTutor from '../matchingTab/MatchingTutor';
import * as S from './StudentInfo.styled';
import { Container, ContentsDataBox, DataAuth, DataContent, DataItem, DataList, DataStar, DataTitle, InfoNull, InfoSection, InfoTitle } from '../userInfo/UserInfo.styled';
import { icon_more, starEmpty, starFull } from '../../assets';
import { Loading } from '..';

import { Tables, Views } from '../../supabase/database.types';

const REVIEW_QUERY_KEY = ['reviewTutorDetail'];
const BOARD_QUERY_KEY = ['board'];
interface pageProps {
  match: Views<'matching_tutor_data'>[];
}
// interface reviewedProps {
//   profiles: string;
//   username: string;
// }
// interface myReviewsProps {
//   author: string;
//   content: string;
//   created_at: Date;
//   id: number;
//   rating: number;
//   reviewed_id: reviewedProps;
//   title: string;
//   user_id: string;
// }
const StudentInfo = ({ match }: pageProps) => {
  const dispatch = useDispatch();
  const [openMenuId, setOpenMenuId] = useState<number>(0);
  const user = useSelector((state: RootState) => state.user.user);
  const tutors = useSelector((state: RootState) => state.tutor.tutor);

  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery([BOARD_QUERY_KEY], getBoard);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const myReview = useQuery(REVIEW_QUERY_KEY, () => matchMyReview(user!.id));

  // if (myReview.data) {
  //   console.log(myReview.data || undefined);
  // }

  if (boardLoading || likeLoading) {
    return <Loading />;
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
  const handleOpenReviewUpdateForm = (): void => {
    dispatch(openModal({ type: 'reviewUpdate', targetId: user?.id }));
  };

  // 리뷰 삭제
  const handleReviewDelete = (id: number) => {
    dispatch(openModal({ type: 'confirmRemove', targetId: id }));
  };

  const handleIsOpen = (reviewId: number) => {
    setOpenMenuId(reviewId === openMenuId ? 0 : reviewId);
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
        </Container>
        {likedUser.length > 0 ? <TutorSlider uniqueKey="studentInfo" tutorList={likedUser} panels={6} /> : <InfoNull>찜한 강사가 없습니다</InfoNull>}
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
          <ContentsDataBox>
            <DataList>
              {myReview.data.length > 0 ? (
                myReview.data.map((review) => {
                  return (
                    <DataItem key={review.id} style={{ alignItems: 'start' }}>
                      <div>
                        <DataTitle>{review.title}</DataTitle>
                        <DataStar>{starRating(review.rating!)}</DataStar>
                        <DataContent>{review.content}</DataContent>
                        {/* TODO 이름은 보여지나 타입? 속성? 오류가 뜸 */}
                        {/* <DataAuth>{review.reviewed_id && review.reviewed_id.username} 튜터</DataAuth> */}
                      </div>
                      <S.ReviewEditBtn>
                        <button onClick={() => handleIsOpen(review.id)}>
                          <img src={icon_more} alt="" />
                        </button>
                        <S.moreMenu className={review.id === openMenuId ? 'active' : ''}>
                          <S.moreMenuItem
                            onClick={() => {
                              handleOpenReviewUpdateForm();
                              // 수정할 리뷰 데이터 전달
                              dispatch(setReview(review));
                              handleIsOpen(review.id);
                            }}
                          >
                            수정
                          </S.moreMenuItem>
                          <S.moreMenuItem
                            onClick={() => {
                              handleReviewDelete(review.id);
                              handleIsOpen(review.id);
                            }}
                          >
                            삭제
                          </S.moreMenuItem>
                        </S.moreMenu>
                      </S.ReviewEditBtn>
                    </DataItem>
                  );
                })
              ) : (
                <InfoNull>작성한 후기가 없습니다</InfoNull>
              )}
            </DataList>
          </ContentsDataBox>
        </Container>
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>내가 남긴 문의</InfoTitle>

          <ContentsDataBox>
            {myBoard.length > 0 ? (
              myBoard.map((item: Tables<'board'>) => {
                return (
                  <DataItem key={item.id}>
                    <div>
                      <DataTitle>{item.title}</DataTitle>
                      <DataContent>{item.content}</DataContent>
                      <DataAuth>{item.created_at.split('T')[0]}</DataAuth>
                    </div>
                  </DataItem>
                );
              })
            ) : (
              <InfoNull>문의하신 내역이 없습니다</InfoNull>
            )}
          </ContentsDataBox>
        </Container>
      </InfoSection>
    </div>
  );
};

export default StudentInfo;
