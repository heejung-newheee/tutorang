import { useDispatch, useSelector } from 'react-redux';
import * as S from './Alert.styled';
import { closeModal } from '../../../redux/modules';
import { RootState } from '../../../redux/config/configStore';

const Alert = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.modal);

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
          {message}
          <button onClick={handleClose}>닫기</button>
        </S.Inner>
      </S.Container>
    </S.Overlay>
  );
};

export default Alert;
