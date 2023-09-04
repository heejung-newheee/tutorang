import * as S from './ReviewForm.styled';
import { useInput } from '../../../hooks';
import { Button } from '../..';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/modules';
import { close, starEmpty, starFull } from '../../../assets';
import { useState } from 'react';
import { useCreateReviewMutation } from '../../../api/review';
import { RootState } from '../../../redux/config/configStore';
import { reviews } from '../../../supabase/database.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { matchedReview } from '../../../api/match';
import { MATCHING_TUTOR_DATA_QUERY_KEY } from '../../userInfo/UserInfo';

type initialStateType = {
  title: string;
  content: string;
};

const MatchedReviewForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const loginUser = useSelector((state: RootState) => state.user.user);
  const { targetId: tutorId, matchingId } = useSelector((state: RootState) => state.modal);
  // const { data } = useQuery(MATCHING_TUTOR_DATA_QUERY_KEY, matchingTutorData);

  const createReview = useCreateReviewMutation();
  const matchedReviewMutation = useMutation(matchedReview, {
    onSuccess: () => {
      // queryClient.invalidateQueries(['matching']);
      queryClient.invalidateQueries(MATCHING_TUTOR_DATA_QUERY_KEY);
    },
  });

  const initialState: initialStateType = {
    title: '',
    content: '',
  };

  const [{ title, content }, onChange] = useInput(initialState);

  const stars = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  /** [ star UI ] : hover, click 상황에 따라 UI가 변경됩니다. */
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

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginUser) return;
    if (!tutorId || !matchingId) {
      return;
    }

    const newReview: reviews = {
      reviewed_id: tutorId as string,
      user_id: loginUser?.id,
      author: loginUser.username,
      title: title as string,
      content: content as string,
      rating,
    };

    try {
      await createReview.mutate(newReview);
      await matchedReviewMutation.mutate(matchingId);
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

          <form onSubmit={handleReviewSubmit}>
            <S.StarList>
              {stars.map((star) => {
                return (
                  <S.StarItem key={star} onMouseEnter={() => handleStarMouseEnter(star)} onMouseLeave={() => handleStarMouseLeave()} onClick={() => handleStarOnClick(star)}>
                    {starRating(star)}
                  </S.StarItem>
                );
              })}
            </S.StarList>
            <S.Title>리뷰 남기기</S.Title>
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
                등록하기
              </Button>
            </S.ButtonWrapper>
          </form>
        </S.ContentWrapper>
      </S.Inner>
    </S.Container>
  );
};

export default MatchedReviewForm;