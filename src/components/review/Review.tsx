import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '..';
import { matchReview } from '../../api/review';
import { icon_more, starEmpty, starFull } from '../../assets';
import { REVIEW_QUERY_KEY } from '../../constants/query.constant';
import { RootState } from '../../redux/config/configStore';
import { openModal, setReview } from '../../redux/modules';
import * as S from './Review.styled';

type ReviewProps = {
  id: string;
};

const Review = ({ id }: ReviewProps) => {
  const dispatch = useDispatch();
  const [openMenuId, setOpenMenuId] = useState(0);
  const { data: reviews, isLoading: reviewLoading, isError: reviewError, error } = useQuery([REVIEW_QUERY_KEY, id], () => matchReview(id));

  const loginUser = useSelector((state: RootState) => state.user.user);

  // const handleOpenReviewCreateForm = () => {
  //   if (!loginUser) {
  //     dispatch(openModal({ type: 'alert', message: '로그인 후 이용해주세요' }));
  //     return;
  //   }

  //   dispatch(openModal({ type: 'reviewCreate', targetId: id }));
  // };

  const handleOpenReviewUpdateForm = () => {
    dispatch(openModal({ type: 'reviewUpdate', targetId: id }));
  };

  const handleReviewDelete = (id: number) => {
    dispatch(openModal({ type: 'confirmRemove', targetId: id }));
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

  const handleIsOpen = (reviewId: number) => {
    setOpenMenuId(reviewId === openMenuId ? 0 : reviewId);
  };

  const createDate = (createTime: string) => {
    if (!createTime) return;

    const nowTime = new Date();
    const createdTime = new Date(createTime);

    const timeDiff = Math.abs(nowTime.getTime() - createdTime.getTime());
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

    let timeMessage = '';

    if (hoursDiff < 1) {
      timeMessage = `방금`;
    } else if (hoursDiff < 24) {
      timeMessage = `${hoursDiff}시간 전`;
    } else {
      const getTime = createTime.split('T')[0];

      const [year, month, day] = getTime.split('-');
      const formattedMonth = Number(month).toString();
      const formattedDay = Number(day).toString();

      const formattedDate = `${year}.${formattedMonth}.${formattedDay}`;

      timeMessage = formattedDate;
    }

    return timeMessage;
  };

  if (reviewLoading) {
    return <Loading />;
  }

  if (reviewError) {
    console.log(error);
    return;
  }
  return (
    <>
      <S.Container>
        <S.TitleContainer>
          <S.Title>
            수강생 후기 <S.BadgeReviewCount>{reviews?.length}</S.BadgeReviewCount>
          </S.Title>
        </S.TitleContainer>

        <S.ReviewContainer>
          {reviews.length > 0 ? (
            <>
              {reviews?.map((review) => {
                const rating = review.rating || 0;
                return (
                  <S.ReviewItem key={review.id}>
                    <div>
                      <S.ReviewTitle>{review.title}</S.ReviewTitle>
                      <S.ReviewDescription>{review.content}</S.ReviewDescription>

                      <S.AuthorInfo>
                        {review.author}
                        <S.Time>{createDate(review.created_at)}</S.Time>
                      </S.AuthorInfo>
                    </div>
                    <div>
                      {loginUser?.id === review.user_id ? (
                        <S.ButtonMoreWrapper>
                          <button onClick={() => handleIsOpen(review.id)}>
                            <img src={icon_more} />
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
                        </S.ButtonMoreWrapper>
                      ) : null}
                      <S.ReviewStar>{starRating(rating)}</S.ReviewStar>
                    </div>
                  </S.ReviewItem>
                );
              })}
            </>
          ) : (
            <div>후기가 없습니다.</div>
          )}
        </S.ReviewContainer>
      </S.Container>
    </>
  );
};

export default Review;
