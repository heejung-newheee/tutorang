import * as S from './Alert.styled';

type AlertProps = {
  closeModal: () => void;
};

const Alert = ({ closeModal }: AlertProps) => {
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

export default Alert;
