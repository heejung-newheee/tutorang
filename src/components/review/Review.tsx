import * as S from './Review.styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { matchReview, reviewDelete } from '../../api/review';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { openModal, setReview } from '../../redux/modules';
import { Button } from '..';

const REVIEW_QUERY_KEY = ['reviewTutorDetail'];

type ReviewProps = {
  id: string | undefined;
};

const Review = ({ id }: ReviewProps) => {
  if (!id) return;
  const dispatch = useDispatch();

  const { data: reviews, isLoading: reviewLoading, isError: reviewError, error } = useQuery(REVIEW_QUERY_KEY, () => matchReview(id));

  const loginUser = useSelector((state: RootState) => state.user.user);

  const queryClient = useQueryClient();

  const mutationReviewDelete = useMutation(reviewDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries(REVIEW_QUERY_KEY);
    },
  });

  // 리뷰 작성
  const handleOpenReviewCreateForm = () => {
    if (!loginUser) {
      dispatch(openModal({ type: 'alert', message: '로그인 후 이용해주세요' }));
      return;
    }

    dispatch(openModal({ type: 'reviewCreate', targetId: id }));
  };
  // 리뷰 업데이트
  const handleOpenReviewUpdateForm = () => {
    dispatch(openModal({ type: 'reviewUpdate', targetId: id }));
  };

  // 리뷰 삭제
  const handleReviewDelete = (id: number) => {
    mutationReviewDelete.mutate(id);
  };

  if (reviewLoading) {
    return <div>로딩중</div>;
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
          <Button variant="solid" color="primary" size="Small" onClick={handleOpenReviewCreateForm}>
            리뷰 남기기
          </Button>
        </S.TitleContainer>

        <S.ReviewContainer>
          {reviews?.map((review) => {
            return (
              <S.ReviewItem key={review.id}>
                <S.ReviewTitle>{review.title}</S.ReviewTitle>
                <S.ReviewDescription>{review.content}</S.ReviewDescription>

                {loginUser?.id === review.user_id ? (
                  <div>
                    <button
                      onClick={() => {
                        handleOpenReviewUpdateForm();
                        // 수정할 리뷰 데이터 전달
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
              </S.ReviewItem>
            );
          })}
        </S.ReviewContainer>
      </S.Container>
    </>
  );
};

export default Review;
