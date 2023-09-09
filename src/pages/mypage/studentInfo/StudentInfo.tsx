import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from '../../../api/board';
import { fetchLBookMark } from '../../../api/like';
import { icon_more } from '../../../assets';
import { Loading } from '../../../components';
import { RootState } from '../../../redux/config/configStore';
import { openModal, setReview } from '../../../redux/modules';
import { Container, ContentsDataBox, DataAuth, DataContent, DataItem, DataList, DataStar, DataTitle, InfoNull, InfoSection, InfoTitle } from '../userInfo/UserInfo.styled';
import * as S from './StudentInfo.styled';

import { getMyWritiedReview } from '../../../api/review';
import LikeTutorSlider from '../../../components/slider/tutorSlider/LikeTutorSlider';
import StarRating from '../../../constants/func';
import { BOARD_QUERY_KEY, BOOK_MARK_QUERY_KEY, REVIEW_QUERY_KEY } from '../../../constants/query.constant';
import { Tables, Views } from '../../../supabase/database.types';
import MatchingTutor from '../matchingTab/MatchingTutor';

interface pageProps {
  match: Views<'matching_tutor_data'>[];
}

// type ReviewProfiles = {
//   profiles : string;
//   username:string;
// }
// type ReviewType = {
//   author :string;
// content :string;
// created_at :string;
// id :number;
// matched_id :string;
// rating:number;
// reviewed_id :ReviewProfiles;
// title :string;
// user_id :string;
// }
const StudentInfo = ({ match }: pageProps) => {
  const dispatch = useDispatch();
  const [openMenuId, setOpenMenuId] = useState<number>(0);
  const user = useSelector((state: RootState) => state.user.user);
  const tutors = useSelector((state: RootState) => state.tutor.tutor);

  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery([BOARD_QUERY_KEY], getBoard);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery([BOOK_MARK_QUERY_KEY], fetchLBookMark);

  const myReview = useQuery([REVIEW_QUERY_KEY], () => getMyWritiedReview(user!.id));
  console.log(myReview.data);

  if (boardLoading || likeLoading) {
    return <Loading />;
  }
  if (boardError || likeError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!board || !like || !tutors || !myReview.data) {
    return null;
  }

  const likedList = like.filter((item: Tables<'book_mark'>) => item.user_id === user!.id).map((item) => item.liked_id);
  const likedUser = tutors!.filter((item: Views<'tutor_info_join'>) => likedList.includes(item.tutor_id ?? ''));

  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Views<'matching_tutor_data'>) => item.user_id === user!.id);
  const myBoard = board!.filter((board: Tables<'board'>) => {
    return board.user_id === user!.id;
  });

  const handleOpenReviewUpdateForm = (): void => {
    dispatch(openModal({ type: 'reviewUpdate', targetId: user?.id }));
  };

  const handleReviewDelete = (id: number) => {
    dispatch(openModal({ type: 'confirmRemove', targetId: id }));
  };

  const handleIsOpen = (reviewId: number) => {
    setOpenMenuId(reviewId === openMenuId ? 0 : reviewId);
  };
  return (
    <div>
      <InfoSection>
        <Container>
          <InfoTitle>찜한 강사 리스트</InfoTitle>
        </Container>
        {likedUser.length > 0 ? <LikeTutorSlider uniqueKey="studentInfo" tutorList={likedUser} panels={6} /> : <InfoNull style={{ maxWidth: '1200px', margin: '0 auto' }}>찜한 강사가 없습니다</InfoNull>}
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>튜터링 요청 내역</InfoTitle>
          {matchList.length > 0 ? <MatchingTutor matchList={matchList} /> : <InfoNull>요청한 튜터링 내역이 없습니다</InfoNull>}
        </Container>
      </InfoSection>

      <InfoSection>
        <Container>
          <InfoTitle>내가 쓴 후기</InfoTitle>
          <ContentsDataBox>
            <DataList>
              {myReview.data.length > 0 ? (
                myReview.data.map((review) => {
                  const rating = review.rating || 0;
                  return (
                    <DataItem key={review.id} style={{ alignItems: 'start' }}>
                      <div>
                        <DataTitle>{review.title}</DataTitle>
                        <DataStar>{StarRating(rating)}</DataStar>
                        <DataContent>{review.content}</DataContent>
                        <DataAuth>{review.reviewed_id.username!}</DataAuth>
                      </div>
                      <S.ReviewEditBtn>
                        <button onClick={() => handleIsOpen(review.id)}>
                          <img src={icon_more} alt="" />
                        </button>
                        <S.moreMenu className={review.id === openMenuId ? 'active' : ''}>
                          <S.moreMenuItem
                            onClick={() => {
                              handleOpenReviewUpdateForm();

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
