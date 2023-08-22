import { useState } from 'react';
import { Alert, Button } from '../..';
import * as S from './Report.styled';
import { useModal } from '../../../hooks';

type ReportProps = {
  closeModal: () => void;
};

const Report = ({ closeModal }: ReportProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sendReport = () => {
    setIsOpen(true);
    setTimeout(() => {
      closeModal();
    });
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
            <S.Textarea placeholder="내용을 작성해주세요"></S.Textarea>
          </form>
        </S.ContentWrapper>

        <S.ButtonWrapper>
          <Button variant="text" color="gray" size="Large" onClick={closeModal}>
            취소
          </Button>
          <Button variant="text" color="red" size="Large" onClick={sendReport}>
            신고하기
          </Button>
        </S.ButtonWrapper>
      </S.Inner>
      <Alert isOpen={isOpen} closeModal={closeModal} />;
    </S.Container>
  );
};

export default Report;