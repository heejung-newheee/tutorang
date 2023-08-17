import * as S from './Dialog.styled';

type DialogProps = {
  closeModal: () => void;
};

const Dialog = ({ closeModal }: DialogProps) => {
  return (
    <S.Container>
      <S.Inner
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <button onClick={closeModal}>닫기</button>
      </S.Inner>
    </S.Container>
  );
};

export default Dialog;
