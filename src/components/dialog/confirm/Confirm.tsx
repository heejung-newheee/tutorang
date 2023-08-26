import { useDispatch } from 'react-redux';
import * as S from './Confirm.styled';
import { closeModal } from '../../../redux/modules';

const Confirm = () => {
  const dispatch = useDispatch();

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
        <button onClick={handleClose}>취소</button>
        <button>확인</button>
      </S.Inner>
    </S.Container>
  );
};

export default Confirm;
