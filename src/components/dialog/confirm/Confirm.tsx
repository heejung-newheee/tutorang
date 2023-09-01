import { useDispatch, useSelector } from 'react-redux';
import * as S from './Confirm.styled';
import { closeModal } from '../../../redux/modules';
import { RootState } from '../../../redux/config/configStore';

const Confirm = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.modal);

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
        {message}
        <button onClick={handleClose}>취소</button>
        <button>확인</button>
      </S.Inner>
    </S.Container>
  );
};

export default Confirm;
