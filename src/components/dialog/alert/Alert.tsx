import * as S from './Alert.styled';

type AlertProps = {
  closeModal: () => void;
  isOpen: boolean;
};

const Alert = ({ isOpen, closeModal }: AlertProps) => {
  return (
    <>
      {isOpen ? (
        <S.Overlay>
          <S.Container>
            <S.Inner
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
              }}
            >
              <div>신고완료</div>
              <button onClick={closeModal}>닫기</button>
            </S.Inner>
          </S.Container>
        </S.Overlay>
      ) : null}
    </>
  );
};

export default Alert;
