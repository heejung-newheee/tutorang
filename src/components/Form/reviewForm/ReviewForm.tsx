import * as S from './ReviewForm.styled';
import { useInput } from '../../../hooks';
import { Button } from '../..';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modules';

type initialStateType = {
  title: string;
};

const ReviewForm = () => {
  const dispatch = useDispatch();

  const initialState: initialStateType = {
    title: '',
  };

  const [{ title }, onChange, reset] = useInput(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset();
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <S.Container>
      <S.Inner>
        <S.ContentWrapper>
          <button onClick={handleClose}>닫기</button>

          <form onSubmit={handleSubmit}>
            <S.Title>리뷰 남기기</S.Title>
            <S.Textarea name="title" value={title as string} onChange={onChange} />
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
