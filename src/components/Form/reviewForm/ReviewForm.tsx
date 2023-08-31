import * as S from './ReviewForm.styled';
import { useInput } from '../../../hooks';
import { Button } from '../..';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, setReview } from '../../../redux/modules';
import { starEmpty, starFull } from '../../../assets';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewRequest } from '../../../api/review';
import { RootState } from '../../../redux/config/configStore';
import { reviews } from '../../../supabase/database.types';

type initialStateType = {
  title: string;
  content: string;
};

const ReviewForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const loginUser = useSelector((state: RootState) => state.user.user);
  const { targetId: tutorId } = useSelector((state: RootState) => state.modal);

  const mutation = useMutation(reviewRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['review']);
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
    if (!tutorId) {
      console.log('등록할 튜터의 Id가 없습니다.');
      return;
    }

    const newReview: reviews = {
      reviewed_id: tutorId,
      user_id: loginUser?.id,
      author: loginUser?.username,
      title: title as string,
      content: content as string,
      rating,
    };

    try {
      await mutation.mutate(newReview);
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
          <button onClick={handleClose}>닫기</button>

          <form onSubmit={handleReviewSubmit}>
            <S.Title>리뷰 남기기</S.Title>
            <S.StarList>
              {stars.map((star) => {
                return (
                  <li key={star} onMouseEnter={() => handleStarMouseEnter(star)} onMouseLeave={() => handleStarMouseLeave()} onClick={() => handleStarOnClick(star)}>
                    {starRating(star)}
                  </li>
                );
              })}
            </S.StarList>
            <div>
              <label htmlFor="">제목</label>
              <input required name="title" value={title as string} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="">내용</label>
              <S.Textarea name="content" value={content as string} onChange={onChange} />
            </div>
            <S.ButtonWrapper>
              <Button variant="solid" color="black" size="Large">
                등록하기
              </Button>
            </S.ButtonWrapper>
          </form>
        </S.ContentWrapper>
      </S.Inner>
    </S.Container>
  );
};

export default ReviewForm;
