import { useDispatch } from 'react-redux';
import * as S from './Alert.styled';
import { closeModal } from '../../../redux/modules';

const Alert = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <S.Overlay>
      <S.Container>
        <S.Inner
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
        >
          <button onClick={handleClose}>닫기</button>
        </S.Inner>
      </S.Container>
    </S.Overlay>
  );
};

export default Alert;
