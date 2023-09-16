import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import { closeModal, successModal } from '../../../redux/modules';
import * as S from './Confirm.styled';

const Confirm = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(successModal({ isConfirm: true }));
    dispatch(closeModal());
  };

  return (
    <>
      <S.Container>
        <S.Inner
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
        >
          <S.ContentWrapper>
            <S.Description>{message}</S.Description>
            <S.ButtonWrapper>
              <S.Button onClick={handleClose}>취소</S.Button>
              <S.Button onClick={handleConfirm}>확인</S.Button>
            </S.ButtonWrapper>
          </S.ContentWrapper>
        </S.Inner>
      </S.Container>
    </>
  );
};

export default Confirm;
