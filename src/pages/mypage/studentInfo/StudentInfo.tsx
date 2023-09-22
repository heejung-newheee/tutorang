import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLBookMark } from '../../../api/like';
import { getMyWritiedReview } from '../../../api/review';
import { icon_more } from '../../../assets';
import { Loading } from '../../../components';
import StarRating from '../../../components/common/StarRating';
import LikeTutorSlider from '../../../components/slider/tutorSlider/LikeTutorSlider';
import { BOOK_MARK_QUERY_KEY, REVIEW_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { openModal, setReview } from '../../../redux/modules';
import { Tables, Views } from '../../../supabase/database.types';
import { Container, ContentsDataBox, DataAuth, DataContent, DataItem, DataList, DataStar, DataTitle, InfoNull, InfoSection, InfoTitle } from '../MyPage.styled';
import MatchingTutor from '../matchingTab/MatchingTutor';
import * as S from './StudentInfo.styled';

type pageProps = {
  match: Views<'matching_tutor_data'>[];
  user: Tables<'profiles'>;
};
const StudentInfo = ({ match, user }: pageProps) => {
  const dispatch = useDispatch();
  const [openMenuId, setOpenMenuId] = useState<number>(0);
  const tutors = useSelector((state: RootState) => state.tutor.tutor);

  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery([BOOK_MARK_QUERY_KEY], fetchLBookMark);

  const myReview = useQuery([REVIEW_QUERY_KEY], () => getMyWritiedReview(user.id));

  if (likeLoading) {
    return <Loading />;
  }
  if (likeError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!like || !tutors || !myReview.data) {
    return null;
  }

  const likedList = like.filter((item: Tables<'book_mark'>) => item.user_id === user.id).map((item) => item.liked_id);
  const likedUser = tutors!.filter((item: Views<'tutor_info_join'>) => likedList.includes(item.tutor_id ?? ''));

  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Views<'matching_tutor_data'>) => item.user_id === user!.id);

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
        {likedUser.length > 0 ? <LikeTutorSlider uniqueKey="studentInfo" tutorList={likedUser} /> : <InfoNull className="like-tutor-slider studentInfo">찜한 강사가 없습니다</InfoNull>}
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>튜터링 요청 내역</InfoTitle>
          {matchList.length > 0 ? <MatchingTutor matchList={matchList} /> : <InfoNull className="like-tutor-slider">요청한 튜터링 내역이 없습니다</InfoNull>}
        </Container>
      </InfoSection>

      <InfoSection>
        <Container>
          <InfoTitle>내가 쓴 후기</InfoTitle>
          {myReview.data.length > 0 ? (
            <ContentsDataBox>
              <DataList>
                {myReview.data.map((review) => {
                  const reviewed = review.reviewed as unknown as Tables<'profiles'> | null;
                  const rating = review.rating || 0;
                  return (
                    <DataItem key={review.id} className="studentInfo">
                      <div>
                        <DataTitle>{review.title}</DataTitle>
                        <DataStar>{StarRating(rating)}</DataStar>
                        <DataContent>{review.content}</DataContent>
                        <DataAuth>{reviewed?.username}</DataAuth>
                      </div>
                      <S.ReviewEditBtn>
                        <button onClick={() => handleIsOpen(review.id)}>
                          <img src={icon_more} alt="review button" />
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
                })}
              </DataList>
            </ContentsDataBox>
          ) : (
            <InfoNull>작성한 후기가 없습니다</InfoNull>
          )}
        </Container>
      </InfoSection>
    </div>
  );
};

export default StudentInfo;
