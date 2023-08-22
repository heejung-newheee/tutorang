import * as S from './Confirm.styled';

type ConfirmProps = {
  closeModal: () => void;
};

const Confirm = ({ closeModal }: ConfirmProps) => {
  return (
    <S.Container>
      <S.Inner
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <button onClick={closeModal}>취소</button>
        <button onClick={closeModal}>확인</button>
      </S.Inner>
    </S.Container>
  );
};

export default Confirm;
