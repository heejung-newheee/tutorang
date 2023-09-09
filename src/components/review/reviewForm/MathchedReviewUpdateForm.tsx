import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../..';
import { getWritiedReviewMatching, reviewUpdate } from '../../../api/review';
import { close, starEmpty, starFull } from '../../../assets';
import { useInput } from '../../../hooks';
import { RootState } from '../../../redux/config/configStore';
import { closeModal } from '../../../redux/modules';
import { reviews } from '../../../supabase/database.types';
import * as S from './ReviewForm.styled';

const REVIEW_QUERY_KEY = ['reviewTutorMyPage'];

type initialStateType = {
  title: string;
  content: string;
};

const MatchedReviewUpdateForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const loginUser = useSelector((state: RootState) => state.user.user);
  const { targetId: tutorId, matchingId, userId } = useSelector((state: RootState) => state.modal);

  // const prevReview: Tables<'review'> = useSelector((state: RootState) => state.review);
  const prevReview = useQuery(['review_matching_view'], () => getWritiedReviewMatching(tutorId as string, matchingId as string, userId as string));

  console.log('tutorId', tutorId);
  console.log('matchingId', matchingId);
  console.log('userId', userId);
  console.log('-------prevReview', prevReview.data);

  const mutationReviewUpdate = useMutation(reviewUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(REVIEW_QUERY_KEY);
    },
  });

  const initialState: initialStateType = {
    title: prevReview?.title || '',
    content: prevReview?.content || '',
  };

  const [{ title, content }, onChange] = useInput(initialState);

  const stars = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(prevReview?.rating || 0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const starRating = (currentRate: number) => {
    if (hoveredStar >= currentRate) {
      return <img src={starFull} alt={`Full Star ${currentRate}`} />;
    }

    if (rating >= currentRate) {
      return <img src={starFull} alt={`Full Star ${currentRate}`} />;
    }

    return <img src={starEmpty} alt={`Empty Star`} />;
  };

  const handleStarMouseEnter = (hoveredRate: number) => {
    setHoveredStar(hoveredRate);
  };

  const handleStarMouseLeave = () => {
    setHoveredStar(0);
  };

  const handleStarOnClick = (clickedRate: number) => {
    setRating(clickedRate);
  };

  const handleReviewUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tutorId || !matchingId || !userId || !loginUser) {
      return;
    }

    const updatedReview: reviews = {
      reviewed_id: tutorId as string,
      user_id: userId,
      author: loginUser?.username,
      title: title as string,
      content: content as string,
      rating,
    };

    try {
      await mutationReviewUpdate.mutate({ updatedReview, id: prevReview.id });
    } catch (error) {
      console.error('error submit review : ', error);
    }

    dispatch(closeModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <S.Container>
      <S.Inner>
        <S.ContentWrapper>
          <S.CloseBtn onClick={handleClose}>
            <img src={close} alt="close button" />
          </S.CloseBtn>

          <form onSubmit={handleReviewUpdateSubmit}>
            <S.StarList>
              {stars.map((star) => {
                return (
                  <S.StarItem key={star} onMouseEnter={() => handleStarMouseEnter(star)} onMouseLeave={() => handleStarMouseLeave()} onClick={() => handleStarOnClick(star)}>
                    {starRating(star)}
                  </S.StarItem>
                );
              })}
            </S.StarList>
            <S.Title>리뷰 수정하기</S.Title>
            <div>
              <S.ReviewLabel htmlFor="">제목</S.ReviewLabel>
              <S.ReviewInput required name="title" value={title as string} onChange={onChange} />
            </div>
            <div>
              <S.ReviewLabel htmlFor="">내용</S.ReviewLabel>
              <S.Textarea name="content" value={content as string} onChange={onChange} />
            </div>

            <S.ButtonWrapper>
              <Button variant="solid" color={'primary'} size="Large">
                수정하기
              </Button>
            </S.ButtonWrapper>
          </form>
        </S.ContentWrapper>
      </S.Inner>
    </S.Container>
  );
};

export default MatchedReviewUpdateForm;
