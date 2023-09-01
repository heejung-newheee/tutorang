import * as S from './Review.styled';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modules';
import { useState } from 'react';
import { starEmpty, starFull } from '../../assets';

const ReviewItem = (id: string) => {
  const dispatch = useDispatch();

  const [isOpen, setIsopen] = useState(false);

  const handleIsOpen = (reviewId: number) => {
    setIsopen(!isOpen);
  };

  // 리뷰 업데이트
  const handleOpenReviewUpdateForm = () => {
    dispatch(openModal({ type: 'reviewUpdate', targetId: id }));
  };

  // 리뷰 삭제
  const handleReviewDelete = (reviewId: number) => {
    mutationREviewDelete.mutate(reviewId);
  };

  // 별점 후기
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
    <S.ReviewItem>
      <div>
        <S.ReviewTitle>{review.title}</S.ReviewTitle>
        <S.ReviewDescription>{review.content}</S.ReviewDescription>

        <S.AuthorInfo>
          {review.author} / {review.created_at}
        </S.AuthorInfo>
      </div>
      <div>
        {loginUser?.id === review.user_id ? (
          <S.ButtonMoreWrapper>
            <button onClick={() => handleIsOpen(review.id)}>
              <img src={icon_more} />
            </button>
            <S.moreMenu className={isOpen ? 'active' : ''}>
              <S.moreMenuItem
                onClick={() => {
                  handleOpenReviewUpdateForm();
                  // 수정할 리뷰 데이터 전달
                  dispatch(setReview(review));
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
          </S.ButtonMoreWrapper>
        ) : null}
        <S.ReviewStar>{starRating(rating)}</S.ReviewStar>
      </div>
    </S.ReviewItem>
  );
};

export default ReviewItem;
