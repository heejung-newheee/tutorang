import { Button } from '../..';
import * as S from './Report.styled';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/modules';
import { useTutorReport } from '../../../api/tutor';
import { RootState } from '../../../redux/config/configStore';
import { useInput } from '../../../hooks';
import { TutorReport } from '../../../supabase/database.types';

const Report = () => {
  const dispatch = useDispatch();
  const tutorReport = useTutorReport();
  const data = useSelector((state: RootState) => state.modal);
  const initialState = {
    content: '' as string,
  };

  const [{ content }, onChange] = useInput(initialState);

  const handleSendReport = () => {
    const newReport: TutorReport = {
      user_id: data.userId as string,
      tutor_id: data.targetId as string,
      content: content as string,
      state: 'pending',
    };

    tutorReport(newReport);
    dispatch(closeModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <S.Container>
      <S.Inner
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <S.ContentWrapper>
          <S.Title>도움이 필요하신가요?</S.Title>
          <S.Description>자세한 상황을 작성해주시면 확인 후 연락드리겠습니다.</S.Description>
          <form>
            <S.Textarea placeholder="내용을 작성해주세요" name="content" value={content as string} onChange={onChange}></S.Textarea>
          </form>
        </S.ContentWrapper>

        <S.ButtonWrapper>
          <Button variant="text" color="gray" size="Large" onClick={handleClose}>
            취소
          </Button>
          <Button variant="text" color="red" size="Large" onClick={handleSendReport}>
            신고하기
          </Button>
        </S.ButtonWrapper>
      </S.Inner>
    </S.Container>
  );
};

export default Report;
